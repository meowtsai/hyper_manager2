import React, { useState, Fragment } from "react";
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
  Alert
} from "reactstrap";
import moment from "moment";
import PropTypes from "prop-types";

const MediationForm = ({
  case_id,
  onEditMediation,
  errors,
  selectedMediation,
  onDeleteMediation
}) => {
  const [o_case_id, setCaseId] = useState(
    selectedMediation.o_case_id ? selectedMediation.o_case_id : ""
  );
  const [o_case_date, setCaseDate] = useState(
    selectedMediation.o_case_date
      ? moment(selectedMediation.o_case_date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );
  const [close_date, setCloseDate] = useState(moment().format("YYYY-MM-DD"));

  const [req_date, setReqDate] = useState(
    selectedMediation.req_date
      ? moment(selectedMediation.req_date).format("YYYY-MM-DDTHH:mm")
      : moment().format("YYYY-MM-DDTHH:mm")
  );
  const [req_place, setReqPlace] = useState(
    selectedMediation.req_place ? selectedMediation.req_place : ""
  );

  const [o_staff, setStaff] = useState(
    selectedMediation.o_staff ? selectedMediation.o_staff : ""
  );
  const [o_contact, setContact] = useState(
    selectedMediation.o_contact ? selectedMediation.o_contact : ""
  );
  const [o_phone, setPhone] = useState(
    selectedMediation.o_phone ? selectedMediation.o_phone : ""
  );
  const [status, setStatus] = useState(
    selectedMediation.status ? selectedMediation.status : 1
  );
  const [representative, setRepresentative] = useState(
    selectedMediation.representative ? selectedMediation.representative : ""
  );
  const [note, setNote] = useState(
    selectedMediation.note ? selectedMediation.note : ""
  );

  const submitMediation = () => {
    const fields = {
      case_id,
      o_case_id,
      o_case_date,
      req_date,
      req_place,
      o_staff,
      o_contact,
      o_phone,
      representative,
      close_date,
      note,
      status
    };

    fields.id = selectedMediation.id ? selectedMediation.id : null;
    onEditMediation(fields);
  };

  const deleteMediation = () => {
    const deleteOk = window.confirm(
      "確定要刪除#" + selectedMediation.id + "紀錄嗎?"
    );
    if (deleteOk) {
      onDeleteMediation(selectedMediation.id);
    }
  };

  return (
    <Fragment>
      <Row className="mb-2">
        <Col lg={12}>
          <Card className="border p-1 mt-2 mb-1 rounded font-13 bg-light">
            <CardBody>
              <h5>協調會紀錄</h5>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="txtCaseId">發文字號</Label>
                    <Input
                      type="text"
                      name="txtCaseId"
                      id="txtCaseId"
                      value={o_case_id}
                      onChange={e => setCaseId(e.target.value)}
                      placeholder="例:府建行二字第1073906069號"
                      invalid={errors.o_case_id ? true : false}
                    />

                    <FormFeedback>{errors.o_case_id}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="txtCaseDate">發文日期</Label>
                    <Input
                      type="date"
                      name="txtCaseDate"
                      id="txtCaseDate"
                      value={o_case_date}
                      onChange={e => setCaseDate(e.target.value)}
                      invalid={errors.o_case_date ? true : false}
                    />

                    <FormFeedback>{errors.o_case_date}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="req_date">出席時間</Label>

                    <Input
                      type="datetime-local"
                      name="req_date"
                      id="req_date"
                      placeholder="選擇回文期限"
                      value={moment(req_date).format("YYYY-MM-DDTHH:mm")}
                      onChange={e => setReqDate(e.target.value)}
                      invalid={errors.req_date ? true : false}
                    />
                    <FormFeedback>{errors.req_date}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="req_place">出席地點</Label>
                    <Input
                      type="text"
                      name="req_place"
                      id="req_place"
                      value={req_place}
                      onChange={e => setReqPlace(e.target.value)}
                      placeholder="例:桃園市桃園區縣府路一號七樓"
                      invalid={errors.req_place ? true : false}
                    />

                    <FormFeedback>{errors.req_place}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="o_staff">主持人</Label>
                    <Input
                      type="text"
                      name="o_staff"
                      id="o_staff"
                      value={o_staff}
                      onChange={e => setStaff(e.target.value)}
                      placeholder="例:彭新樹"
                      invalid={errors.o_staff ? true : false}
                    />

                    <FormFeedback>{errors.o_staff}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="o_contact">連絡人</Label>
                    <Input
                      type="text"
                      name="o_contact"
                      id="o_contact"
                      value={o_contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder="連絡人姓名, 例:孔繁凱"
                      invalid={errors.o_contact ? true : false}
                    />

                    <FormFeedback>{errors.o_contact}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="txtPhone">電話</Label>
                    <Input
                      type="text"
                      name="txtPhone"
                      id="txtPhone"
                      value={o_phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="連絡人電話, 例:0922******"
                      invalid={errors.o_phone ? true : false}
                    />

                    <FormFeedback>{errors.o_phone}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="representative">我方出席人員</Label>
                    <Input
                      type="text"
                      name="representative"
                      id="representative"
                      value={representative}
                      onChange={e => setRepresentative(e.target.value)}
                      placeholder="例:張小華"
                      invalid={errors.representative ? true : false}
                    />

                    <FormFeedback>{errors.representative}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="md_status">狀態</Label>
                    <Input
                      type="select"
                      name="md_status"
                      id="md_status"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      invalid={errors.status ? true : false}
                    >
                      <option value="1">處理中</option>
                      <option value="4">結案</option>
                    </Input>

                    <FormFeedback>{errors.status}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="close_date">結案日期</Label>

                    <Input
                      type="date"
                      name="close_date"
                      id="close_date"
                      value={moment(close_date).format("YYYY-MM-DD")}
                      onChange={e => setCloseDate(e.target.value)}
                      invalid={errors.close_date ? true : false}
                    />
                    <FormFeedback>{errors.close_date}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="txtReason">協調結果</Label>
                    <Input
                      type="textarea"
                      name="txtReason"
                      id="txtReason"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      invalid={errors.note ? true : false}
                    />

                    <FormFeedback>{errors.note}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <div className="button-list">
                <Button
                  size="sm"
                  color="primary"
                  type="button"
                  onClick={submitMediation}
                >
                  確認送出
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  type="button"
                  onClick={deleteMediation}
                >
                  刪除此筆
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

MediationForm.propTypes = {};

export default MediationForm;
