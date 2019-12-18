import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "../../../components/PageTitle";
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
  Alert
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import classNames from "classnames";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { getOfflineCsData } from "../../../redux/actions";

import Moment from "react-moment";
import CaseViewBasic from "./CaseViewBasic";
import Spinner from "../../../components/Spinner";
import PropTypes from "prop-types";

const CplCaseHome = ({
  getOfflineCsData,
  records,
  loading,
  error,
  config_status
}) => {
  const [keyword, setKeyword] = useState("");
  const [selGame, setSelGame] = useState("");
  const [filter, setFilter] = useState("all");
  const [arrangedData, setArrangedData] = useState([]);
  const [selStatus, setSelStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [gameOptions, setGameOptions] = useState([
    { game_id: "", game_name: "" }
  ]);

  const filterStatus = type => {
    //console.log('filter selGame', selGame);
    //console.log('filter status', selStatus);
    const gameFilter = (game_id, record) => {
      if (game_id !== "") {
        return record.game_id === game_id;
      }
      return true;
    };

    const statusFilter = (status, record) => {
      if (status !== "") {
        return record.status === status;
      }
      return true;
    };
    //const newData = records.filter(record => record.status === selStatus);
    const newData = records.filter(
      record =>
        (record.o_case_id.indexOf(keyword) > -1 ||
          record.appellant.indexOf(keyword) > -1) &&
        gameFilter(selGame, record) &&
        statusFilter(selStatus, record)
    );
    setFilter("keyword");
    setArrangedData(newData);
  };

  const mainTitle = "消保";
  useEffect(() => {
    //console.log('startDate', startDate);
    //console.log('endDate', endDate);
    getOfflineCsData("cpl_case");
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setArrangedData(records);

    const distinctGames = [];
    const map = new Map();
    for (const item of records) {
      if (!map.has(item.game_id)) {
        map.set(item.game_id, true);
        distinctGames.push({
          game_id: item.game_id,
          game_name: item.game_name
        });
      }
    }
    setGameOptions(distinctGames);
  }, [records]);
  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  //#  	發文字號	發文日期	承辦人姓名	回文期限  	角色資訊	結案日期  	狀態	建立時間
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "o_case_id",
      text: "發文字號",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            {" "}
            <Link to={`/offline/cpl_case/view/${row.id}`}>{cellContent}</Link>
            {row.has_attached > 0 && <i className="mdi mdi-attachment" />}{" "}
          </Fragment>
        );
      }
    },

    {
      dataField: "o_case_date",
      text: "發文日期",
      formatter: (cellContent, row) => {
        return <Moment format="YYYY/MM/DD">{row.o_case_date}</Moment>;
      }
    },

    {
      dataField: "appellant",
      text: "申訴人",
      sort: true
    },
    {
      dataField: "reason",
      text: "申訴原因",
      sort: true
    },
    {
      dataField: "deadline",
      text: "回文期限",
      sort: true,
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD">{row.deadline}</Moment>;
      }
    },
    {
      dataField: "role_info",
      isDummyField: true,
      text: "角色資訊",
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            【{row.game_name}】{row.role_name} ({row.server_name})
          </Fragment>
        );
      }
    },
    {
      dataField: "close_date",
      text: "結案日期",
      sort: true,
      formatter: (cellContent, row) => {
        if (row.close_date !== "1899-11-29T16:00:00.000Z" && row.close_date) {
          return <Moment format="YYYY-MM-DD">{row.close_date}</Moment>;
        }
      }
    },
    {
      dataField: "status",
      text: "狀態",
      sort: false,
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <h5>
              <span
                className={classNames("badge", {
                  "badge-dark-lighten": row.status === "5",
                  "badge-success-lighten": row.status === "4",
                  "badge-warning-lighten": row.status === "3",
                  "badge-info-lighten": row.status === "2",
                  "badge-danger-lighten": row.status === "1"
                })}
              >
                {row.status === "5" && (
                  <i className="mdi mdi-emoticon-dead mr-1"></i>
                )}
                {row.status === "4" && <i className="mdi mdi-check mr-1"></i>}
                {row.status === "3" && <i className="mdi mdi-coffee mr-1"></i>}
                {row.status === "2" && (
                  <i className="mdi mdi-comment-check mr-1"></i>
                )}
                {row.status === "1" && (
                  <i className="mdi mdi-timer-sand mr-1"></i>
                )}
                {row.status} - {config_status[row.status]}
              </span>
            </h5>
          </React.Fragment>
        );
      }
    },
    {
      dataField: "create_time",
      text: "建立時間",
      sort: true,
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>;
      }
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Link
              to={`/offline/cpl_case/edit/${row.id}`}
              className="action-icon"
            >
              {" "}
              <i className="mdi mdi-square-edit-outline"></i>
            </Link>
          </React.Fragment>
        );
      }
    }
  ];

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandByColumnOnly: true,
    renderer: row => <CaseViewBasic row={row} config_status={config_status} />
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  if (errors.msg) {
    return (
      <Alert color="danger" isOpen={errors.msg ? true : false}>
        <div>{errors.msg}</div>
      </Alert>
    );
  }

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "線下客服", path: "/offline/cpl_case", active: false },
          { label: mainTitle, path: "/offline/cpl_case", active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col sm={4}>
          <Link
            to="/offline/cpl_case/create"
            className="btn btn-rounded btn-danger mb-3"
          >
            <i className="mdi mdi-plus-circle mr-2" /> 新增消保案
          </Link>
        </Col>
        <Col md={8} sm={8}>
          <Form inline className="mb-2 float-right">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="status" className="mr-sm-2">
                遊戲:
              </Label>
              <Input
                type="select"
                name="sel_game"
                id="sel_game"
                className="custom-select"
                onChange={e => setSelGame(e.target.value)}
              >
                <option value="">選擇遊戲...</option>
                {gameOptions.map(game => (
                  <option key={`sel-${game.game_id}`} value={game.game_id}>
                    {game.game_name}
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
                name="sel_status"
                id="sel_status"
                className="custom-select"
                onChange={e => setSelStatus(e.target.value)}
              >
                <option value="">狀態...</option>
                {config_status &&
                  Object.keys(config_status).map(status => (
                    <option key={`cs-${status}`} value={status}>
                      {status} - {config_status[status]}
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
                placeholder="查找發文字號, 申訴人..."
                value={keyword}
                onChange={e => setKeyword(e.target.value.trim())}
              />
            </FormGroup>
            <Button
              color={filter === "keyword" ? "primary" : "light"}
              onClick={() => filterStatus("keyword")}
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
                pagination={paginationFactory({
                  showTotal: true,
                  totalSize: arrangedData.length,
                  sizePerPage: 10,
                  paginationTotalRenderer: customTotal
                })}
                className="font-13"
                wrapperClasses="table-responsive"
                expandRow={expandRow}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

CplCaseHome.propTypes = {
  getOfflineCsData: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  records: state.OfflineCs.records,
  config_status: state.OfflineCs.config_status,
  loading: state.OfflineCs.loading,
  error: state.OfflineCs.error
});

export default connect(mapStateToProps, { getOfflineCsData })(CplCaseHome);
