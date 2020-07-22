import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { vipServiceOptions, vipServiceOptionsByGameId } from "./whaleOptConfig";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import PageTitle from "../../../components/PageTitle";
import UserViewBasic from "./UserViewBasic";
import UserRequestData from "./UserRequestData";
import {
  getCurrentWhaleUser,
  updateVipInfo,
  addVipServiceRequest,
  deleteVipServiceRequest,
  clearVIPMessage,
} from "../../../redux/actions";
const WhaleUserDashboard = ({
  vip,
  updateOKMessage,
  getCurrentWhaleUser,
  updateVipInfo,
  addVipServiceRequest,
  deleteVipServiceRequest,
  clearVIPMessage,
  match,
  history,
}) => {
  const [requestType, setRequestType] = useState(1);
  const [code, setCode] = useState();
  const [reqNote, setReqNote] = useState("");

  const [tagText, setTagText] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const game_id = match.params.game_id ? match.params.game_id : null;
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query_user = params.get("user");
  const quickOptionList =
    vipServiceOptions.filter((v) => v.type === requestType)[0].list || {};

  useEffect(() => {
    if (game_id && query_user) {
      getCurrentWhaleUser(game_id, query_user, history);
    }
    document.title = "VIP - 鯨魚用戶檢視";
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timeOutId;
    if (updateOKMessage) {
      setTagText("");
      setReqNote("");

      timeOutId = setTimeout(() => {
        clearVIPMessage();
        //console.log("error effect timeOutId", timeOutId);
      }, 2000);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [updateOKMessage]);

  const onEditWhaleUser = (modifiedContent) => {
    if (Object.keys(modifiedContent).length > 0) {
      //fire save aciton
      // console.log("modifiedContent", modifiedContent);
      // console.log("game_id", game_id, vip.char_in_game_id);

      updateVipInfo(game_id, vip.char_in_game_id, modifiedContent);
    }
  };
  const onDeleteRequestRecord = (id) => {
    const deleteOk = window.confirm("確定要刪除#" + id + "這筆紀錄嗎?");
    if (deleteOk) {
      deleteVipServiceRequest(id);
    }
  };

  const onAddRequestRecord = () => {
    const record = {
      game_id: vip.site,
      role_id: vip.char_in_game_id,
      service_type: requestType,
      request_code: code,
      tag: tagText,
      note: reqNote,
    };
    //console.log("record", record);

    let tmpErrors = {};
    if (!requestType) {
      tmpErrors.requestType = "必選";
    }
    if (!code) {
      tmpErrors.code = "必選";
    }
    if (tagText && tagText.length > 10) {
      tmpErrors.tagText = "字數太長";
    }
    if (reqNote && reqNote.length > 500) {
      tmpErrors.reqNote = "字數太長, 請控制在500字內";
    }
    setFormErrors(tmpErrors);
    if (Object.keys(tmpErrors) > 0) {
      return;
    }

    addVipServiceRequest(record);
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "VIP",
            path: "/vip/whale_users",
            active: false,
          },
          {
            label: "鯨魚用戶",
            path: `/vip/whale_users?game_id=${game_id}`,
            active: false,
          },
          {
            label: "檢視用戶資料",
            path: `/vip/user_dashboard/${game_id}?user=${query_user}`,
            active: true,
          },
        ]}
        title="檢視用戶資料"
      />
      <Row className="mb-2">
        <Col lg={6}></Col>
      </Row>
      {vip && (
        <Fragment>
          <UserViewBasic
            vip={vip}
            goBack={(e) => history.goBack()}
            onEditWhaleUser={onEditWhaleUser}
            updateOKMessage={updateOKMessage}
          />
          <UserRequestData
            requests={vip.request_data.filter((r) => r.service_type == "1")}
            lbltext="服務紀錄"
            onDeleteClick={onDeleteRequestRecord}
            serviceOptions={vipServiceOptionsByGameId[game_id][1]}
          />
          <UserRequestData
            requests={vip.request_data.filter((r) => r.service_type == "2")}
            lbltext="重點對話節錄"
            onDeleteClick={onDeleteRequestRecord}
            serviceOptions={vipServiceOptionsByGameId[game_id][2]}
          />

          <Row className="mt-2">
            <Col lg={4}>
              {updateOKMessage && (
                <Alert color="success" isOpen={updateOKMessage ? true : false}>
                  <div>{updateOKMessage}</div>
                </Alert>
              )}
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <Card className="border p-1 mt-3 mb-1 rounded font-13 bg-light">
                <CardBody>
                  <h5>添加服務或對話紀錄</h5>
                  <hr />
                  <Row>
                    <Col md={4}>
                      <div className="form-group">
                        <Input
                          type="select"
                          name="typeSelect"
                          id="typeSelect"
                          value={requestType}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setRequestType(Number.parseInt(e.target.value));
                            }
                          }}
                          invalid={formErrors.requestType ? true : false}
                        >
                          <option value="">==選擇服務類型==</option>
                          {vipServiceOptions.map((opt) => (
                            <option
                              key={`selType-${opt.type}`}
                              value={opt.type}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="form-group">
                        <Input
                          type="select"
                          name="codeSelect"
                          id="codeSelect"
                          onChange={(e) =>
                            setCode(Number.parseInt(e.target.value))
                          }
                          value={code}
                          invalid={formErrors.code ? true : false}
                        >
                          <option value="">==快選==</option>

                          {Object.keys(
                            vipServiceOptionsByGameId[game_id][requestType]
                          ).map((qo) => (
                            <option key={`selQuickType-${qo}`} value={qo}>
                              {
                                vipServiceOptionsByGameId[game_id][requestType][
                                  qo
                                ]
                              }
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="form-group">
                        <Input
                          type="text"
                          name="txtTag"
                          id="txtTag"
                          placeholder="(選填)自訂標籤"
                          onChange={(e) => setTagText(e.target.value)}
                          maxLength="10"
                          value={tagText}
                          invalid={formErrors.tagText ? true : false}
                        />
                        <FormFeedback>{formErrors.tagText}</FormFeedback>
                      </div>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="txtNote">說明</Label>

                    <Input
                      type="textarea"
                      name="reqNote"
                      id="reqNote"
                      rows="5"
                      placeholder="(選填) 輸入服務項目相關說明或重點對話, 250字以內..."
                      onChange={(e) => setReqNote(e.target.value)}
                      value={reqNote}
                      invalid={formErrors.reqNote ? true : false}
                    />
                    <FormFeedback>{formErrors.reqNote}</FormFeedback>
                  </FormGroup>

                  <hr />

                  <Button
                    color="primary"
                    type="button"
                    onClick={onAddRequestRecord}
                  >
                    確認送出
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

WhaleUserDashboard.propTypes = {
  getCurrentWhaleUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vip: state.VIP.currentWhaleUser,
  updateOKMessage: state.VIP.updateOKMessage,
});
export default connect(mapStateToProps, {
  getCurrentWhaleUser,
  updateVipInfo,
  clearVIPMessage,
  addVipServiceRequest,
  deleteVipServiceRequest,
})(WhaleUserDashboard);
