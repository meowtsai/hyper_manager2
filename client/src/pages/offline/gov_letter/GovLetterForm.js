import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
import {
  getServiceConfig,
  getServersByGameId,
  editRecord,
  getCurrentRecord
} from "../../../redux/actions";
const GovLetterForm = ({
  match,
  getServiceConfig,
  games,
  getServersByGameId,
  servers,
  editRecord,
  error,
  affectedId,
  history,
  loading,
  getCurrentRecord,
  currentRecord
}) => {
  //console.log("server", servers)
  const record_id = match.params.record_id ? match.params.record_id : null;
  const act_title = record_id ? "編輯" : "新增";
  const [o_letter_id, setOLetterId] = useState("");
  const [contact, setContact] = useState("");
  const [o_letter_date, setOLetterDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [deadline, setDeadline] = useState(
    moment()
      .add(15, "days")
      .format("YYYY-MM-DD")
  );
  const [status, setStatus] = useState(1);
  const [close_date, setCloseDate] = useState("");
  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [file01, setFile01] = useState("");
  const [file02, setFile02] = useState("");
  const [file03, setFile03] = useState("");
  const [file_path, setFile_path] = useState("");
  const [file_path2, setFile_path2] = useState("");
  const [file_path3, setFile_path3] = useState("");

  useEffect(() => {
    if (record_id) {
      getCurrentRecord("govletter", record_id, history);
    }
    getServiceConfig();
    //getCSMaster();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentRecord.o_letter_id) {
      setGameId(currentRecord.game_id);
      getServersByGameId(currentRecord.game_id);
      setContact(currentRecord.contact);
      setCloseDate(moment(currentRecord.close_date).format("YYYY-MM-DD"));
      setOLetterId(currentRecord.o_letter_id);
      setOLetterDate(moment(currentRecord.o_letter_date).format("YYYY-MM-DD"));
      setDeadline(moment(currentRecord.deadline).format("YYYY-MM-DD"));
      setServerId(currentRecord.server_id);
      setRoleName(currentRecord.role_name);
      setNote(currentRecord.note.replace(/<br\s*[\/]?>/gi, ""));
      setStatus(currentRecord.status);
      setFile_path(currentRecord.file_path);
      setFile_path2(currentRecord.file_path2);
      setFile_path3(currentRecord.file_path3);
    }
  }, [currentRecord]);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  useEffect(() => {
    //console.log("affectedId effect", affectedId);
    let timeOutId;
    if (affectedId > 0) {
      timeOutId = setTimeout(() => {
        history.push(`/offline/gov_letter/home?affectedId=${affectedId}`);
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [affectedId]);
  const onGameChange = val => {
    //console.log("onGameChange", val)
    setGameId(val);
    getServersByGameId(val);
  };

  const formSubmit = e => {
    e.preventDefault();
    //let record;

    let formData = new FormData();

    formData.append("o_letter_id", o_letter_id);
    formData.append("o_letter_date", o_letter_date);
    formData.append("contact", contact);
    formData.append("note", note);
    formData.append("deadline", deadline);
    formData.append("status", status);
    formData.append("game_id", gameId);
    formData.append("server_id", serverId);
    formData.append("role_name", roleName);

    if (close_date !== "") {
      //record.close_date=close_date;
      formData.append("close_date", close_date);
    }

    if (file01 !== "") {
      //record.close_date=close_date;
      //console.log("file01",file01[0])
      formData.append(`attachment01`, file01[0]);
    }
    if (file02 !== "") {
      //record.close_date=close_date;
      //console.log("file02",file02[0])
      formData.append(`attachment02`, file02[0]);
    }
    if (file03 !== "") {
      //record.close_date=close_date;
      //console.log("file03",file03[0])
      formData.append(`attachment03`, file03[0]);
    }

    if (record_id) {
      //record.id = record_id;
      formData.append("id", record_id);
    }

    //console.log("formData", formData);
    editRecord("govletter", formData);
  };

  if (affectedId > 0) {
    return (
      <Alert color="success" isOpen={affectedId > 0 ? true : false}>
        <div>{`公函 # ${affectedId} ${act_title} 成功!`} </div>
      </Alert>
    );
  }

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "線下客服",
            path: "/offline/gov_letter/home",
            active: false
          },
          {
            label: "公函",
            path: "/offline/gov_letter/home",
            active: false
          },
          {
            label: act_title,
            path: "/offline/gov_letter/create",
            active: true
          }
        ]}
        title={`${act_title}公函`}
      />
      <Row className="mb-2">
        <Col lg={6}>
          <Card>
            <CardBody>
              <h4 className="mb-3 header-title">請填寫公函紀錄</h4>
              {errors.msg && (
                <Alert color="danger" isOpen={errors.msg ? true : false}>
                  <div>{errors.msg}</div>
                </Alert>
              )}
              <Form onSubmit={formSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="o_letter_id">發文字號</Label>
                      <Input
                        type="text"
                        name="o_letter_id"
                        id="o_letter_id"
                        value={o_letter_id}
                        onChange={e => setOLetterId(e.target.value)}
                        placeholder="例:南市警麻偵字第1080399920號"
                        invalid={errors.o_letter_id ? true : false}
                      />

                      <FormFeedback>{errors.o_letter_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contact">承辦人姓名</Label>
                      <Input
                        type="text"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder="例:偵查佐郭揮勝"
                        invalid={errors.contact ? true : false}
                      />
                      <FormFeedback>{errors.contact}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="o_letter_date">發文日期</Label>
                      <Input
                        type="date"
                        name="o_letter_date"
                        id="o_letter_date"
                        value={o_letter_date}
                        onChange={e => setOLetterDate(e.target.value)}
                        placeholder="請選擇發文日期"
                        invalid={errors.o_letter_date ? true : false}
                      />

                      <FormFeedback>{errors.o_letter_date}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="deadline">回文期限</Label>
                      <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        placeholder="選擇回文期限"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                        invalid={errors.deadline ? true : false}
                      />
                      <FormFeedback>{errors.deadline}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="status">狀態</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        className="custom-select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <option value="">狀態...</option>
                        <option value="1">1-處理中</option>
                        <option value="4">4-已結案</option>
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
                        placeholder="選擇結案日期"
                        value={close_date}
                        onChange={e => setCloseDate(e.target.value)}
                        invalid={errors.close_date ? true : false}
                      />
                      <FormFeedback>{errors.close_date}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="gameId">遊戲</Label>
                      <Input
                        type="select"
                        name="gameId"
                        id="gameId"
                        value={gameId}
                        onChange={e => onGameChange(e.target.value)}
                        invalid={errors.gameId ? true : false}
                      >
                        <option>請選擇遊戲</option>
                        {games.map(game => (
                          <option
                            key={"g-" + game.game_id}
                            value={game.game_id}
                          >
                            {" "}
                            {game.game_id} - {game.game_name}{" "}
                            {game.is_active === 1 ? "" : "(停)"}
                          </option>
                        ))}
                      </Input>
                      <FormFeedback>{errors.serverId}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="gameId">伺服器</Label>
                      <Input
                        type="select"
                        name="serverId"
                        id="serverId"
                        value={serverId}
                        onChange={e => setServerId(e.target.value)}
                        invalid={errors.serverId ? true : false}
                      >
                        <option>請選擇伺服器</option>
                        {servers
                          .filter(server => server.server_status === "public")
                          .map(server => (
                            <option
                              key={"g-" + server.server_id}
                              value={server.server_id}
                            >
                              {" "}
                              {server.server_id} - {server.server_name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtRoleName">角色名稱</Label>
                      <Input
                        type="text"
                        name="txtRoleName"
                        id="txtRoleName"
                        value={roleName}
                        onChange={e => setRoleName(e.target.value)}
                        placeholder="請填寫角色名稱"
                        invalid={errors.roleName ? true : false}
                      />

                      <FormFeedback>{errors.roleName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}></Col>
                </Row>

                <FormGroup>
                  <Label for="txtNote">備註記事</Label>

                  <Input
                    type="textarea"
                    name="txtNote"
                    id="txtNote"
                    rows="5"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="詳細事由"
                    invalid={errors.note ? true : false}
                  />

                  <FormFeedback>{errors.note}</FormFeedback>
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="file01">相關檔案1</Label>

                      {file_path && (
                        <div>
                          <a
                            target="blank"
                            rel="noopener noreferrer"
                            href={file_path}
                          >
                            公函檔案1
                          </a>
                        </div>
                      )}

                      <Input
                        type="file"
                        name="file01"
                        id="file01"
                        onChange={e => {
                          setFile01(e.target.files);
                        }}
                      />
                      {file_path && file01.length > 0 && (
                        <span> 原本公函檔案1會被覆蓋喔!</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="file02">相關檔案2</Label>
                      {file_path2 && (
                        <div>
                          <a
                            target="blank"
                            rel="noopener noreferrer"
                            href={file_path2}
                          >
                            公函檔案2
                          </a>
                        </div>
                      )}
                      <Input
                        type="file"
                        name="file02"
                        id="file02"
                        onChange={e => {
                          setFile02(e.target.files);
                        }}
                      />
                      {file_path2 && file02.length > 0 && (
                        <span> 原本公函檔案2會被覆蓋喔!</span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="file03">相關檔案3</Label>
                      {file_path3 && (
                        <div>
                          <a
                            target="blank"
                            rel="noopener noreferrer"
                            href={file_path3}
                          >
                            公函檔案3
                          </a>
                        </div>
                      )}
                      <Input
                        type="file"
                        name="file03"
                        id="file03"
                        onChange={e => {
                          setFile03(e.target.files);
                        }}
                      />
                      {file_path3 && file03.length > 0 && (
                        <span> 原本公函檔案3會被覆蓋喔!</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Link
                  className="btn btn-secondary mr-2"
                  to="/offline/gov_letter/home"
                >
                  取消
                </Link>

                <Button color="primary" type="submit">
                  確認送出
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

GovLetterForm.propTypes = {
  games: PropTypes.array,
  servers: PropTypes.array,
  editRecord: PropTypes.func.isRequired,
  affectedId: PropTypes.number
};

const mapStateToProps = state => ({
  games: state.Service.games_list,
  servers: state.Servers.list,
  error: state.OfflineCs.error,
  affectedId: state.OfflineCs.affectedId,
  loading: state.OfflineCs.loading,
  currentRecord: state.OfflineCs.currentRecord
});
export default connect(mapStateToProps, {
  getServiceConfig,
  getServersByGameId,
  editRecord,
  getCurrentRecord
})(GovLetterForm);
