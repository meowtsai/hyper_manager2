import React, { useState } from "react";
import PropTypes from "prop-types";
import UserBox from "./UserBox";
import { vipServiceOptions } from "./whaleOptConfig";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Alert
} from "reactstrap";

const WhaleUserModal = ({ modal, toggle, user, onAddRequestRecord, error }) => {
  const [requestType, setRequestType] = useState(1);
  const [code, setCode] = useState();
  const [reqNote, setReqNote] = useState("");

  const quickOptionList =
    vipServiceOptions.filter(v => v.type === requestType)[0].list || {};
  //   console.log("requestType", typeof requestType);
  //   console.log(
  //     "requestType",
  //     vipServiceOptions.filter(v => v.type === requestType)
  //   );
  //console.log("quickOptionList", quickOptionList);
  return (
    <Modal isOpen={modal} toggle={toggle} user={user}>
      <ModalHeader toggle={toggle} className="modal-colored-header bg-warning">
        {user.char_name} ({user.uid}) 的資料維護頁面{" "}
      </ModalHeader>
      <ModalBody>
        <h6>角色基本資料</h6>
        <UserBox user={user} />
        <hr />
        <h6>新增服務紀錄</h6>

        <Row>
          <Col md={4}>
            <div className="form-group">
              <Input
                type="select"
                name="typeSelect"
                id="typeSelect"
                onChange={e => setRequestType(Number.parseInt(e.target.value))}
              >
                <option value="">==選擇服務類型==</option>
                {vipServiceOptions.map(opt => (
                  <option key={`selType-${opt.type}`} value={opt.type}>
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
                onChange={e => setCode(Number.parseInt(e.target.value))}
                value={code}
              >
                <option value="">==快選==</option>

                {Object.keys(quickOptionList).map(qo => (
                  <option key={`selQuickType-${qo}`} value={qo}>
                    {quickOptionList[qo]}
                  </option>
                ))}
              </Input>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Input
              type="text"
              name="reqNote"
              id="reqNote"
              placeholder="(選填) 輸入服務項目相關說明或重點對話, 250字以內..."
              onChange={e => setReqNote(e.target.value)}
              value={reqNote}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        {error && (
          <Alert color="danger" isOpen={error ? true : false}>
            <div>{error}</div>
          </Alert>
        )}
        <Button
          color="primary"
          onClick={e =>
            onAddRequestRecord({ type: requestType, code, note: reqNote })
          }
        >
          新增記錄
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          取消
        </Button>
      </ModalFooter>
    </Modal>
  );
};

WhaleUserModal.propTypes = {};

export default WhaleUserModal;

//{"uid":15071296,"char_name":"缺丶皇","char_in_game_id":"121336","server_name":"10002","deposit_total":1554810,"account_create_time":null,"last_login":"2019-04-27T16:00:00.000Z","is_added":1,"create_time":"2018-02-01T07:30:50.000Z","site":"h35naxx1hmt","ip":"39.10.33.117","country":"TW","latest_topup_date":"2019-04-27T12:57:05.000Z","vip_ranking":"black","vip_ranking_updated":"2018-10-22T08:27:39.000Z","line_id":"","line_date":"2018-01-08T16:00:00.000Z","inactive_confirm_date":"2019-05-22T07:07:19.000Z","mobile":null}
