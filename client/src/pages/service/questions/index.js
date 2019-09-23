import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Label,
  Table,
  Input,
  Form,
  FormGroup,
  Alert,
  Badge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import {
  getGames,
  getQuestions,
  updateQuestionType,
  updateQuestionStatus
} from "../../../redux/actions";
import Moment from "react-moment";
import moment from "moment";
import Spinner from "../../../components/Spinner";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import PropTypes from "prop-types";
import "moment/locale/zh-tw";
const QuestionListPage = ({
  getGames,
  games,
  records,
  getQuestions,
  loading,
  error,
  question_type = {},
  question_status = {},
  reply_query,
  updateQuestionType,
  updateQuestionStatus,
  location
}) => {
  //console.log("location", location);
  // console.log("match", rest);
  // console.log("query", rest);
  const mainTitle = "客服案件列表";
  const mainPath = "/service";
  const pathName = location.pathname.split("/");
  const defaultStatus = pathName[pathName.length - 1] === "todo" ? "1" : "2";
  // console.log("query", rest);
  const [arrangedData, setArrangedData] = useState([]);
  const [gameId, setGameId] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");

  moment.locale("zh-tw");
  //console.log("games", games);

  useEffect(() => {
    const condition = { status };
    getQuestions(condition);
    if (games.length === 0) {
      getGames();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedData(records);
  }, [records]);

  const filterStatus = (id, value) => {
    //console.log("filterStatus", id, value);
    let newData = records;
    switch (id) {
      case "gameId":
        setGameId(value);
        if (value !== "") {
          newData = records.filter(record => record.game_id === value);
        }
        if (type !== "") {
          newData = newData.filter(record => record.type === type);
        }
        if (status !== "") {
          newData = newData.filter(record => record.status === status);
        }
        break;
      case "type":
        setType(value);
        if (value !== "") {
          newData = records.filter(record => record.type === value);
        }
        if (gameId !== "") {
          newData = newData.filter(record => record.game_id === gameId);
        }
        if (status !== "") {
          newData = newData.filter(record => record.status === status);
        }
        break;
      case "status":
        setStatus(value);
        if (value !== "") {
          newData = records.filter(record => record.status === value);
        }
        if (gameId !== "") {
          newData = newData.filter(record => record.game_id === gameId);
        }
        if (type !== "") {
          newData = newData.filter(record => record.type === type);
        }
        break;
      case "keyword":
        setKeyword(value);
        if (value !== "") {
          newData = records.filter(
            record => JSON.stringify(record).indexOf(value) > -1
          );
        }
        if (gameId !== "") {
          newData = newData.filter(record => record.game_id === gameId);
        }
        if (type !== "") {
          newData = newData.filter(record => record.type === type);
        }
        if (status !== "") {
          newData = newData.filter(record => record.status === status);
        }
        break;
      default:
        //console.log("into default");
        break;
    }

    setArrangedData(newData);
  };

  const onTypeChange = (id, newType) => {
    //console.log("call onTypeChange", id, newType);
    updateQuestionType(id, newType);
  };

  const onStatusChange = (id, newStatus) => {
    console.log("call updateStatus", id);
    //調回處理中 1 or 隱藏 0
    updateQuestionStatus(id, newStatus);
  };

  //#	遊戲	角色名稱	提問類型	描述	原廠uid	狀態	處理人	日期	回覆日期

  let selGameOptions = {};
  const selGameOptionsArray = new Set(arrangedData.map(q => q.game_name));
  selGameOptionsArray.forEach((g, index) => {
    selGameOptions[index] = g;
  });

  let selTypeOptions = {};
  const selTypeArray = new Set(arrangedData.map(q => q.type));
  selTypeArray.forEach((t, index) => {
    selTypeOptions[index] = question_type[t];
  });
  console.log("selTypeOptions", selTypeOptions);

  const columns = [
    {
      dataField: "id",
      text: "#"
    },
    {
      dataField: "game_name",
      text: "遊戲",
      formatter: cell => selGameOptions[cell],
      filter: selectFilter({
        options: selGameOptions
      })
    },
    {
      dataField: "character_name",
      text: "角色名稱",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <p className="text-dark">
            {row.character_name}{" "}
            <span className="text-muted">({row.server_name})</span>
            {row.is_in_game === "0" ? (
              <Badge color="success-lighten" className="mr-1">
                玩家填寫
              </Badge>
            ) : (
              <div>{row.partner_uid}</div>
            )}
          </p>
        );
      }
    },
    {
      dataField: "type",
      text: "提問類型",
      headerStyle: (column, colIndex) => {
        return { width: "118px", height: "50px" };
      },
      filter: selectFilter({
        options: selTypeOptions
      }),
      formatter: (cell, row) => {
        return (
          <Input
            type="select"
            name="sel_type"
            className=" m-0 p-0"
            value={row.type}
            onChange={e => onTypeChange(row.id, e.target.value)}
          >
            {Object.keys(question_type).map(typeKey => (
              <option key={`type-${typeKey}-${row.id}`} value={typeKey}>
                {question_type[typeKey]}
              </option>
            ))}
          </Input>
        );
      }
    },

    {
      dataField: "content",
      text: "描述",
      headerStyle: (column, colIndex) => {
        return { width: "318px" };
      },
      attrs: (cell, row) => ({ title: `${row.content}` }),
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <Link
              to={`${mainPath}/view/${row.id}`}
              className="text-info font-weight-bold mb-1 d-block"
            >
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    row.content.length > 100
                      ? row.content.substr(0, 100) + "..."
                      : row.content
                }}
                title={row.content}
              ></p>
            </Link>

            {row.pic_path1 && (
              <i className="mdi mdi-image-size-select-actual"></i>
            )}
          </Fragment>
        );
      }
    },

    {
      dataField: "status",
      text: "狀態",
      formatter: (cell, row) => {
        let allocateMark;
        if (row.allocate_status === "1") {
          allocateMark = (
            <span className="text-danger">
              <i className="mdi mdi-hand"></i>
            </span>
          );
        } else if (row.allocate_status === "2") {
          allocateMark = (
            <span className="text-success">
              <i className="mdi mdi-hand-okay"></i>
            </span>
          );
        }

        let isReadMark;
        if (row.status !== "1" && row.status !== "0") {
          isReadMark =
            row.is_read === "0" ? (
              <span className="text-secondary">(未讀)</span>
            ) : (
              <span className="text-success">(已讀)</span>
            );
        }

        let statusColor;
        let statusText;

        if (row.status === "1") {
          statusColor = "danger-lighten";
          statusText = question_status[row.status];
        } else if (row.status === "2") {
          statusColor = "info-lighten";
          statusText = question_status[row.status];
        } else if (row.status === "4") {
          statusColor = "success-lighten";
          statusText = `${
            row.system_closed == "1"
              ? "系統"
              : row.close_admin_uid
              ? ""
              : "玩家"
          } ${question_status[row.status]}`;
        }

        return (
          <Fragment>
            <Badge color={statusColor} className="mr-1">
              {statusText}
            </Badge>
            {isReadMark}
            {allocateMark}
          </Fragment>
        );
      }
    },
    {
      dataField: "admin_uname",
      text: "處理人",
      headerClasses: "text-nowrap",
      formatter: (cellContent, row) => {
        const countedNames = reply_query
          .filter(
            reply => reply.question_id === row.id && reply.is_official > 0
          )
          .map(reply => reply.name)
          .reduce(function(allNames, name) {
            if (name in allNames) {
              allNames[name]++;
            } else {
              allNames[name] = 1;
            }
            return allNames;
          }, {}); //{"蟻力_客服D":2,"蟻力_客服Q":2,"蟻力_客服L":1,"蟻力_客服Z":1}
        return (
          <ul className="list-unstyled">
            {Object.keys(countedNames).map(uname => (
              <li>
                {uname}({countedNames[uname]})
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      dataField: "create_time",
      text: "日期",
      sort: true,
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD HH:mm:ss">{row.create_time}</Moment>;
      }
    },
    {
      dataField: "update_time",
      text: "最新回覆",
      headerClasses: "text-nowrap",
      sort: true,
      formatter: (cellContent, row) => {
        return row.last_replied === "N" ? (
          <Badge color="danger" className="mr-1">
            尚未回覆
          </Badge>
        ) : (
          <div
            className={
              "mr-1 " +
              (row.last_replied === "U" ? "text-success" : "text-info")
            }
          >
            {row.last_replied === "U" ? "玩家" : "官方"} 於{" "}
            {moment(row.last_replied_time).fromNow()}
            回覆
            <p className="text-muted">
              <small>
                <Moment format="YYYY-MM-DD HH:mm:ss">
                  {row.last_replied_time}
                </Moment>
              </small>
            </p>
          </div>
        );
      }
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <UncontrolledButtonDropdown>
              <DropdownToggle color="light" caret></DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  disabled={row.status === "1" ? true : false}
                  onClick={e => onStatusChange(row.id, "1")}
                >
                  {" "}
                  <i className="mdi mdi-restore"></i>調回處理中
                </DropdownItem>
                <DropdownItem onClick={e => onStatusChange(row.id, "0")}>
                  {" "}
                  <i className="mdi mdi-close"></i>隱藏
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>加入批次</DropdownItem>
                <DropdownItem disabled> (功能尚未完成)</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </React.Fragment>
        );
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
          { label: "待處理案件", path: "/service/questions/list", active: true }
        ]}
        title={"待處理案件(自動重整)"}
      />
      <Row className="mb-2">
        <Col lg={12}>總筆數: {records.length} </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <Form inline className="mb-2 float-right">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="status" className="mr-sm-2">
                遊戲:
              </Label>
              <Input
                type="select"
                name="gameId"
                id="gameId"
                className="custom-select"
                onChange={e => filterStatus(e.target.id, e.target.value)}
              >
                <option value="">選擇遊戲...</option>
                {games.map(game => (
                  <option key={`sel-${game.game_id}`} value={game.game_id}>
                    {game.game_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="status" className="mr-sm-2">
                問題類型:
              </Label>
              <Input
                type="select"
                name="type"
                id="type"
                className="custom-select"
                onChange={e => filterStatus(e.target.id, e.target.value)}
              >
                <option value="">問題類型...</option>
                {Object.keys(question_type).map(typeKey => (
                  <option key={`type-${typeKey}`} value={typeKey}>
                    {typeKey} - {question_type[typeKey]}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="status" className="mr-sm-2">
                狀態:
              </Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={status}
                className="custom-select"
                onChange={e => filterStatus(e.target.id, e.target.value)}
              >
                <option value="">狀態...</option>
                {Object.keys(question_status).map(statusKey => (
                  <option key={`status-${statusKey}`} value={statusKey}>
                    {statusKey} - {question_status[statusKey]}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="search" className="mr-sm-2">
                關鍵字:
              </Label>
              <input
                type="text"
                className="form-control"
                placeholder="查找關鍵字..."
                value={keyword}
                onChange={e => filterStatus("keyword", e.target.value.trim())}
              />
            </FormGroup>
            <Button
              color={"primary"}
              onClick={() => filterStatus("keyword", "")}
            >
              搜尋
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={arrangedData}
                columns={columns}
                defaultSorted={[
                  {
                    dataField: "id",
                    order: "desc"
                  }
                ]}
                filter={filterFactory()}
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
    </Fragment>
  );
};

QuestionListPage.propTypes = {
  getQuestionData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  games: state.Games.list,
  records: state.Service.list,
  question_type: state.Service.question_type,
  question_status: state.Service.question_status,
  reply_query: state.Service.reply_query,
  loading: state.Service.loading,
  error: state.ServiceAllocate.error
});

export default connect(
  mapStateToProps,
  { getQuestions, getGames, updateQuestionType, updateQuestionStatus }
)(QuestionListPage);
