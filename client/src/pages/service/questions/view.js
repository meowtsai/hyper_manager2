import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Alert,
  Table,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import SimpleMDEReact from "react-simplemde-editor";
import UserRelaventData from "./UserRelaventData";
import "easymde/dist/easymde.min.css";
import "moment/locale/zh-tw";
import * as showdown from "showdown";
import { vipRankingOptions } from "../../vip/whale_users/whaleOptConfig";

import {
  getCurrentQuestion,
  allocateQuestion,
  replyQuestion,
  clearMessage,
  closeQuestion,
  getAllocateById,
  putAllocation,
  postAllocation,
  clearAllocationMessage,
  updateQuestionType,
  getQuestionsByUser
} from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import Spinner from "../../../components/Spinner";
import AllocationList from "./AllocationList";

const ReplyInfo = ({ reply, pic_plus, num, modifyReply }) => {
  const [modal, setModal] = useState(false);
  const [replyContent, setReplyContent] = useState(
    reply.content.replace(/<br \/>/g, "")
  );

  const confirmUpdate = reply_id => {
    //console.log("confirmUpdate", reply.id);
    modifyReply(reply_id, replyContent);
    setModal(!modal);
  };
  return (
    <Card>
      <CardBody
        className={classNames("text-dark", [
          `bg-${reply.is_official === "1" ? "official" : "light"}`
        ])}
      >
        <CardTitle tag="h5">
          NO {num}.
          {reply.is_official === "1" ? `${reply.admin_uname} 回覆` : "再次提問"}
        </CardTitle>
        <CardSubtitle tag="h6">
          <Moment format="YYYY-MM-DD HH:mm:ss">{reply.create_time}</Moment>
        </CardSubtitle>
        <hr />
        <CardText
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: new showdown.Converter().makeHtml(reply.content)
          }}
        ></CardText>

        {pic_plus.length > 0 &&
          pic_plus.map(pic => (
            <a
              href={pic.pic_path}
              target="_blank"
              rel="noopener noreferrer"
              key={`pic_${pic.id}`}
            >
              <img
                alt="玩家圖片"
                key={`repic-${pic_plus.id}`}
                src={pic.pic_path}
                style={{ maxWidth: "200px" }}
              />
            </a>
          ))}

        <CardText className="mt-4">
          {reply.is_official.toString() === "1" && (
            <Button color="dark" onClick={e => setModal(!modal)}>
              編輯
            </Button>
          )}
        </CardText>

        {/* 編輯 Modal */}
        <Modal isOpen={modal} toggle={e => setModal(!modal)}>
          <ModalHeader toggle={e => setModal(!modal)}>編輯回覆</ModalHeader>
          <ModalBody>
            <SimpleMDEReact
              id={`reid-${reply.id}`}
              onChange={setReplyContent}
              value={replyContent}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => confirmUpdate(reply.id)}>
              確認修改
            </Button>{" "}
            <Button color="secondary" onClick={e => setModal(!modal)}>
              取消
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

