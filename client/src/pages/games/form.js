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
  CustomInput,
  FormFeedback,
  Button,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PageTitle from "../../components/PageTitle";

import {
  editGame,
  getCurrentGame,
  clearCurrentGame
} from "../../redux/actions";
const GameForm = ({
  match,
  history,
  errors,
  editGame,
  getCurrentGame,
  currentRecord,
  clearCurrentGame,
  updateOKMessage
}) => {
  const editGameId = match.params.game_id ? match.params.game_id : null;
  //console.log("match.params.game_id", match.params.game_id);
  const act_title = editGameId ? "編輯" : "新增";

  const [gameName, setGameName] = useState("");
  const [game_id, setGameId] = useState(editGameId);
  const [game_status, setGameStatus] = useState(0);
  const [game_tags, setGameTags] = useState(false);
  const [fanpage, setFanpage] = useState("");
  const [site, setSite] = useState("");

  const [slogan, setSlogan] = useState("");

  const [logo_path, setLogoPath] = useState("");
  const [file_logo, setFileLogo] = useState("");

  const [title_path, setTitlePath] = useState("");
  const [file_title, setFileTitle] = useState("");
  const [bg_path, setBgPath] = useState("");
  const [file_bg, setFileBg] = useState("");

  const selStatusOptions = { 0: "關", 1: "開", 2: "內測" };

  useEffect(() => {
    if (editGameId) {
      getCurrentGame(editGameId);
    } else {
      clearCurrentGame();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (editGameId && currentRecord.game_id) {
      setGameId(currentRecord.game_id);
      setGameName(currentRecord.name);
      setGameStatus(currentRecord.is_active);
      setGameTags(
        currentRecord.tags ? currentRecord.tags.indexOf("首頁輪播") >= 0 : false
      );
      setFanpage(currentRecord.fanpage);
      setSite(currentRecord.site);
      setSlogan(currentRecord.slogan);
      setLogoPath(currentRecord.logo_path);
      setTitlePath(currentRecord.title_path);
      setBgPath(currentRecord.bg_path);
    }
  }, [currentRecord]);

  useEffect(() => {
    if (updateOKMessage !== null && editGameId === null) {
      history.push(`/games/edit/${game_id}`);
    }
  }, [updateOKMessage]);

  const formSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    if (editGameId !== null) formData.append("editGameId", game_id);

    formData.append("game_id", game_id);
    formData.append("name", gameName);
    formData.append("is_active", game_status);

    if (fanpage && fanpage !== "") {
      formData.append("fanpage", fanpage);
    }
    if (site && site !== "") {
      formData.append("site", site);
    }

    if (slogan && slogan !== "") {
      formData.append("slogan", slogan);
    }

    formData.append("logo_path", logo_path);
    if (game_tags) formData.append("tags", "首頁輪播");

    if (file_logo !== "") {
      formData.append(`file_logo`, file_logo[0]);
    }
    if (file_title !== "") {
      formData.append(`file_title`, file_title[0]);
    }
    if (file_bg !== "") {
      formData.append(`file_bg`, file_bg[0]);
    }

    editGame(formData);
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "遊戲",
            path: "/game",
            active: false
          },
          {
            label: "修改",
            path: "/game/edit",
            active: false
          }
        ]}
        title={`${act_title}遊戲`}
      />
      <Row className="mb-2">
        <Col lg={6}>
          {
            <Alert
              color="success"
              isOpen={updateOKMessage !== null ? true : false}
            >
              <div>{`遊戲 # ${game_id} ${act_title} 成功!`} </div>
            </Alert>
          }
          <Card>
            <CardBody>
              {errors.msg && (
                <Alert color="danger" isOpen={errors.msg ? true : false}>
                  <div>{errors.msg}</div>
                </Alert>
              )}
              <Form onSubmit={formSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="game_id">遊戲代號</Label>

                      {editGameId ? (
                        <Input plaintext defaultValue={editGameId} readOnly />
                      ) : (
                        <Input
                          type="text"
                          name="game_id"
                          id="game_id"
                          value={game_id}
                          onChange={e => setGameId(e.target.value)}
                          placeholder="輸入Game Id, 限英文數字不可和其他遊戲重複, 大小寫要和文件一致"
                          invalid={errors.game_id ? true : false}
                        />
                      )}
                      <FormFeedback>{errors.game_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="o_letter_id">遊戲名稱</Label>
                      <Input
                        type="text"
                        name="gameName"
                        id="gameName"
                        value={gameName}
                        onChange={e => setGameName(e.target.value)}
                        placeholder="輸入完整遊戲名稱"
                        invalid={errors.game_name ? true : false}
                      />

                      <FormFeedback>{errors.game_name}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="game_status">上線狀態</Label>
                      <Input
                        type="select"
                        name="game_status"
                        id="game_status"
                        value={game_status}
                        onChange={e => setGameStatus(e.target.value)}
                        invalid={errors.game_status ? true : false}
                      >
                        <option>請選擇</option>
                        {Object.keys(selStatusOptions).map(key => (
                          <option key={"gStatus-" + key} value={key}>
                            {key} - {selStatusOptions[key]}
                          </option>
                        ))}
                      </Input>
                      <FormFeedback>{errors.game_status}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <hr />
                    <h6 className="text-primary">官網首頁遊設定</h6>
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <div>
                        <CustomInput
                          type="checkbox"
                          id="game_tags"
                          label="首頁輪播"
                          onChange={e => setGameTags(e.target.checked)}
                          checked={game_tags}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="fanpage">粉絲團URL</Label>
                      <small className="mute">
                        {" "}
                        * 範例: https://www.facebook.com/playvxz/{" "}
                      </small>
                      <Input
                        type="text"
                        name="fanpage"
                        id="fanpage"
                        value={fanpage}
                        onChange={e => setFanpage(e.target.value)}
                        invalid={errors.fanpage ? true : false}
                      />

                      <FormFeedback>{errors.fanpage}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="site">遊戲官網URL</Label>
                      <small className="mute">
                        {" "}
                        * 範例: https://www.identity-v.com/
                      </small>
                      <Input
                        type="text"
                        name="site"
                        id="site"
                        value={site}
                        onChange={e => setSite(e.target.value)}
                        invalid={errors.site ? true : false}
                      />

                      <FormFeedback>{errors.site}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="slogan">行銷文字</Label>
                      <small className="mute">
                        {" "}
                        * * 範例: 心驚膽戰 追逐逃生{" "}
                      </small>
                      <Input
                        type="text"
                        name="slogan"
                        id="slogan"
                        value={slogan}
                        onChange={e => setSlogan(e.target.value)}
                        invalid={errors.slogan ? true : false}
                      />

                      <FormFeedback>{errors.slogan}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="logo_path">
                        logo小圖(.gif, jpg, jpeg, png)
                      </Label>
                      <small className="mute hint">
                        {" "}
                        * 設定後才會出現在首頁下拉選單
                      </small>
                      <div>{showImg(logo_path)}</div>

                      <Input
                        type="file"
                        name="file_logo"
                        id="file_logo"
                        onChange={e => {
                          setFileLogo(e.target.files);
                        }}
                      />
                      {file_logo && file_logo.length > 0 && (
                        <span> 按下[確認送出]後原本的圖檔會被覆蓋喔!</span>
                      )}

                      <FormFeedback>{errors.logo_path}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="title_path">
                        遊戲標題圖檔(.gif, jpg, jpeg, png)
                      </Label>

                      <div>{showImg(title_path)}</div>

                      <Input
                        type="file"
                        name="file_title"
                        id="file_title"
                        onChange={e => {
                          setFileTitle(e.target.files);
                        }}
                      />
                      {file_title && file_title.length > 0 && (
                        <span> 按下[確認送出]後原本的圖檔會被覆蓋喔!</span>
                      )}

                      <FormFeedback>{errors.title_path}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="bg_path">
                        輪播大圖(.gif, jpg, jpeg, png)
                      </Label>
                      <small className="mute hint">
                        {" "}
                        * 設定後才會出現在輪播
                      </small>
                      <div>{showImg(bg_path)}</div>

                      <Input
                        type="file"
                        name="file_bg"
                        id="file_bg"
                        onChange={e => {
                          setFileBg(e.target.files);
                        }}
                      />
                      {file_bg && file_bg.length > 0 && (
                        <span> 按下[確認送出]後原本的圖檔會被覆蓋喔!</span>
                      )}

                      <FormFeedback>{errors.bg_path}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Link className="btn btn-secondary mr-2" to="/games/home">
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

const showImg = img_path =>
  img_path ? (
    <a target="blank" rel="noopener noreferrer" href={img_path}>
      <img
        src={img_path}
        alt={"遊戲圖檔"}
        title={"遊戲圖檔"}
        className="rounded "
        height="48"
      />
    </a>
  ) : (
    <div className="avatar-sm">
      <span
        className="avatar-title bg-primary-lighten rounded mr-3"
        height="48"
      ></span>
    </div>
  );

GameForm.propTypes = {
  games: PropTypes.array,
  servers: PropTypes.array,
  editGame: PropTypes.func.isRequired,
  affectedId: PropTypes.number
};

const mapStateToProps = state => ({
  errors: state.Games.errors,
  affectedId: state.Games.affectedId,
  loading: state.Games.loading,
  currentRecord: state.Games.currentRecord,
  updateOKMessage: state.Games.updateOKMessage
});
export default connect(mapStateToProps, {
  editGame,
  getCurrentGame,
  clearCurrentGame
})(GameForm);
