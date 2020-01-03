import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
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
import {
  getPresetMessage,
  editPresetMessage,
  deletePresetMessage,
  clearPresetMessageMessage
} from "../../../redux/actions";
import PresetMessageList from "./PresetMessageList";
import PropTypes from "prop-types";

const PresetMessageHome = ({
  preset_messages,
  getPresetMessage,
  updateOKMessage,
  editPresetMessage,
  deletePresetMessage,
  loading,
  clearPresetMessageMessage,
  error
}) => {
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    getPresetMessage();
    document.title = "自訂快選回覆";
  }, []);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  useEffect(() => {
    setModal(false);
    let timeOutId;
    if (updateOKMessage !== undefined && updateOKMessage !== null) {
      timeOutId = setTimeout(() => {
        setSelectedId(null);
        setMessage("");
        clearPresetMessageMessage();
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage]);

  const confirmUpdate = () => {
    if (message === "") {
      setErrors({ ...errors, message: "請填寫訊息內容" });
      return;
    }

    if (!selectedId) {
      editPresetMessage({ message, rank: 1 });
    } else {
      editPresetMessage({ id: selectedId, message, rank: 1 });
    }
  };
  const onAddNew = () => {
    setModal(true);
    setSelectedId(null);
    setMessage("");
  };

  const onEditClick = id => {
    //console.log("onEditClick");
    setModal(true);
    const selectedRecord = preset_messages.filter(re => re.id === id)[0];

    setSelectedId(id);
    setMessage(selectedRecord.message);

    //
  };

  const onDeleteClick = id => {
    const deleteOk = window.confirm("確定要刪除這筆嗎?");
    if (deleteOk) {
      deletePresetMessage(id);
      //deleteCplCaseReply(reply_id);
    }
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "自訂快選回覆",
            path: "/platform/preset_messages",
            active: true
          }
        ]}
        title={"自訂快選回覆"}
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
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <PresetMessageList
            list={preset_messages}
            editClick={onEditClick}
            deleteClick={onDeleteClick}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <Modal isOpen={modal} toggle={e => setModal(!modal)}>
            <ModalHeader toggle={e => setModal(!modal)}>編輯</ModalHeader>
            <ModalBody>
              <Card className="border p-1 mt-2 mb-1 rounded font-13 bg-light">
                <CardBody>
                  <h5>編輯訊息</h5>

                  <FormGroup>
                    <Label for="txtUpdNote">訊息</Label>
                    <Input
                      type="textarea"
                      name="txtUpdNote"
                      id="txtUpdNote"
                      rows="5"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="自訂快選回覆"
                      invalid={errors.message ? true : false}
                    />

                    <FormFeedback>{errors.message}</FormFeedback>
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
                確認修改
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  );
};

PresetMessageHome.propTypes = {
  getPresetMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  preset_messages: state.Platform.preset_messages,
  loading: state.Platform.loading,
  error: state.Platform.error,
  updateOKMessage: state.Platform.updateOKMessage
});
export default connect(mapStateToProps, {
  getPresetMessage,
  editPresetMessage,
  deletePresetMessage,
  clearPresetMessageMessage
})(PresetMessageHome);
