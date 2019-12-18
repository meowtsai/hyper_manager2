import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Alert,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
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
  getAllocateData,
  takeAllocationTasks,
  clearAllocationMessage,
  reassignAllocationTask
} from "../../../redux/actions";
import Moment from "react-moment";
import Spinner from "../../../components/Spinner";
import PropTypes from "prop-types";
import AllocateStatusBadge from "./AllocateStatusBadge";

const AllocateListPage = ({
  records,
  getAllocateData,
  updateOKMessage,
  clearAllocationMessage,
  takeAllocationTasks,
  loading,
  error,
  allocationStatus,
  cs_members,
  reassignAllocationTask,
  user
}) => {
  const [arrangedData, setArrangedData] = useState([]);
  const [selAssigneeOptions, setSelAssigneeOptions] = useState({});
  const [defaultAssignee, setDefaultAssignee] = useState("");

  const mainTitle = "派單系統 - 待處理列表";

  //console.log("records", records);
  useEffect(() => {
    getAllocateData();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedData(records);

    let timeOutId;
    const selAssigneeOptionsArray = new Set(records.map(q => q.assignee_name));
    let tmpS = {};
    selAssigneeOptionsArray.forEach((g, index) => {
      if (g === user.admin_name) {
        setDefaultAssignee(index);
      }

      tmpS[index] = g;
    });
    setSelAssigneeOptions(tmpS);

    timeOutId = setTimeout(() => {
      getAllocateData();
      //console.log("getQuestions effect timeOutId", timeOutId);
    }, 30000);
    return () => {
      //console.log("getQuestions effect  clearTimeout timeOutId", timeOutId);
      clearTimeout(timeOutId);
    };
  }, [records]);

  useEffect(() => {
    //console.log("updateOKMessage effect", updateOKMessage);
    //console.log("error effect", error);
    let timeOutId;
    if (
      (updateOKMessage !== undefined && updateOKMessage !== null) ||
      (error !== undefined && error !== null)
    ) {
      //console.log("error effect", error);
      timeOutId = setTimeout(() => {
        clearAllocationMessage();
        //console.log("error effect timeOutId", timeOutId);
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage, error]);

  const clickTakeOnTasks = () => {
    takeAllocationTasks();
  };

  //{"allocation_id":3 , "new_assignee":86}

  const reassignClick = (allocation_id, new_assignee) => {
    reassignAllocationTask(allocation_id, new_assignee);
  };

  let selStatusOptions = {};

  const selectOption = allocationStatus
    ? Object.keys(allocationStatus).map(statusKey => statusKey)
    : [];

  selectOption.forEach((t, index) => {
    selStatusOptions[t] = allocationStatus[t].text;
  });

  //#  	案件編號：點選案件編號可連結至案件檢視頁面
  // 問題類型：用戶所選擇的問題類型
  // 描述：客訴內容，是一個超連結可以連至到案件檢視頁面
  // 狀態：已處理、未處理、結案三種
  // 負責人：
  const columns = [
    {
      dataField: "question_ctime",
      text: "提問時間",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <Moment format="YYYY-MM-DD HH:mm:ss">{row.allocation_time}</Moment>
        );
      }
    },
    {
      dataField: "question_id",
      text: "提問單",
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
      filter: textFilter(),
      sort: true
    },
    {
      dataField: "character_name",
      text: "暱稱",
      headerStyle: (column, colIndex) => {
        return { width: "200px" };
      },
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <p className="text-dark">
            {row.character_name.replace("&gt;", ">").replace("&lt;", "<")}

            <span className="text-muted">({row.server_name})</span>
            <span className="d-block">UID:{row.partner_uid}</span>
          </p>
        );
      }
    },
    {
      dataField: "content",
      text: "玩家提問",
      headerStyle: (column, colIndex) => {
        return { width: "318px" };
      },
      attrs: (cell, row) => ({ title: `${row.content}` }),
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <Link
              to={`/service/view/${row.question_id}`}
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
          </Fragment>
        );
      }
    },

    {
      dataField: "allocate_cause",
      text: "後送描述",
      headerStyle: (column, colIndex) => {
        return { width: "318px" };
      },
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <p className="font-13 text-dark">
              <Moment format="YYYY-MM-DD HH:mm:ss">
                {row.allocation_time}
              </Moment>{" "}
              -{row.assignor_name}: {row.allocate_cause}
            </p>
          </Fragment>
        );
      }
    },
    {
      dataField: "allocate_status",
      text: "後送狀態",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <p className="font-13 text-dark">
              <AllocateStatusBadge status_code={row.allocate_status} />
            </p>
            {row.lastestNote}
          </Fragment>
        );
      },
      filter: selectFilter({
        options: selStatusOptions,
        defaultValue: 1
      })
    },

    {
      dataField: "assignee_name",
      text: "被指派者",
      sort: true,
      filter: selectFilter({
        options: selAssigneeOptions,
        defaultValue: defaultAssignee
      }),
      style: (cell, row) => {
        if (row.ins_status === "new") {
          return {
            backgroundColor: "#81c784"
          };
        }
      }
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        if (
          user.role === "cs_master" ||
          user.role === "admin" ||
          user.role === "pm"
        ) {
          return (
            <UncontrolledButtonDropdown addonType="append">
              <DropdownToggle caret color="dark">
                手動指派
              </DropdownToggle>
              <DropdownMenu>
                {cs_members.map(cs => (
                  <DropdownItem
                    key={`assign_${cs.uid}`}
                    onClick={e => reassignClick(row.id, cs.uid)}
                  >
                    {cs.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          );
        } else return null;
      }
    }
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  let getTasksBtn;
  if (user.role === "cs_master" || user.role === "admin") {
    getTasksBtn = (
      <Card>
        <CardBody>
          <Button
            color="primary"
            className="btn-rounded"
            onClick={clickTakeOnTasks}
          >
            領取案件
          </Button>
        </CardBody>
      </Card>
    );
  }

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: "/service/", active: false },
          { label: "派單系統", path: "/service/allocate/list", active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col lg={4}>
          {error && (
            <Alert color="danger" isOpen={error ? true : false}>
              <div>{error}</div>
            </Alert>
          )}

          {updateOKMessage && (
            <Alert color="success" isOpen={updateOKMessage ? true : false}>
              <div>{updateOKMessage}</div>
            </Alert>
          )}

          {getTasksBtn}
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
    </Fragment>
  );
};

AllocateListPage.propTypes = {
  getAllocateData: PropTypes.func.isRequired,
  takeAllocationTasks: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  records: state.ServiceAllocate.list,
  cs_members: state.ServiceAllocate.cs_members,
  loading: state.ServiceAllocate.loading,
  error: state.ServiceAllocate.error,
  newTasks: state.ServiceAllocate.newTasks,
  updateOKMessage: state.ServiceAllocate.updateOKMessage,
  question_type: state.Service.question_type,
  question_status: state.Service.question_status,
  allocationStatus: state.ServiceAllocate.allocationStatus,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  getAllocateData,
  takeAllocationTasks,
  clearAllocationMessage,
  reassignAllocationTask
})(AllocateListPage);