const PicInfo = ({ pic_path }) => {
  if (!pic_path) return null;
  return (
    <a href={pic_path} target="_blank" rel="noopener noreferrer">
      <img src={pic_path} style={{ maxWidth: "200px" }} alt="玩家圖檔" />
    </a>
  );
};
// QuestionInfo
const QuestionInfo = ({
  question = {},
  question_status,
  question_type,
  pic_plus,
  updateQuestionType,
  vip
}) => {
  const [errors, setErrors] = useState({});

  let allocateMark;
  if (question.allocate_status.toString() === "1") {
    allocateMark = (
      <span className="text-warning">
        <i className="mdi mdi-hand"></i> 已後送給{question.allocate_user_name}
      </span>
    );
  } else if (question.allocate_status.toString() === "2") {
    allocateMark = (
      <span className="text-success">
        <i className="mdi mdi-hand-okay"></i>
        {question.allocate_user_name}後送處理完畢
      </span>
    );
  } else if (question.allocate_status.toString() === "3") {
    allocateMark = (
      <span className="text-danger">
        <i className="mdi mdi-alert-box-outline"></i>
        {question.allocate_user_name}請求額外資訊
      </span>
    );
  }

  let allocateResultMark;
  if (question.allocate_result) {
    allocateResultMark = question.allocate_result
      .split("<br>")
      .map((text, index) => (
        <span key={`al-${index}`} className="text-secondary small">
          {text} <br />
        </span>
      ));
  }

  let isReadMark;
  if (question.status !== "1" && question.status !== "0") {
    isReadMark =
      question.is_read === "0" ? (
        <span className="text-secondary">(未讀)</span>
      ) : (
        <span className="text-success">(已讀)</span>
      );
  }

  let statusColor;
  let statusText;
  if (question.status === "1") {
    statusColor = "danger-lighten";
    statusText = question_status[question.status];
  } else if (question.status === "2") {
    statusColor = "info-lighten";
    statusText = question_status[question.status];
  } else if (question.status === "4") {
    statusColor = "success-lighten";
    statusText = `${
      question.system_closed === "1"
        ? "系統"
        : question.close_admin_uid
        ? ""
        : "玩家"
    } ${question_status[question.status]}`;
  } else if (question.status === "7") {
    statusColor = "secondary-lighten";
    statusText = question_status[question.status];
  }

  const onTypeChange = (id, newType) => {
    //console.log("call onTypeChange", id, newType);
    updateQuestionType(id, newType);
  };

  return (
    <React.Fragment>
      <Table hover responsive bordered className="mb-2 mt-2">
        <tbody>
          <tr>
            <th>
              <span className="font-weight-bold text-nowrap">案件狀態：</span>
            </th>

            <td colSpan="3">
              <Badge color={statusColor} className="mr-1">
                {statusText}
              </Badge>

              {isReadMark}
              {allocateMark}
              <div>{allocateResultMark}</div>

              {question.allocate_status.toString() === "1" && (
                <div className="text-info font-12">請至原站台處理後送</div>
              )}

              {/* {(question.allocate_status.toString() === "1" ||
                question.allocate_status.toString() === "3") && (
                <Form>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input
                      type="textarea"
                      rows="5"
                      name="finish_allocate"
                      id="finish_allocate"
                      placeholder="處理描述.."
                      value={finishAllocateNote}
                      onChange={e => setFinishAllocateNote(e.target.value)}
                      invalid={errors.finishAllocateNote ? true : false}
                    />
                    <FormFeedback>{errors.finishAllocateNote}</FormFeedback>
                  </FormGroup>

                  <Button
                    color="success"
                    type="button"
                    onClick={e => finishAllocateSubmit(2)}
                    className="float-right mt-1"
                  >
                    <i className="mdi mdi-check"></i>
                    處理完成
                  </Button>
                  <Button
                    color="danger"
                    type="button"
                    onClick={e => finishAllocateSubmit(3)}
                    className="float-right mt-1"
                  >
                    <i className="mdi mdi-progress-alert"></i>
                    需要協助
                  </Button>
                </Form>
              )} */}
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">提問類型：</span>
            </th>
            <td colSpan="3">
              <Input
                type="select"
                name="sel_type"
                className=" m-0 p-0"
                value={question.type}
                onChange={e => onTypeChange(question.id, e.target.value)}
              >
                {Object.keys(question_type).map(typeKey => (
                  <option
                    key={`type-${typeKey}-${question.id}`}
                    value={typeKey}
                  >
                    {question_type[typeKey]}
                  </option>
                ))}
              </Input>
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">遊戲名稱：</span>
            </th>
            <td>{question.game_name}</td>
            <th>
              <span className="font-weight-bold ">伺服器：</span>
            </th>
            <td>{question.server_name}</td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">原廠uid：</span>
            </th>

            <td colSpan="3">
              {question.partner_uid}{" "}
                {vip && <span className={`mr-1 badge badge-${vipRankingOptions.filter(ranking => ranking.value === vip)[0].color}-lighten badge-pill`}>{vipRankingOptions.filter(ranking => ranking.value === vip)[0].label || ""}</span> }
                
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">角色名稱：</span>
            </th>
            <td>
              {question.character_name
                .replace("&gt;", ">")
                .replace("&lt;", "<")}
              {question.is_in_game === "0" && (
                <Badge color="success-lighten" className="mr-1">
                  玩家填寫
                </Badge>
              )}
            </td>
            <th>
              <span className="font-weight-bold ">原廠角色id：</span>
            </th>
            <td>{question.in_game_id}</td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">提問日期：</span>
            </th>

            <td colSpan="3">
              <Moment format="YYYY-MM-DD HH:mm:ss">
                {question.create_time}
              </Moment>
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold">提問內容：</span>
            </th>
            <td colSpan="3">
              <p
                dangerouslySetInnerHTML={{
                  __html: question.content
                }}
              ></p>
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold">附圖：</span>
            </th>
            <td colSpan="3">
              <PicInfo pic_path={question.pic_path1} />
              <PicInfo pic_path={question.pic_path2} />
              <PicInfo pic_path={question.pic_path3} />

              {pic_plus
                .filter(pic => pic.reply_id === 0)
                .map(pic => (
                  <PicInfo key={`pic-${pic.id}`} pic_path={pic.pic_path} />
                ))}
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">聯絡電話：</span>
            </th>
            <td>{question.phone}</td>
            <th>
              <span className="font-weight-bold ">mail：</span>
            </th>
            <td>{question.email}</td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">ip</span>
            </th>
            <td>
              {question.ip} <br />
              <a
                target="_blank"
                href={`https://whatismyipaddress.com/ip/${question.ip}`}
                rel="noopener noreferrer"
              >
                查看ip資訊
              </a>
            </td>
            <th>
              <span className="font-weight-bold ">國家：</span>
            </th>
            <td>{question.country}</td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold">備註：</span>
            </th>
            <td colSpan="3">{question.note}</td>
          </tr>
          {(question.status === "4" || question.status === "7") && (
            <tr>
              <th>
                <span className="font-weight-bold">結案人員：</span>
              </th>
              <td colSpan="3">{question.close_admin_name}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

const SingleQuestionPage = ({
  getCurrentQuestion,
  getQuestionsByUser,
  getAllocateById,
  allocateQuestion,
  postAllocation,
  putAllocation,
  replyQuestion,
  closeQuestion,
  clearMessage,
  clearAllocationMessage,
  updateOKMessage,
  allocateUpdateOKMessage,
  question_status,
  question_type,
  current,
  user_history,
  loading,
  error,
  match,
  user,
  allocation,
  allocation_logs,
  allocation_quick_msg,
  updateQuestionType,
  vip
}) => {
  //console.log("updateOKMessage", updateOKMessage);
  moment.locale("zh-tw");
  const mainTitle = "客服案件檢視";
  const mainPath = "/service";
  const question_id = match.params.question_id
    ? match.params.question_id
    : null;

  const replyDefaultTemplate = `感謝您的回報！
  
  
  
    ***龍邑客服中心敬上***`;
  const [finishAllocateNote, setFinishAllocateNote] = useState("");

  const [reply, setReply] = useState(replyDefaultTemplate);

  useEffect(() => {
    getCurrentQuestion(question_id);
    getAllocateById(question_id);
    getQuestionsByUser(question_id);

    document.title = `提問單# ${question_id} `;

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //console.log("updateOKMessage effect", updateOKMessage);
    let timeOutId;
    if (updateOKMessage !== undefined && updateOKMessage !== null) {
      timeOutId = setTimeout(() => {
        setReply(replyDefaultTemplate);
        setFinishAllocateNote("");
        clearMessage();
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage]);

  useEffect(() => {
    //console.log("allocateUpdateOKMessage effect", allocateUpdateOKMessage);
    let timeOutId;
    if (
      allocateUpdateOKMessage !== undefined &&
      allocateUpdateOKMessage !== null
    ) {
      timeOutId = setTimeout(() => {
        setReply(replyDefaultTemplate);
        setFinishAllocateNote("");
        clearAllocationMessage();
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [allocateUpdateOKMessage]);

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  const onReplySubmit = () => {
    const replyField = {
      question_id: current.question.id,
      content: reply
    };
    replyQuestion(replyField);
  };

  const onModifyReplySubmit = (replyId, replyContent) => {
    const replyField = {
      id: replyId,
      question_id: current.question.id,
      content: replyContent
    };
    //console.log("onModifyReplySubmit", replyField);
    replyQuestion(replyField);
  };

  //調回處理中
  const onRestoreSubmit = () => {
    const qData = {
      question_id: current.question.id
    };
    //原本的調回處理中應該是1, 但是其實能夠被結案的都是已經回覆的案件, 所以在後端會是設定為2
    closeQuestion(qData, 1);
  };

  const onCloseSubmit = () => {
    const qData = {
      question_id: current.question.id
    };
    closeQuestion(qData, 4);
  };

  const onReserveSubmit = () => {
    const qData = {
      question_id: current.question.id
    };
    closeQuestion(qData, 7);
  };

  const onCancelReserveSubmit = () => {
    const qData = {
      question_id: current.question.id
    };
    closeQuestion(qData, 2);
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: mainPath, active: false },
          { label: mainTitle, path: mainPath, active: true }
        ]}
        title={mainTitle}
      />
      {current.question && (
        <Fragment>
          <Row className="mb-2">
            <Col sm={6}>
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
              {allocateUpdateOKMessage && (
                <Alert
                  color="success"
                  isOpen={allocateUpdateOKMessage ? true : false}
                >
                  <div>{allocateUpdateOKMessage}</div>
                </Alert>
              )}
              <Card>
                <CardBody>
                  <h3>案件編號 #{current.question.id}</h3>
                  <hr />
                  <QuestionInfo
                    pic_plus={current.pic_plus}
                    question={current.question}
                    question_status={question_status}
                    question_type={question_type}
                    allocateQuestion={allocateQuestion}
                    finishAllocateNote={finishAllocateNote}
                    setFinishAllocateNote={setFinishAllocateNote}
                    updateQuestionType={updateQuestionType}
                    vip={vip}
                  />
                  <UserRelaventData data={user_history} />
                  {current.replies.length > 0 &&
                    current.replies.map((reply, index) => (
                      <ReplyInfo
                        key={`reply-${reply.id}`}
                        num={index + 1}
                        reply={reply}
                        pic_plus={current.pic_plus.filter(
                          pic => pic.reply_id === reply.id
                        )}
                        modifyReply={onModifyReplySubmit}
                      />
                    ))}
                </CardBody>
              </Card>
            </Col>

            <Col sm={6}>
              <Card>
                <CardBody>
                  {current.question.allocate_status.toString() !== "1" && (
                    <AllocationList
                      q_id={current.question.id}
                      q_status={current.question.status}
                      allocation={allocation}
                      allocation_logs={allocation_logs}
                      allocation_quick_msg={allocation_quick_msg}
                      postAllocation={postAllocation}
                      putAllocation={putAllocation}
                      user={user}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {(current.q_batch_info.length === 0 ||
            current.q_batch_info[0].admin_uid === user.uid) && (
            <Row>
              <Col sm={12}>
                {current.question.status === "4" ? (
                  <button
                    type="button"
                    className="float-right btn btn-danger m-1"
                    onClick={onRestoreSubmit}
                  >
                    <i className="mdi mdi-restore"></i> 調回處理中
                  </button>
                ) : (
                  <div className="reply_form">
                    回覆
                    <SimpleMDEReact id={1} onChange={setReply} value={reply} />
                    <hr />
                    <button
                      type="button"
                      className="btn btn-primary m-1"
                      onClick={onReplySubmit}
                    >
                      <i className="mdi mdi-check"></i> 確認送出
                    </button>
                    {current.question.status === "2" &&
                      current.question.allocate_status !== "1" &&
                      (allocation
                        ? (allocation.allocate_status === 4 || allocation.allocate_status === 3)
                        : true) && (
                        <Fragment>
                          <button
                            type="button"
                            className="float-right btn btn-danger m-1"
                            onClick={onCloseSubmit}
                          >
                            <i className="dripicons-archive"></i> 立即結案
                          </button>
                          <button
                            type="button"
                            className="float-right btn btn-warning m-1"
                            onClick={onReserveSubmit}
                          >
                            <i className="mdi mdi-timer"></i> 預約結案
                          </button>
                        </Fragment>
                      )}
                    {current.question.status === "7" && (
                      <Fragment>
                        <button
                          type="button"
                          className="float-right btn btn-success m-1"
                          onClick={onCancelReserveSubmit}
                        >
                          <i className="mdi mdi-timer-off"></i> 取消預約
                        </button>
                        <Badge color="warning" className="float-right mr-1">
                          將在
                          {moment(current.question.system_closed_start)
                            .add(5, "days")
                            .fromNow()}
                          自動結案
                        </Badge>
                      </Fragment>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

SingleQuestionPage.propTypes = {
  getCurrentQuestion: PropTypes.func.isRequired,
  allocateQuestion: PropTypes.func.isRequired,
  replyQuestion: PropTypes.func.isRequired,
  closeQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.Service.current,
  question_type: state.Service.question_type,
  question_status: state.Service.question_status,
  loading: state.Service.loading,
  error: state.Service.error,
  updateOKMessage: state.Service.updateOKMessage,
  user: state.Auth.user,
  allocation: state.ServiceAllocate.allocation,
  allocation_logs: state.ServiceAllocate.allocation_logs,
  allocation_quick_msg: state.ServiceAllocate.allocation_quick_msg,
  allocate_loading: state.ServiceAllocate.loading,
  allocate_error: state.ServiceAllocate.error,
  allocateUpdateOKMessage: state.ServiceAllocate.updateOKMessage,
  user_history: state.Service.user_history,
  vip: state.Service.vip
});

export default connect(mapStateToProps, {
  getCurrentQuestion,
  getQuestionsByUser,
  allocateQuestion,
  clearMessage,
  clearAllocationMessage,
  replyQuestion,
  closeQuestion,
  getAllocateById,
  putAllocation,
  postAllocation,
  updateQuestionType
})(SingleQuestionPage);
