import React, { useEffect, useState, Fragment } from "react";
import {
  Row,
  Button,
  Col,
  Card,
  CardBody,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as showdown from "showdown";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import PageTitle from "../../../components/PageTitle";

import {
  getCurrentBatchTask,
  removeBatchQ,
  removeQFromBatch,
  batchReplyAction
} from "../../../redux/actions";

import BatchTaskBasic from "./BatchTaskBasic";

const BatchTaskView = ({
  user,
  getCurrentBatchTask,
  batchReplyAction,
  removeBatchQ,
  removeQFromBatch,
  history,
  currentRecord,
  question_type,
  match,
  error
}) => {
  const mainTitle = "批次處理-檢視項目";
  const record_id = match.params.record_id ? match.params.record_id : null;
  const [modal, setModal] = useState(false);
  const [newType, setNewType] = useState(1);

  const replyDefaultTemplate = `感謝您的回報！
  
  
  
  **龍邑客服中心敬上**`;

  const [reply, setReply] = useState(replyDefaultTemplate);
  useEffect(() => {
    getCurrentBatchTask(record_id, history);
    document.title = mainTitle;
  }, []);

  useEffect(() => {
    setModal(false);
  }, [currentRecord]);

  const onNextStep = () => {
    if (!currentRecord.q_list || currentRecord.q_list.length < 1) {
      window.alert("請先加入要回覆的提問單!");
      return;
    }
    setModal(true);
  };

  const onBatchReply = reply_status => {
    const replyData = {
      batch_id: currentRecord.id,
      new_type: newType,
      post_content: reply,
      mode: reply_status
    };
    batchReplyAction(replyData);
    //////data: `batch_id=${batch_id}&new_type=${new_type}&post_content=${post_content}&mode=${mode}`,
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "客服",
            path: "/service/batch_list",
            active: false
          },
          {
            label: "批次處理列表",
            path: "/service/batch_list",
            active: false
          },
          {
            label: mainTitle,
            path: "/service/batch_list",
            active: true
          }
        ]}
        title={mainTitle}
      />

      <Row className="mb-2">
        <Col lg={6}>
          {error && error.msg && <Alert color={"danger"}>{error.msg}</Alert>}
        </Col>
      </Row>
      {Object.keys(currentRecord).length > 0 && (
        <BatchTaskBasic
          row={currentRecord}
          removeBatchQ={
            currentRecord.status === "1" && user.uid === currentRecord.admin_uid
              ? removeBatchQ
              : null
          }
          removeQFromBatch={
            currentRecord.status === "1" && user.uid === currentRecord.admin_uid
              ? removeQFromBatch
              : null
          }
        />
      )}

      <hr />
      <Row className="mb-2">
        <Col lg={6}>
          {currentRecord.status === "1" &&
            user.uid === currentRecord.admin_uid && (
              <div>
                問題類型
                <select
                  id="new_type"
                  name="new_type"
                  onChange={e => setNewType(e.target.value)}
                >
                  {Object.keys(question_type).map(typeKey => (
                    <option key={`qt-${typeKey}`} value={typeKey}>
                      {question_type[typeKey]}
                    </option>
                  ))}
                </select>
                <div className="reply_form">
                  回覆
                  <SimpleMDEReact id={1} onChange={setReply} value={reply} />
                  <hr />
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    onClick={onNextStep}
                  >
                    <i className="mdi mdi-arrow-right-circle-outline"></i>{" "}
                    下一步
                  </button>
                </div>
              </div>
            )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal isOpen={modal} toggle={e => setModal(!modal)} size="lg">
            <ModalHeader toggle={e => setModal(!modal)}>
              確認批次回覆內容
            </ModalHeader>
            <ModalBody>
              <div>
                <b>回應單號:</b>
                <div>
                  {(currentRecord.q_list || [])
                    .map(item => item.question_id)
                    .join(", ")}
                </div>
              </div>
              <div>
                <b>變更問題類型:</b>
                {question_type[newType]}
              </div>
              <div>
                <b>回應內容:</b>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: new showdown.Converter().makeHtml(reply)
                  }}
                ></div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={e => setModal(!modal)}>
                取消
              </Button>
              <Button color="danger" onClick={e => onBatchReply(4)}>
                送出回覆並立即結案
              </Button>
              <Button color="warning" onClick={e => onBatchReply(7)}>
                送出回覆並預約結案
              </Button>
              <Button color="primary" onClick={e => onBatchReply(2)}>
                送出回覆
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  );
};

BatchTaskView.propTypes = {
  getCurrentBatchTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.Auth.user,
  error: state.BatchTasks.error,
  question_type: state.BatchTasks.question_type,
  currentRecord: state.BatchTasks.currentRecord
});
export default connect(mapStateToProps, {
  getCurrentBatchTask,
  removeBatchQ,
  removeQFromBatch,
  batchReplyAction
})(BatchTaskView);
