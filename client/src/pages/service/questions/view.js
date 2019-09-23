import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Alert,
  Table,
  Badge,
  Input,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import classNames from "classnames";
import { connect } from "react-redux";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "moment/locale/zh-tw";
import {
  getCurrentQuestion,
  allocateQuestion,
  replyQuestion,
  clearMessage,
  closeQuestion
} from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import Spinner from "../../../components/Spinner";

const ReplyInfo = ({ reply, pic_plus, num, modifyReply }) => {
  const [modal, setModal] = useState(false);
  const [replyContent, setReplyContent] = useState(
    reply.content.replace(/<br \/>/g, "")
  );

  const confirmUpdate = e => {
    //console.log("confirmUpdate", reply.id);
    modifyReply(reply.id, replyContent);
    setModal(!modal);
  };
  return (
    <Card
      className={classNames("text-dark", [
        `bg-${reply.is_official === "1" ? "success" : "light"}`
      ])}
    >
      {pic_plus.length > 0 &&
        pic_plus.map(pic => (
          <CardImg key={`repic-${pic_plus.id}`} src={pic.pic_path} />
        ))}
      <CardBody>
        <CardTitle tag="h5">
          NO {num}.
          {reply.is_official === "1" ? `${reply.admin_uname}回覆` : "再次提問"}
        </CardTitle>
        <CardSubtitle tag="h6">
          <Moment format="YYYY-MM-DD HH:mm:ss">{reply.create_time}</Moment>
        </CardSubtitle>

        <CardText>
          <hr />
          <p
            dangerouslySetInnerHTML={{
              __html: reply.content
            }}
          ></p>
        </CardText>
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
            <Button color="primary" onClick={confirmUpdate}>
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
    <a href={pic_path} target="_blank">
      <img src={pic_path} style={{ maxWidth: "400px" }} />
    </a>
  );
};
// QuestionInfo
const QuestionInfo = ({
  question = {},
  question_status,
  question_type,
  pic_plus,
  allocateQuestion,
  finishAllocateNote,
  setFinishAllocateNote
}) => {
  const [errors, setErrors] = useState({});
  let allocateMark;
  if (question.allocate_status.toString() === "1") {
    allocateMark = (
      <span className="text-danger">
        <i className="mdi mdi-hand"></i> 已後送給{question.allocate_user_name}
      </span>
    );
  } else if (question.allocate_status.toString() === "2") {
    allocateMark = (
      <span className="text-success">
        <i className="mdi mdi-hand-okay"></i>
        {question.allocate_user_name}處理完畢
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

  const finishAllocateSubmit = e => {
    e.preventDefault();
    if (finishAllocateNote === "") {
      setErrors({ ...errors, finishAllocateNote: "請填寫處理描述" });
      return;
    }
    const uFields = {
      question_id: question.id,
      allocate_result: question.allocate_result,
      result: finishAllocateNote
    };

    //console.log("finishAllocateSubmit clicked", uFields);
    allocateQuestion(uFields, 2);
  };

  return (
    <React.Fragment>
      <Table hover responsive bordered className="mb-0 mt-2">
        <tbody>
          <tr>
            <th>
              <span className="font-weight-bold text-nowrap">案件狀態：</span>
            </th>

            <td colSpan="3">
              {question_status[question.status]}

              {isReadMark}
              {allocateMark}
              <div>{allocateResultMark}</div>

              <Form inline onSubmit={finishAllocateSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="text"
                    name="finish_allocate"
                    id="finish_allocate"
                    placeholder="處理描述.."
                    value={finishAllocateNote}
                    onChange={e => setFinishAllocateNote(e.target.value)}
                    invalid={errors.finishAllocateNote ? true : false}
                  />
                  <FormFeedback>{errors.finishAllocateNote}</FormFeedback>
                </FormGroup>

                <Button color="primary" type="submit">
                  處理完成
                </Button>
              </Form>
            </td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">提問類型：</span>
            </th>
            <td colSpan="3">{question_type[question.type]}</td>
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

            <td colSpan="3">{question.partner_uid}</td>
          </tr>
          <tr>
            <th>
              <span className="font-weight-bold ">角色名稱：</span>
            </th>
            <td>
              {question.character_name}
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
  allocateQuestion,
  replyQuestion,
  closeQuestion,
  clearMessage,
  updateOKMessage,
  question_status,
  question_type,
  current,
  loading,
  error,
  match,
  user
}) => {
  //console.log("updateOKMessage", updateOKMessage);
  moment.locale("zh-tw");
  const mainTitle = "客服案件檢視";
  const mainPath = "/service";
  const question_id = match.params.question_id
    ? match.params.question_id
    : null;

  const [selected, setSelected] = useState({});
  const [allocateAdminUid, setAllocateAdminUid] = useState("");
  const [allocateNote, setAllocateNote] = useState("");
  const [finishAllocateNote, setFinishAllocateNote] = useState("");
  const [errors, setErrors] = useState({});
  const [reply, setReply] = useState("");

  useEffect(() => {
    getCurrentQuestion(question_id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //console.log("updateOKMessage effect", updateOKMessage);
    let timeOutId;
    if (updateOKMessage !== undefined && updateOKMessage !== null) {
      timeOutId = setTimeout(() => {
        setReply("");
        setAllocateNote("");
        setFinishAllocateNote("");
        clearMessage();
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage]);

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  const submitAllocate = () => {
    if (allocateNote === "") {
      setErrors({ ...errors, allocateNote: "請填寫後送描述" });
      return;
    }
    delete errors["allocateNote"];
    setErrors(errors);
    const uFields = {
      question_id: current.question.id,
      allocate_result: current.question.allocate_result,
      result: allocateNote,
      allocate_admin_uid:
        allocateAdminUid !== ""
          ? allocateAdminUid
          : current.allocate_users[0].uid
    };
    allocateQuestion(uFields, 1);
  };

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
              <Card>
                <CardBody>
                  <h5>案件編號 #{current.question.id}</h5>
                  <hr />
                  <QuestionInfo
                    pic_plus={current.pic_plus}
                    question={current.question}
                    question_status={question_status}
                    question_type={question_type}
                    allocateQuestion={allocateQuestion}
                    finishAllocateNote={finishAllocateNote}
                    setFinishAllocateNote={setFinishAllocateNote}
                  />
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
            <Col sm={2}></Col>

            <Col sm={4}>
              {current.question.status !== "4" && (
                <Card className="tilebox-one">
                  <CardBody>
                    <i className="dripicons-upload float-right text-muted"></i>
                    <h5 className="text-muted text-uppercase mt-0">後送給</h5>
                    <Input
                      type="select"
                      name="allocate_admin_uid"
                      className="col-sm-6 m-1 p-0 sm"
                      onChange={e => setAllocateAdminUid(e.target.value)}
                    >
                      {current.allocate_users.map(user => (
                        <option key={`au-${user.uid}`} value={user.uid}>
                          {user.name}
                        </option>
                      ))}
                    </Input>

                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Input
                        type="text"
                        name="allocateNote"
                        id="allocateNote"
                        placeholder="處理描述.."
                        value={allocateNote}
                        onChange={e => setAllocateNote(e.target.value.trim())}
                        invalid={errors.allocateNote ? true : false}
                      />
                      <FormFeedback>{errors.allocateNote}</FormFeedback>
                    </FormGroup>

                    <button
                      type="button"
                      className="btn btn-primary m-1"
                      onClick={submitAllocate}
                    >
                      <i className="mdi mdi-account-edit mr-1"></i> 送出
                    </button>
                  </CardBody>
                </Card>
              )}
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
                    <button
                      type="button"
                      className="float-right btn btn-danger m-1"
                      onClick={onCloseSubmit}
                    >
                      <i className="dripicons-archive"></i> 立即結案
                    </button>
                    {current.question.status === "2" &&
                      current.question.allocate_status !== "1" && (
                        <button
                          type="button"
                          className="float-right btn btn-warning m-1"
                          onClick={onReserveSubmit}
                        >
                          <i className="mdi mdi-timer"></i> 預約結案
                        </button>
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
                            .add(2, "days")
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
  user: state.Auth.user
});

export default connect(
  mapStateToProps,
  {
    getCurrentQuestion,
    allocateQuestion,
    clearMessage,
    replyQuestion,
    closeQuestion
  }
)(SingleQuestionPage);
