import React, { useState, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  FormFeedback,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Moment from "react-moment";

import PropTypes from "prop-types";
import Timeline from "../../../components/Timeline";
import TimelineItem from "../../../components/TimelineItem";
import AllocateStatusBadge from "../allocate/AllocateStatusBadge";

const AllocationList = ({
  q_id,
  q_status,
  postAllocation,
  putAllocation,
  allocation,
  allocation_logs,
  allocation_quick_msg,
  user
}) => {
  //console.log("AllocationList allocation_logs", allocation_logs);
  const [allocateNote, setAllocateNote] = useState("");
  const [finishAllocateNote, setFinishAllocateNote] = useState("");

  const [errors, setErrors] = useState({});
  const noteHint = "請填寫後送事由並提供必要資料";
  const finishNoteHint = "請填寫後送處理描述....";

  const submitAllocate = e => {
    if (allocateNote === "") {
      setErrors({ ...errors, allocateNote: noteHint });
      return;
    }
    setErrors({ ...errors, allocateNote: "" });
    //console.log("submitAllocate clicked", allocateNote);
    postAllocation(q_id, allocateNote);
  };

  const submitPutAllocate = putStatus => {
    if (finishAllocateNote === "") {
      setErrors({ ...errors, finishAllocateNote: finishNoteHint });
      return;
    }
    setErrors({ ...errors, finishAllocateNote: "" });
    //console.log("submitFinishAllocate clicked", finishAllocateNote);
    //{"allocation_id":2, "allocate_status":"4","allocate_note":"已經處理"}

    putAllocation({
      allocation_id: allocation.id,
      allocate_status: putStatus,
      allocate_note: finishAllocateNote
    });

    setFinishAllocateNote("");
  };

  const statusText = {
    0: "後送初始",
    1: "專員處理中",
    2: "原廠查詢中",
    3: "後送條件不足",
    4: "後送處理完成",
    99: "補充說明"
  };

  let displayAllocationFeedbackArea = true;
  if (q_status.toString() === "4") {
    displayAllocationFeedbackArea = false;
  }

  if (allocation) {
    if (
      allocation.allocate_status === 0 &&
      allocation.assignor !== user.uid &&
      user.role !== "ants"
    ) {
      displayAllocationFeedbackArea = false;
    }

    //原廠查詢中
    if (allocation.allocate_status === 2 && user.role === "ants") {
      displayAllocationFeedbackArea = false;
    }

    if (
      (allocation.allocate_status === 3 || allocation.allocate_status === 4) &&
      user.role !== "admin" &&
      user.role !== "ants"
    ) {
      displayAllocationFeedbackArea = false;
    }

    if (allocation.allocate_status === 1 && allocation.assignee !== user.uid) {
      displayAllocationFeedbackArea = false;
    }

    if (allocation.assignee === user.uid) {
      displayAllocationFeedbackArea = true;
    }
  }

  return (
    <Row>
      <Col sm={12}>
        <Card className="font-13 border">
          <CardBody>
            <h5>後送處理區</h5>

            <hr />
            {!allocation && q_status !== "4" && (
              <Fragment>
                <Input
                  type="textarea"
                  className="form-control form-control-dark mb-2"
                  rows="3"
                  placeholder={noteHint}
                  value={allocateNote}
                  onChange={e => setAllocateNote(e.target.value)}
                  invalid={errors.allocateNote ? true : false}
                />
                <FormFeedback>{errors.allocateNote}</FormFeedback>

                <div className="text-right">
                  <div className="btn-group mb-2 ml-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={submitAllocate}
                    >
                      發起後送
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
            {q_status === "4" && (
              <div className="text-muted font-14 m-2"> ＊提問單已結案。</div>
            )}
            {allocation && (
              <Fragment>
                <h6 className="card-title border p-2 mt-0 mb-0">
                  <div className="text-left">
                    <p className="text-muted">
                      <strong>目前狀態 :</strong>
                      <span className="ml-2">
                        <AllocateStatusBadge
                          status_code={allocation.allocate_status}
                        />
                      </span>
                    </p>
                    <p className="text-muted">
                      <strong>處理專員 :</strong>
                      <span className="ml-2">
                        {allocation.assignee_name || "尚未指派"}
                      </span>
                    </p>
                  </div>
                  <span className="ml-2">{allocation.admin_uname}</span> 在{" "}
                  <span className="ml-2">
                    <Moment format="YYYY-MM-DD HH:mm:ss">
                      {allocation.create_time}
                    </Moment>
                  </span>{" "}
                  發起後送
                </h6>
                <p
                  className="mb-2 text-primary font-15 border card p-2"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {allocation.allocate_cause}
                </p>

                <hr />
                {allocation.allocate_status === 0 && (
                  <div className="text-info mt-2">
                    {" "}
                    本後送單還在等候派發, 但發起人可以結束本後送 ....
                  </div>
                )}
                {Array.isArray(allocation_logs) && allocation_logs.length > 0 && (
                  <Card>
                    <CardBody>
                      <h4 className="header-title mb-1">處理歷程</h4>
                      <PerfectScrollbar
                        style={{ maxHeight: "390px", width: "100%" }}
                      >
                        <Timeline>
                          {allocation_logs.map((log, i) => {
                            return (
                              <TimelineItem key={`log-${i}`}>
                                <i
                                  className={`${
                                    log.admin_uid === 113
                                      ? "mdi mdi-robot bg-info-lighten text-info"
                                      : log.allocate_status === 99
                                      ? "mdi mdi-comment-plus bg-secondary-lighten text-secondary"
                                      : "mdi mdi-upload bg-primary-lighten text-primary"
                                  } timeline-icon`}
                                ></i>
                                <div className="timeline-item-info">
                                  <span
                                    style={{ whiteSpace: "pre-line" }}
                                    className={`text-${
                                      log.admin_uid === 113 ? "info" : "primary"
                                    } font-weight-bold mb-1 `}
                                  >
                                    {log.admin_uname}:
                                  </span>
                                  <span
                                    style={{ whiteSpace: "pre-line" }}
                                    className="text-dark font-weight-bold mb-1 ml-1"
                                  >
                                    {log.allocate_note}
                                  </span>

                                  <small className="text-muted d-block">
                                    {log.allocate_status === 99
                                      ? "補充說明"
                                      : `後送狀態變更為 “${
                                          statusText[log.allocate_status]
                                        }”`}
                                  </small>
                                  <p className="mb-0 pb-2">
                                    <small className="text-muted">
                                      <Moment format="YYYY-MM-DD HH:mm:ss">
                                        {log.create_time}
                                      </Moment>
                                    </small>
                                  </p>
                                </div>
                              </TimelineItem>
                            );
                          })}
                        </Timeline>
                      </PerfectScrollbar>
                    </CardBody>
                  </Card>
                )}
                <hr />
                {displayAllocationFeedbackArea && (
                  <Fragment>
                    <UncontrolledButtonDropdown size="sm">
                      <DropdownToggle color="light" caret>
                        快選回覆
                      </DropdownToggle>
                      <DropdownMenu>
                        {allocation_quick_msg &&
                          allocation_quick_msg.map((msg, i) => (
                            <DropdownItem
                              className="text-info"
                              key={`quickmsg-${i}`}
                              onClick={e =>
                                setFinishAllocateNote(`${msg.allocate_note}`)
                              }
                            >
                              {msg.allocate_note}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <Input
                      type="textarea"
                      className="form-control form-control-dark mb-2"
                      rows="3"
                      placeholder={finishNoteHint}
                      value={finishAllocateNote}
                      onChange={e => setFinishAllocateNote(e.target.value)}
                      invalid={errors.finishAllocateNote ? true : false}
                    />
                    <FormFeedback>{errors.finishAllocateNote}</FormFeedback>

                    <div className="text-right">
                      <div className="btn-group mb-2 ml-2">
                        {allocation.allocate_status === 4 &&
                          user.role === "ants" && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-2"
                              onClick={e => submitPutAllocate(0)}
                            >
                              再次發起後送
                            </button>
                          )}

                        {allocation.allocate_status === 0 && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm mt-2"
                            onClick={e => submitPutAllocate(4)}
                          >
                            處理完畢
                          </button>
                        )}

                        {allocation.allocate_status === 1 &&
                          allocation.assignee === user.uid && (
                            <Fragment>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mt-2"
                                onClick={e => submitPutAllocate(2)}
                              >
                                後送原廠
                              </button>
                            </Fragment>
                          )}
                        {(allocation.allocate_status === 2 ||
                          allocation.allocate_status === 1) &&
                          allocation.assignee === user.uid && (
                            <Fragment>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm mt-2"
                                onClick={e => submitPutAllocate(3)}
                              >
                                條件不足
                              </button>
                              <button
                                type="button"
                                className="btn btn-success btn-sm mt-2"
                                onClick={e => submitPutAllocate(4)}
                              >
                                處理完畢
                              </button>
                            </Fragment>
                          )}
                        {allocation.allocate_status === 3 &&
                          (user.role === "admin" || user.role === "ants") && (
                            <button
                              type="button"
                              className="btn btn-warning btn-sm mt-2"
                              onClick={e => submitPutAllocate(0)}
                            >
                              補足條件
                            </button>
                          )}
                        {allocation.assignee === user.uid &&
                          allocation.allocate_status !== 1 && (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm mt-2"
                              onClick={e => submitPutAllocate(99)}
                            >
                              補充說明
                            </button>
                          )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

AllocationList.propTypes = {
  postAllocation: PropTypes.func.isRequired,
  putAllocation: PropTypes.func.isRequired,
  allocation: PropTypes.object,
  allocation_logs: PropTypes.array
};

export default AllocationList;
