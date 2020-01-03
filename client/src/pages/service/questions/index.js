import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Badge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
  Form,
  FormGroup,
  Button,
  CustomInput
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { CSVLink } from "react-csv";
import { csvHeaders } from "./csv/settings";
import filterFactory, {
  Comparator,
  textFilter,
  selectFilter,
  dateFilter
} from "react-bootstrap-table2-filter";
import PageTitle from "../../../components/PageTitle";
import {
  getGames,
  getQuestions,
  updateQuestionType,
  updateQuestionStatus,
  favorQuestion,
  removeQuestionFromBatch,
  addQuestionToBatch
} from "../../../redux/actions";
import Moment from "react-moment";
import moment from "moment";
import Spinner from "../../../components/Spinner";
import AllocateStatusBadge from "../allocate/AllocateStatusBadge";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import PropTypes from "prop-types";
import "moment/locale/zh-tw";
const QuestionListPage = ({
  getGames,
  games,
  records,
  add_favor_ok,
  batch_tasks,
  getQuestions,
  loading,
  error,
  question_type = {},
  question_status = {},
  tasks,
  reply_query,
  newAllocationStatus,
  favorQuestion,
  removeQuestionFromBatch,
  addQuestionToBatch,
  updateQuestionType,
  updateQuestionStatus,
  location
}) => {
  //console.log("location", location);
  // console.log("match", rest);
  // console.log("query", rest);

  const mainPath = "/service";
  const pathName = location.pathname.split("/");
  const path = pathName[pathName.length - 1];
  // const defaultStatus = path === "todo" ? "1" : path === "get_list" ? "2" : "4";

  // const mainTitle =
  //   defaultStatus === "1" ? "待處理案件(自動重整)" : "等待中案件";

  let defaultStatus;
  let mainTitle;
  if (path === "todo") {
    defaultStatus = "1";
    mainTitle = "待處理案件(自動重整)";
  } else if (path === "get_list") {
    defaultStatus = "2";
    mainTitle = "等待中案件";
  } else if (path === "closed") {
    defaultStatus = "4";
    mainTitle = "近期結案案件";
  } else if (path === "favorite") {
    defaultStatus = "favorite";
    mainTitle = "我收藏的案件";
  } else if (path === "hidden") {
    defaultStatus = "hidden";
    mainTitle = "隱藏案件";
  }

  // console.log("query", rest);
  const [arrangedData, setArrangedData] = useState([]);
  const [beginTime, setBeginTime] = useState(
    moment().format("YYYY-MM-DDT00:00")
  );
  const [endTime, setEndTime] = useState(moment().format("YYYY-MM-DDT23:59"));
  const [searchActivated, setSearchActivated] = useState(false);

  moment.locale("zh-tw");
  //console.log("games", games);

  useEffect(() => {
    const condition = { status: defaultStatus };
    getQuestions(condition);
    if (games.length === 0) {
      getGames();
    }

    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedData(records);

    if (defaultStatus === "1") {
      let timeOutId;

      timeOutId = setTimeout(() => {
        const condition = { status: defaultStatus };
        getQuestions(condition);
        //console.log("getQuestions effect timeOutId", timeOutId);
      }, 30000);
      return () => {
        //console.log("getQuestions effect  clearTimeout timeOutId", timeOutId);
        clearTimeout(timeOutId);
      };
    }
  }, [records]);

  const onTypeChange = (id, newType) => {
    //console.log("call onTypeChange", id, newType);
    updateQuestionType(id, newType);
  };

  const onStatusChange = (id, newStatus) => {
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
  //console.log("selTypeOptions", selTypeOptions);

  const filterByMultiUserCol = (filterVal, data) => {
    //console.log("filterVal", filterVal);
    if (filterVal) {
      return data.filter(
        item =>
          (item.character_name &&
            item.character_name.indexOf(filterVal) > -1) ||
          (item.partner_uid && item.partner_uid.indexOf(filterVal) > -1) ||
          (item.email && item.email.indexOf(filterVal) > -1) ||
          (item.phone && item.phone.indexOf(filterVal) > -1)
      );
    }
    return data;
  };

  const filterByContentOrReply = (filterVal, data) => {
    //console.log("filterVal", filterVal);
    if (filterVal) {
      return data.filter(
        item =>
          (item.content && item.content.indexOf(filterVal) > -1) ||
          reply_query
            .filter(reply => reply.question_id === item.id)
            .filter(
              reply => reply.content && reply.content.indexOf(filterVal) > -1
            ).length > 0
      );
    }
    return data;
  };

  const onRemoveFavor = question_id => {
    favorQuestion(question_id, "remove");
  };
  const onAddFavor = question_id => {
    favorQuestion(question_id, "add");
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return { width: "110px" };
      },
      formatter: (cellContent, row) => {
        let favorMark;
        let batchMark;
        if (add_favor_ok) {
          favorMark = row.is_favorite ? (
            <span
              color="link"
              className="btn-icon text-warning"
              style={{ cursor: "pointer" }}
              onClick={e => onRemoveFavor(row.id)}
            >
              ⭐
            </span>
          ) : (
            <span
              color="link"
              className="btn-icon text-dark"
              style={{ cursor: "pointer" }}
              onClick={e => onAddFavor(row.id)}
            >
              <i className="mdi mdi-star-outline ml-1 mr-1"></i>
            </span>
          );

          if (batch_tasks.length > 0) {
            if (row.is_batch === 0) {
            } else {
              batchMark = (
                <span
                  color="link"
                  className="btn-icon text-warning"
                  style={{ cursor: "pointer" }}
                  onClick={e => removeQuestionFromBatch(row.id)}
                >
                  🔒
                </span>
              );
            }
          }
        }
        return (
          <h5>
            {favorMark} {batchMark} {cellContent}
          </h5>
        );
      }
    },
    {
      dataField: "game_name",
      text: "遊戲",
      headerStyle: (column, colIndex) => {
        return { width: "138px" };
      },
      formatter: cell => selGameOptions[cell],
      filter: selectFilter({
        options: selGameOptions
      })
    },
    {
      dataField: "character_name",
      text: "角色(可搜尋角色名/uid/Email/手機)",
      headerStyle: (column, colIndex) => {
        return { width: "158px" };
      },
      filter: textFilter({
        placeholder: "角色/uid/Email/手機",
        onFilter: filterByMultiUserCol
      }),
      formatter: (cellContent, row) => {
        return (
          <p className="text-dark">
            {row.character_name.replace("&gt;", ">").replace("&lt;", "<")}

            <span className="text-muted">({row.server_name})</span>
            {row.is_in_game === "0" ? (
              <Badge color="success-lighten">自填</Badge>
            ) : (
              <span className="d-block">{row.partner_uid}</span>
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
      text: "描述(可搜尋玩家提問或回覆內容)",
      headerStyle: (column, colIndex) => {
        return { width: "318px" };
      },
      attrs: (cell, row) => ({ title: `${row.content}` }),
      filter: textFilter({
        placeholder: "提問或回覆",
        onFilter: filterByContentOrReply
      }),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <a
              href={`${mainPath}/view/${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>

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
        let newAllocateMark;
        const newAllocateRecord = newAllocationStatus.filter(
          al => al.question_id === row.id
        );
        //newAllocateMark = newAllocateRecord.length > 0 ? "後送" : "";
        if (newAllocateRecord.length > 0) {
          newAllocateMark = (
            <Fragment>
              <hr />
              <span className="pr-2 text-nowrap mb-0 d-inline-block">
                <i className="mdi mdi-briefcase-outline text-muted"></i>{" "}
                <AllocateStatusBadge
                  status_code={newAllocateRecord[0].allocate_status}
                />
              </span>
              <span className="text-nowrap mb-2 d-inline-block">
                <i className="mdi mdi-face text-muted"></i>{" "}
                <b>{newAllocateRecord[0].assignee_name}</b>{" "}
              </span>
            </Fragment>
          );
        }

        let allocateMark;
        if (row.allocate_status === "1") {
          allocateMark = (
            <span className="text-danger d-block">
              <i className="mdi mdi-hand"></i>[舊版]後送中
            </span>
          );
        } else if (row.allocate_status === "2") {
          allocateMark = (
            <span className="text-success d-block">
              <i className="mdi mdi-hand-okay"></i>[舊版]後送完成
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
            row.system_closed === "1"
              ? "系統"
              : row.close_admin_uid
              ? ""
              : "玩家"
          } ${question_status[row.status]}`;
        } else if (row.status === "7") {
          statusColor = "secondary-lighten";
          statusText = question_status[row.status];
        }

        return (
          <Fragment>
            <Badge color={statusColor} className="mr-1">
              {statusText}
            </Badge>
            {isReadMark}
            {allocateMark}
            {newAllocateMark}
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
            {Object.keys(countedNames).map((uname, index) => (
              <li key={`${row.id}-cs-uname${index}`}>
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
      filter: dateFilter({
        delay: 400,
        placeholder: "custom placeholder",
        withoutEmptyComparatorOption: true,
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
        style: { display: "inline-grid" },
        className: "custom-datefilter-class",
        comparatorStyle: { backgroundColor: "antiquewhite" },
        comparatorClassName: "custom-comparator-class",
        dateStyle: { width: "118px", margin: "0px" },
        dateClassName: "custom-date-class"
      }),
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
            <UncontrolledButtonDropdown size="sm">
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
                {tasks.filter(task => task.game_id === row.game_id).length >
                  0 && row.is_batch === 0 ? (
                  tasks
                    .filter(task => task.game_id === row.game_id)
                    .map(task => (
                      <DropdownItem
                        className="text-info"
                        key={`taskkey-${task.id}`}
                        onClick={e => addQuestionToBatch(row.id, task.id)}
                      >
                        🛒 {task.id} - {task.title}
                      </DropdownItem>
                    ))
                ) : (
                  <DropdownItem disabled>
                    {row.is_batch === 0 ? "沒有相關案件" : "已在批次中"}{" "}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </React.Fragment>
        );
      }
    },
    {
      dataField: "timer",
      isDummyField: true,
      text: "等待時間",

      formatter: (cellContent, row) => {
        let minutes;

        if (row.last_replied === "N") {
          //依照等級等待時長區分顏色12小內為綠色、23:59小時-12:00為橘色、大於24小時為紅色
          minutes = moment().diff(moment(row.create_time), "minutes");
        }
        if (row.last_replied === "U") {
          const replies = reply_query.filter(
            reply => reply.question_id === row.id
          );
          let userFirstReplyTime;

          if (replies.filter(r => r.is_official === "1").length === 0) {
            minutes = moment().diff(moment(row.create_time), "minutes");
          } else {
            for (let index = replies.length - 1; index > 0; index--) {
              const reply = replies[index];
              if (reply.is_official === "1") {
                userFirstReplyTime = replies[index + 1]
                  ? replies[index + 1].create_time
                  : reply.create_time;
                break;
              } else {
                userFirstReplyTime = replies[index].create_time;
              }
            }

            minutes = moment().diff(moment(userFirstReplyTime), "minutes");
          }
        }

        const tColor =
          minutes < 720
            ? "text-success"
            : minutes < 1440
            ? "text-warning"
            : "text-danger";

        return (
          <span className={`${tColor} font-11`}>
            {minutes ? `${Math.floor(minutes / 60)} h ${minutes % 60} m` : ""}
          </span>
        );
      }
    }
  ];

  //編號	遊戲	角色名稱	提問類型	描述	原廠uid	狀態	處理人	日期
  const fileName = `提問單_${moment().format("YYYY-MM-DD")}${Date.now()}`;

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  const handleSearchClick = e => {
    //console.log(inStockDateFilter);
    e.preventDefault();
    setSearchActivated(true);
    setArrangedData(
      records.filter(
        row =>
          moment(row.create_time).format("YYYY-MM-DDTHH:mm") >= beginTime &&
          moment(row.create_time).format("YYYY-MM-DDTHH:mm") <= endTime
      )
    );
  };
  const clearSearch = e => {
    //console.log(inStockDateFilter);
    setSearchActivated(false);
    e.preventDefault();
    setArrangedData(records);
  };

  const customRowStyle = (row, rowIndex) => {
    const style = {};
    if (row.is_batch > 0) {
      style.backgroundColor = "silver";
    } else {
      style.backgroundColor = "#FFFFFF";
    }

    return style;
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: "/service/", active: false },
          { label: "待處理案件", path: "/service/questions/list", active: true }
        ]}
        title={mainTitle}
      />
      <Row>
        <Col>
          <Form inline>
            <FormGroup>
              {" "}
              提問時間:
              <Input
                size="sm"
                type="datetime-local"
                name="create_time_begin"
                id="create_time_begin"
                value={moment(beginTime).format("YYYY-MM-DDTHH:mm")}
                onChange={e => {
                  if (
                    moment(e.target.value).format("YYYY-MM-DDTHH:mm") !==
                    "Invalid date"
                  )
                    return setBeginTime(e.target.value);
                }}
              />{" "}
              ~
              <Input
                size="sm"
                type="datetime-local"
                name="create_time_end"
                id="create_time_end"
                value={moment(endTime).format("YYYY-MM-DDTHH:mm")}
                onChange={e => {
                  if (
                    moment(e.target.value).format("YYYY-MM-DDTHH:mm") !==
                    "Invalid date"
                  )
                    return setEndTime(e.target.value);
                }}
              />
              <button
                className={`btn btn-sm ml-2 btn-${
                  searchActivated ? "primary" : "secondary"
                }`}
                onClick={e => handleSearchClick(e)}
              >
                搜尋
              </button>
              <button
                className={`btn btn-sm ml-2 btn-${
                  searchActivated ? "secondary" : "primary"
                }`}
                onClick={e => clearSearch(e)}
              >
                清除條件
              </button>
            </FormGroup>
          </Form>

          <Form inline className="mb-2 mt-2">
            {arrangedData.length > 0 && (
              <CSVLink
                data={arrangedData.map(item => ({
                  ...item,
                  create_time: moment(item.create_time).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  status: question_status[item.status],
                  type: question_type[item.type]
                }))}
                headers={csvHeaders}
                filename={fileName + ".csv"}
              >
                下載 csv檔案
              </CSVLink>
            )}
          </Form>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col lg={12}>總筆數: {records.length} </Col>
      </Row>

      <Row className="mb-2">
        <Col lg={12}>
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                striped
                hover
                condensed
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
                  sizePerPage: 100,
                  showTotal: true,
                  paginationTotalRenderer: customTotal
                })}
                classes="border-dark"
                rowClasses="text-dark m-0 font-13"
                rowStyle={customRowStyle}
                wrapperClasses="border-dark"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

QuestionListPage.propTypes = {
  getQuestions: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  games: state.Games.list,
  records: state.Service.list,
  add_favor_ok: state.Service.add_favor_ok,
  batch_tasks: state.Service.tasks,

  question_type: state.Service.question_type,
  question_status: state.Service.question_status,
  tasks: state.Service.tasks,
  reply_query: state.Service.reply_query,
  loading: state.Service.loading,
  error: state.ServiceAllocate.error,
  newAllocationStatus: state.Service.newAllocationStatus,
  allocation_status: state.Service.allocation_status
});

export default connect(mapStateToProps, {
  getQuestions,
  getGames,
  updateQuestionType,
  updateQuestionStatus,
  favorQuestion,
  removeQuestionFromBatch,
  addQuestionToBatch
})(QuestionListPage);
