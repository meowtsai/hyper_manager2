import React, { useEffect, useState, Fragment } from "react";
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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import PageTitle from "../../../components/PageTitle";
import {
  getGames,
  getServersByGameId,
  getAdminUsers,
  editRecord,
  getCurrentRecord
} from "../../../redux/actions";

const CplCaseForm = ({
  affectedId,
  games,
  servers,
  cs_master,
  error,
  currentRecord,
  history,
  match,
  getGames,
  getServersByGameId,
  getAdminUsers,
  editRecord,
  getCurrentRecord
}) => {
  const record_id = match.params.record_id ? match.params.record_id : null;
  const act_title = record_id ? "編輯" : "新增";

  const [o_case_id, setCaseId] = useState("");

  const [o_case_date, setCaseDate] = useState(moment().format("YYYY-MM-DD"));
  const [deadline, setDeadLine] = useState(
    moment()
      .add(15, "days")
      .format("YYYY-MM-DD")
  );

  const [appellant, setAppellant] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [roleName, setRoleName] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (record_id) {
      getCurrentRecord("cpl_case", record_id, history);
    }
    getGames();

    getAdminUsers("cs_master");

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  useEffect(() => {
    if (currentRecord.o_case_id) {
      setCaseId(currentRecord.o_case_id);
      setCaseDate(moment(currentRecord.o_case_date).format("YYYY-MM-DD"));
      setDeadLine(moment(currentRecord.deadline).format("YYYY-MM-DD"));

      setAppellant(currentRecord.appellant);

      setPhone(currentRecord.phone);
      setReason(currentRecord.reason);
      onGameChange(currentRecord.game_id);

      setServerId(currentRecord.server_id);
      setRoleName(currentRecord.role_name);
    }
  }, [currentRecord]);

  useEffect(() => {
    //console.log("affectedId effect", affectedId);
    if (affectedId > 0) {
      setTimeout(() => {
        history.push(`/offline/cpl_case/home?affectedId=${affectedId}`);
      }, 2000);
    }
  }, [affectedId]);

  const onGameChange = val => {
    setGameId(val);
    getServersByGameId(val);
  };

  const formSubmit = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("o_case_id", o_case_id);
    formData.append("o_case_date", o_case_date);
    formData.append("deadline", deadline);
    formData.append("appellant", appellant);
    formData.append("phone", phone);
    formData.append("reason", reason);
    formData.append("game_id", gameId);
    formData.append("server_id", serverId);
    formData.append("role_name", roleName);

    if (record_id) {
      //record.id = record_id;
      formData.append("id", record_id);
    }

    //console.log("formData", formData);
    editRecord("cpl_case", formData);
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "線下客服",
            path: "/offline/cpl_case/home",
            active: false
          },
          {
            label: "消保",
            path: "/offline/cpl_case/home",
            active: false
          },
          {
            label: act_title,
            path: "/offline/cpl_case/create",
            active: true
          }
        ]}
        title={`${act_title}消保`}
      />

      <Row className="mb-2">
        <Col lg={6}>
          {affectedId > 0 && (
            <Alert color={"success"}>
              <strong> {act_title} 成功 - </strong> 紀錄 - {affectedId} 已經
              {act_title}完成。
            </Alert>
          )}
          <Card>
            <CardBody>
              <h4 className="mb-3 header-title">請填寫消保案件內容</h4>
              <Form onSubmit={formSubmit}>
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="deadline">回文期限</Label>
                      <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        placeholder="選擇回文期限"
                        value={deadline}
                        onChange={e => setDeadLine(e.target.value)}
                        invalid={errors.deadline ? true : false}
                      />
                      <FormFeedback>{errors.deadline}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtAppellant">申訴人姓名</Label>
                      <Input
                        type="text"
                        name="txtAppellant"
                        id="txtAppellant"
                        value={appellant}
                        onChange={e => setAppellant(e.target.value)}
                        placeholder="請填寫申訴人姓名"
                        invalid={errors.appellant ? true : false}
                      />

                      <FormFeedback>{errors.appellant}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtPhone">電話</Label>
                      <Input
                        type="text"
                        name="txtPhone"
                        id="txtPhone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="填寫玩家連絡電話,手機"
                        invalid={errors.phone ? true : false}
                      />

                      <FormFeedback>{errors.phone}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
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
                        {games
                          .filter(game => game.is_active === 1)
                          .map(game => (
                            <option
                              key={"g-" + game.game_id}
                              value={game.game_id}
                            >
                              {" "}
                              {game.game_id} - {game.game_name}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>{errors.serverId}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
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
                  <Col md={4}>
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
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="txtReason">申訴原因</Label>
                      <Input
                        type="text"
                        name="txtReason"
                        id="txtReason"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="簡述玩家申訴原因, 例:連線問題"
                        invalid={errors.reason ? true : false}
                      />

                      <FormFeedback>{errors.reason}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Link
                  className="btn btn-secondary mr-2"
                  to="/offline/personal_visit/home"
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

CplCaseForm.propTypes = {
  games: PropTypes.array
};

const mapStateToProps = state => ({
  games: state.Games.list,
  servers: state.Servers.list,
  cs_master: state.AdminUsers.users,
  error: state.OfflineCs.error,
  ocsdata: state.OfflineCs.ocsdata,
  affectedId: state.OfflineCs.affectedId,
  currentRecord: state.OfflineCs.currentRecord
});
export default connect(mapStateToProps, {
  getGames,
  getServersByGameId,
  getAdminUsers,
  editRecord,
  getCurrentRecord
})(CplCaseForm);
