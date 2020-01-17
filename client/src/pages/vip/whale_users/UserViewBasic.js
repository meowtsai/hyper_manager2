import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Alert,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroupAddon,
  InputGroup,
  Form,
  FormText
} from "reactstrap";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import { vipRankingOptions } from "./whaleOptConfig";

const UserViewBasic = ({
  vip,
  errors = {},
  onEditWhaleUser,
  updateOKMessage
}) => {
  const [line_date, setLineDate] = useState(vip.line_date);
  const [is_added, setIsAdded] = useState(vip.is_added);

  const [char_name, setCharName] = useState(vip.char_name);
  const [charNameEditMode, setCharNameEditMode] = useState(false);
  const [lineStatusEditMode, setLineStatusEditMode] = useState(false);

  const opt = vipRankingOptions.filter(opt => opt.value === vip.vip_ranking)[0];

  useEffect(() => {
    if (updateOKMessage) {
      setCharNameEditMode(false);
      setLineStatusEditMode(false);
    }
  }, [updateOKMessage]);
  return (
    <Row>
      <Col xl={6}>
        <Card className="border p-1 mb-1 rounded font-13 bg-light">
          <CardBody>
            {errors && errors.msg && (
              <Alert color="danger" isOpen={errors.msg ? true : false}>
                <div>{errors.msg}</div>
              </Alert>
            )}
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>帳號：</Label>
                  <span>{vip.uid} </span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>伺服器：</Label>
                  <span>{vip.server_name} </span>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>角色ID：</Label>
                  <span>{vip.char_in_game_id} </span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={4}>角色名稱：</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input
                        type="text"
                        name="char_name"
                        id="char_name"
                        plaintext={!charNameEditMode}
                        value={char_name}
                        onChange={e => setCharName(e.target.value)}
                        invalid={errors.char_name ? true : false}
                        readOnly={!charNameEditMode}
                      />

                      {charNameEditMode ? (
                        <InputGroupAddon addonType="append">
                          <Button
                            color="primary"
                            onClick={e => onEditWhaleUser({ char_name })}
                            size="sm"
                          >
                            <i className="mdi mdi-content-save" />
                          </Button>
                          <Button
                            color="secondary"
                            onClick={e => {
                              setCharNameEditMode(false);
                              setCharName(vip.char_name);
                            }}
                            size="sm"
                          >
                            <i className="mdi mdi-window-close" />
                          </Button>
                        </InputGroupAddon>
                      ) : (
                        <InputGroupAddon addonType="append">
                          <Button
                            color="secondary"
                            onClick={e => setCharNameEditMode(true)}
                            size="sm"
                          >
                            <i className="mdi mdi-pencil-outline" />
                          </Button>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
                  </Col>

                  <FormFeedback>{errors.char_name}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="report_id">VIP 分層</Label>

                  {vip.vip_ranking && (
                    <span
                      className={`mr-1 badge badge-${opt.color}-lighten badge-pill`}
                    >
                      {opt.label || ""}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>升階時間：</Label>
                  <span>
                    {moment(vip.vip_ranking_updated).format("YYYY-MM-DD hh:mm")}{" "}
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="report_id">最後登入：</Label>
                  <span>
                    {moment(vip.last_login).format("YYYY-MM-DD hh:mm")}{" "}
                  </span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>建立時間：</Label>
                  <span>
                    {moment(vip.create_time).format("YYYY-MM-DD hh:mm")}{" "}
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <hr />
                <FormGroup>
                  <Label>加Line狀態：</Label>

                  {vip.is_added === 1 ? (
                    <span className="text-success">
                      <strong>
                        <i className="mdi mdi-account-check-outline mr-2"></i>
                        已在 {moment(vip.line_date).format(
                          "YYYY-MM-DDTHH:mm"
                        )}{" "}
                        加入
                      </strong>
                    </span>
                  ) : (
                    <span className="text-secondary">
                      <strong>尚未 加入</strong>
                    </span>
                  )}
                  {!lineStatusEditMode && (
                    <Button
                      color="secondary"
                      size="sm"
                      className="ml-1"
                      onClick={e => setLineStatusEditMode(true)}
                    >
                      <i className="mdi mdi-pencil-outline" />
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
            {lineStatusEditMode && (
              <Row form className="mb-2">
                <Col md={12}>
                  <Form inline>
                    <FormGroup className="mb-2 mr-sm-2">
                      <Label for="select_line_status" className="mr-sm-2">
                        狀態
                      </Label>
                      <Input
                        type="select"
                        name="select_line_status"
                        id="select_line_status"
                        value={is_added}
                        onChange={e => {
                          setIsAdded(Number.parseInt(e.target.value));
                          setLineDate(
                            vip.line_date
                              ? vip.line_date
                              : moment().format("YYYY-MM-DDTHH:mm")
                          );
                        }}
                      >
                        <option value="0">未加入Line</option>
                        <option value="1">已加入Line</option>
                      </Input>
                    </FormGroup>

                    {is_added === 1 && (
                      <FormGroup className="mb-2 mr-sm-2">
                        <Label for="line_date" className="mr-sm-2">
                          加入時間
                        </Label>
                        <Input
                          type="datetime-local"
                          name="line_date"
                          id="line_date"
                          value={moment(line_date).format("YYYY-MM-DDTHH:mm")}
                          onChange={e => setLineDate(e.target.value)}
                          invalid={errors.line_date ? true : false}
                        />
                      </FormGroup>
                    )}

                    <Button
                      color="primary"
                      onClick={e =>
                        onEditWhaleUser({
                          is_added,
                          line_date: is_added === 1 ? line_date : null
                        })
                      }
                      size="sm"
                    >
                      <i className="mdi mdi-content-save" />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={e => {
                        setLineStatusEditMode(false);
                        setLineDate(vip.line_date);
                        setIsAdded(vip.is_added);
                      }}
                      size="sm"
                    >
                      <i className="mdi mdi-window-close" />
                    </Button>
                    <FormText>可以變更加入line狀態以及加入日期</FormText>
                  </Form>
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

UserViewBasic.propTypes = {
  vip: PropTypes.object.isRequired,
  onEditWhaleUser: PropTypes.func.isRequired
};

export default UserViewBasic;
