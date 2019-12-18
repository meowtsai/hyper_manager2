import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Moment from "react-moment";
import {
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Badge
} from "reactstrap";

const QuerySearchBox = ({
  handleSearchClick,
  clearSearch,
  question_type,
  question_status,
  games
}) => {
  const [beginTime, setBeginTime] = useState(
    moment().format("YYYY-MM-DDT00:00")
  );

  const [endTime, setEndTime] = useState(moment().format("YYYY-MM-DDT23:59"));
  const [searchActivated, setSearchActivated] = useState(false);
  const [gameId, setGameId] = useState("");
  const [qType, setType] = useState("");
  const [qStatus, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [partner_uid, setPartnerUid] = useState("");
  const [character_name, setCharName] = useState("");
  const [check_id, setCheckCode] = useState("");

  const [question_no, setQuestionNo] = useState("");
  const [content, setContent] = useState("");

  console.log("email", email);
  const searchClick = e => {
    e.preventDefault();
    setSearchActivated(true);

    const conditions = {
      gameId,
      beginTime: moment(beginTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
      type: qType,
      status: qStatus,
      email,
      phone,
      partner_uid,
      character_name,
      check_id,
      content,
      id: question_no
    };

    handleSearchClick(conditions);
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <Form>
            <div className="border p-1 mb-1 rounded font-13 bg-light">
              <Row>
                <Col md={2}>
                  <Label htmlFor="create_time_begin">提問時間起</Label>
                  <Input
                    bsSize="sm"
                    type="datetime-local"
                    name="create_time_begin"
                    id="create_time_begin"
                    value={moment(beginTime).format("YYYY-MM-DDTHH:mm")}
                    onChange={e => {
                      if (
                        moment(e.target.value).format("YYYY-MM-DDTHH:mm") !==
                        "Invalid date"
                      )
                        return setBeginTime(e.target.value);
                    }}
                  />{" "}
                </Col>
                <Col md={2}>
                  <Label htmlFor="create_time_begin">提問時間迄</Label>
                  <Input
                    bsSize="sm"
                    type="datetime-local"
                    name="create_time_end"
                    id="create_time_end"
                    value={moment(endTime).format("YYYY-MM-DDTHH:mm")}
                    onChange={e => {
                      if (
                        moment(e.target.value).format("YYYY-MM-DDTHH:mm") !==
                        "Invalid date"
                      )
                        return setEndTime(e.target.value);
                    }}
                  />
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="gameSelect">遊戲</Label>
                    <Input
                      bsSize="sm"
                      type="select"
                      name="gameSelect"
                      id="gameSelect"
                      value={gameId}
                      onChange={e => setGameId(e.target.value)}
                    >
                      <option value="">不限定遊戲</option>
                      {games &&
                        games
                          .sort((a, b) => {
                            if (
                              a.game_id.slice(0, 1).toUpperCase() >
                              b.game_id.slice(0, 1).toUpperCase()
                            ) {
                              return 1;
                            } else {
                              return -1;
                            }
                          })
                          .map(
                            game =>
                              game.is_active === 1 && (
                                <option key={game.game_id} value={game.game_id}>
                                  {game.game_id} - {game.game_name}
                                </option>
                              )
                          )}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="typeSelect" bsSize="sm">
                      類型
                    </Label>
                    <Input
                      bsSize="sm"
                      type="select"
                      name="typeSelect"
                      id="typeSelect"
                      value={qType}
                      onChange={e => setType(e.target.value)}
                    >
                      <option value="">--</option>
                      {question_type &&
                        Object.keys(question_type).map(typeKey => (
                          <option key={`qtype- ${typeKey}`} value={typeKey}>
                            {question_type[typeKey]}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="statusSelect" bsSize="sm">
                      回覆狀態
                    </Label>
                    <Input
                      bsSize="sm"
                      type="select"
                      name="statusSelect"
                      id="statusSelect"
                      value={qStatus}
                      onChange={e => setStatus(e.target.value)}
                    >
                      <option value="">--</option>
                      {question_status &&
                        Object.keys(question_status).map(typeKey => (
                          <option key={`qstatus- ${typeKey}`} value={typeKey}>
                            {question_status[typeKey]}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>單號</label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name="question_no"
                      id="question_no"
                      placeholder="提問單號"
                      value={question_no}
                      onChange={e => setQuestionNo(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      bsSize="sm"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>手機</label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      placeholder="手機"
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>原廠UID</label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="partner_uid"
                      id="partner_uid"
                      value={partner_uid}
                      placeholder="原廠UID"
                      onChange={e => setPartnerUid(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>角色名</label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="character_name"
                      id="character_name"
                      value={character_name}
                      placeholder="角色名"
                      onChange={e => setCharName(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>檢核碼</label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="check_id"
                      id="check_id"
                      value={check_id}
                      placeholder="檢核碼"
                      onChange={e => setCheckCode(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <label>提問或回覆</label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="content"
                      id="content"
                      placeholder="查找提問或回覆內容關鍵字"
                      value={content}
                      onChange={e => setContent(e.target.value)}
                    />
                  </div>
                  <button
                    className={`btn btn-sm ml-2 mb-0 btn-${
                      searchActivated ? "primary" : "secondary"
                    }`}
                    onClick={e => searchClick(e)}
                  >
                    搜尋
                  </button>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

QuerySearchBox.propTypes = {};

export default QuerySearchBox;
