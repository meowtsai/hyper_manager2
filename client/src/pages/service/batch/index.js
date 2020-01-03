import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import PageTitle from "../../../components/PageTitle";
import {
  getBatchTasks,
  editBatchTask,
  deleteBatchTask,
  clearBatchTaskMessage
} from "../../../redux/actions";
import Moment from "react-moment";
import Spinner from "../../../components/Spinner";
import PropTypes from "prop-types";

const BatchListPage = ({
  records,
  games,
  updateOKMessage,
  getBatchTasks,
  editBatchTask,
  deleteBatchTask,
  clearBatchTaskMessage,
  loading,
  error
}) => {
  const [arrangedData, setArrangedData] = useState([]);
  const [selAdminOptions, setSelAdminOptions] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [game_id, setGameId] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const [actMode, setActMode] = useState("");
  const mainTitle = "批次處理列表";

  //console.log("records", records);
  useEffect(() => {
    getBatchTasks();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedData(records);
    //console.log("records", records);

    const selAdminOptionsArray = new Set(records.map(q => q.admin_name));
    let tmpS = {};
    selAdminOptionsArray.forEach((g, index) => {
      tmpS[index] = g;
    });
    setSelAdminOptions(tmpS);
  }, [records]);

  useEffect(() => {
    let timeOutId;
    if (updateOKMessage !== undefined && updateOKMessage !== null) {
      timeOutId = setTimeout(() => {
        clearBatchTaskMessage();
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage]);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  const onAddNew = () => {
    setModal(true);
    setGameId(null);
    setTitle("");
    setActMode("新增");
  };

  const onEditClick = id => {
    setSelectedId(id);
    const selectedRow = records.filter(task => task.id === id)[0];
    setModal(true);
    setGameId(selectedRow.game_id);
    setTitle(selectedRow.title);
    setActMode("編輯");
  };

  const onDeleteClick = id => {
    const deleteOk = window.confirm(`確定要刪除#${id}這筆紀錄嗎?`);
    if (deleteOk) {
      deleteBatchTask(id);
      //deleteCplCaseReply(reply_id);
    }
  };

  const confirmUpdate = () => {
    if (title === "") {
      setErrors({ ...errors, title: "請填寫批次項目名稱" });
      return;
    }

    if (modal) {
      setModal(false);
    }

    if (!selectedId) {
      //{"game_id":"L20na","title":"12/25 喵測試", "status":"1"}
      editBatchTask({ game_id, title, status: 1 });
    } else {
      editBatchTask({ id: selectedId, game_id, title, status: 1 });
    }
  };
  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true
    },
    {
      dataField: "game_name",
      text: "遊戲",
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
      filter: textFilter(),
      sort: true
    },
    {
      dataField: "title",
      text: "項目名稱",
      headerStyle: (column, colIndex) => {
        return { width: "200px" };
      },
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <Link
              to={`/service/batch_handler/${row.id}`}
              className="text-info font-weight-bold mb-1 d-block"
            >
              {cellContent}
            </Link>
          </Fragment>
        );
      }
    },
    {
      dataField: "count",
      text: "案件數量",
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
      sort: true
    },

    {
      dataField: "admin_name",
      text: "處理者",
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
      sort: true,
      filter: selectFilter({
        options: selAdminOptions
      })
    },

    {
      dataField: "create_time",
      text: "建立日期",
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD HH:mm:ss">{row.create_time}</Moment>;
      }
    },
    {
      dataField: "update_time",
      text: "更新日期",

      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD HH:mm:ss">{row.update_time}</Moment>;
      }
    },
    {
      dataField: "status",
      text: "狀態",
      sort: true,
      formatter: (cell, row) => {
        let mode;
        switch (row.status) {
          case "4":
            mode = "已完成(立即結案)";
            break;
          case "7":
            mode = "已完成(預約結案)";
            break;
          case "2":
            mode = "已完成(已回覆)";
            break;
          default:
            mode = "處理中";
            break;
        }
        return mode;
      }
    },

    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        if (row.status === "1") {
          return (
            <ButtonGroup>
              <Button
                size="sm"
                color="secondary"
                className="btn-icon"
                onClick={e => onEditClick(row.id)}
              >
                <i className="mdi mdi-square-edit-outline"></i>
              </Button>
              <Button
                size="sm"
                color="danger"
                className="btn-icon"
                onClick={e => onDeleteClick(row.id)}
              >
                <i className="mdi mdi-trash-can-outline"></i>
              </Button>
            </ButtonGroup>
          );
        }
      }
    }
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: "/service/", active: false },
          { label: "批次處理", path: "/service/batch_list", active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col sm={4}>
          <Button
            onClick={onAddNew}
            className="btn btn-rounded btn-danger mb-3"
          >
            <i className="mdi mdi-plus-circle mr-2" /> 新增
          </Button>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={4}>
          {errors && (
            <Alert color="danger" isOpen={errors.msg ? true : false}>
              <div>{errors.msg}</div>
            </Alert>
          )}

          {updateOKMessage && (
            <Alert color="success" isOpen={updateOKMessage ? true : false}>
              <div>{updateOKMessage}</div>
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                classes="font-13"
                keyField="id"
                data={arrangedData}
                columns={columns}
                filter={filterFactory()}
                defaultSorted={[
                  {
                    dataField: "id",
                    order: "desc"
                  }
                ]}
                pagination={paginationFactory({
                  sizePerPage: 10,
                  showTotal: true,
                  paginationTotalRenderer: customTotal
                })}
                wrapperClasses="table-responsive"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <Modal isOpen={modal} toggle={e => setModal(!modal)}>
            <ModalHeader toggle={e => setModal(!modal)}>{actMode}</ModalHeader>
            <ModalBody>
              <Card className="border p-1 mt-2 mb-1 rounded font-13 bg-light">
                <CardBody>
                  <h5>{actMode}批次處理</h5>
                  <FormGroup>
                    <Label for="games">遊戲</Label>
                    <Input
                      type="select"
                      name="games"
                      id="games"
                      value={game_id}
                      onChange={e => setGameId(e.target.value)}
                      invalid={errors.game_id ? true : false}
                    >
                      <option>請選擇</option>
                      {games &&
                        games
                          .filter(game => game.is_active === 1)
                          .map(game => (
                            <option
                              key={"games-" + game.game_id}
                              value={game.game_id}
                            >
                              {game.game_name}
                            </option>
                          ))}
                    </Input>
                    <FormFeedback>{errors.game_id}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="txtTitle">項目描述</Label>
                    <Input
                      type="text"
                      name="txtTitle"
                      id="txtTitle"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="請輸入批次項目相關描述"
                      invalid={errors.title ? true : false}
                    />

                    <FormFeedback>{errors.title}</FormFeedback>
                  </FormGroup>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="sm"
                onClick={e => setModal(!modal)}
              >
                取消
              </Button>
              <Button color="primary" onClick={e => confirmUpdate()}>
                確認{actMode}
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  );
};

BatchListPage.propTypes = {
  getBatchTasks: PropTypes.func.isRequired,
  editBatchTask: PropTypes.func.isRequired,
  deleteBatchTask: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  records: state.BatchTasks.list,
  games: state.BatchTasks.games,
  loading: state.BatchTasks.loading,
  error: state.BatchTasks.error,
  updateOKMessage: state.BatchTasks.updateOKMessage,
  question_type: state.Service.question_type
});

export default connect(mapStateToProps, {
  getBatchTasks,
  editBatchTask,
  deleteBatchTask,
  clearBatchTaskMessage
})(BatchListPage);
