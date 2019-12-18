import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "../../../../components/PageTitle";
import moment from "moment";
import Moment from "react-moment";
import {
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Badge
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import Spinner from "../../../../components/Spinner";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import {
  getServiceConfig,
  getQuestions,
  clearMessage
} from "../../../../redux/actions";
import AllocateStatusBadge from "../../allocate/AllocateStatusBadge";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { csvHeaders } from "../csv/settings";
import QuestionExpandRow from "./QuestionExpandRow";
import QuerySearchBox from "./QuerySearchBox";
const QuestionsQueryHome = ({
  games,

  getServiceConfig,
  records,
  getQuestions,
  loading,
  clearMessage,
  error,
  question_type = {},
  question_status = {},
  reply_query,
  newAllocationStatus
}) => {
  const [arrangedData, setArrangedData] = useState([]);

  let mainTitle = "案件查詢";
  const fileName = `案件查詢_${moment().format("YYYY-MM-DD")}${Date.now()}`;

  useEffect(() => {
    getServiceConfig();
    clearMessage();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      const newRecords = records.map(item => {
        const replies = reply_query.filter(
          reply => reply.question_id === item.id
        );

        const newAllocateRecord = newAllocationStatus.filter(
          al => al.question_id === item.id
        );

        return {
          ...item,
          status_text: question_status[item.status],
          type_text: question_type[item.type],
          replies,
          newAllocateRecord
        };
      });

      setArrangedData(newRecords);
    } else {
      setArrangedData([]);
    }
  }, [records]);

  const handleSearchClick = conditions => {
    //console.log(inStockDateFilter);

    console.log("conditions", conditions);
    getQuestions(conditions);
    // setArrangedData(
    //   records.filter(
    //     row =>
    //       moment(row.create_time).format("YYYY-MM-DDTHH:mm") >= beginTime &&
    //       moment(row.create_time).format("YYYY-MM-DDTHH:mm") <= endTime
    //   )
    // );
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  const columns = [
    {
      dataField: "id",
      text: "#"
    },

    {
      dataField: "type",
      text: "類型",
      sort: true,
      formatter: (cellContent, row) => {
        return <span>{question_type[cellContent]}</span>;
      }
    },
    {
      dataField: "game_name",
      text: "遊戲",
      formatter: (cellContent, row) => {
        return <span>{cellContent}</span>;
      }
    },
    {
      dataField: "character_name",
      text: "角色",
      headerStyle: (column, colIndex) => {
        return { width: "158px" };
      },
      formatter: (cellContent, row) => {
        return (
          <span className="text-dark">
            {row.character_name.replace("&gt;", ">").replace("&lt;", "<")}

            <span className="text-muted">({row.server_name})</span>
            {row.is_in_game === "0" ? (
              <Badge color="success-lighten">自填</Badge>
            ) : (
              <span className="d-block">{row.partner_uid}</span>
            )}
          </span>
        );
      }
    },
    {
      dataField: "content",
      text: "提問描述",
      headerStyle: (column, colIndex) => {
        return { width: "518px" };
      },
      attrs: (cell, row) => ({ title: `${row.content}` }),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <a
              href={`/service/view/${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-info mb-1 d-block"
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
            <small className="text-muted">
              <Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>
            </small>
          </Fragment>
        );
      }
    },
    {
      dataField: "status",
      text: "狀態",
      formatter: (cell, row) => {
        let newAllocateMark;
        // const newAllocateRecord = newAllocationStatus.filter(
        //   al => al.question_id === row.id
        // );
        //newAllocateMark = newAllocateRecord.length > 0 ? "後送" : "";
        if (row.newAllocateRecord.length > 0) {
          newAllocateMark = (
            <Fragment>
              <hr />
              <span className="pr-2 text-nowrap mb-0 d-inline-block">
                <i className="mdi mdi-briefcase-outline text-muted"></i>{" "}
                <AllocateStatusBadge
                  status_code={row.newAllocateRecord[0].allocate_status}
                />
              </span>
              <span className="text-nowrap mb-2 d-inline-block">
                <i className="mdi mdi-face text-muted"></i>{" "}
                <b>{row.newAllocateRecord[0].assignee_name}</b>{" "}
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
      dataField: "country",
      text: "國家",
      formatter: (cellContent, row) => {
        return <span>{cellContent}</span>;
      }
    }
  ];

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: "/service/", active: false },
          { label: mainTitle, path: "/service/query", active: true }
        ]}
        title={mainTitle}
      />

      <QuerySearchBox
        handleSearchClick={handleSearchClick}
        question_type={question_type}
        question_status={question_status}
        games={games}
      />

      <Row>
        <Col>
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
        <Col lg={12}>
          {loading ? (
            <Spinner className="m-2" color="secondary" />
          ) : (
            <PaginationProvider
              pagination={paginationFactory({
                custom: true,
                totalSize: arrangedData.length,
                sizePerPage: 100,
                paginationTotalRenderer: customTotal
              })}
            >
              {({ paginationProps, paginationTableProps }) => (
                <div>
                  <PaginationTotalStandalone {...paginationProps} />
                  <PaginationListStandalone {...paginationProps} />

                  <BootstrapTable
                    keyField="id"
                    data={arrangedData}
                    columns={columns}
                    condensed
                    noDataIndication="無紀錄"
                    defaultSorted={[
                      {
                        dataField: "create_time",
                        order: "desc"
                      }
                    ]}
                    wrapperClasses="table-responsive"
                    rowClasses="text-dark m-0 font-13"
                    expandRow={QuestionExpandRow}
                    filter={filterFactory()}
                    {...paginationTableProps}
                  />
                </div>
              )}
            </PaginationProvider>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

QuestionsQueryHome.propTypes = {
  getServiceConfig: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  games: state.Service.games_list,
  records: state.Service.list,
  question_type: state.Service.question_type,
  question_status: state.Service.question_status,
  reply_query: state.Service.reply_query,
  loading: state.Service.loading,
  error: state.ServiceAllocate.error,
  newAllocationStatus: state.Service.newAllocationStatus,
  allocation_status: state.Service.allocation_status
});

export default connect(mapStateToProps, {
  getQuestions,
  clearMessage,
  getServiceConfig
})(QuestionsQueryHome);
