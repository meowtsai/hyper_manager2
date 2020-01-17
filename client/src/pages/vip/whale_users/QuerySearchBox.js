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
    moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD")
  );

  const [endTime, setEndTime] = useState(moment().format("YYYY-MM-DD"));
  const [searchActivated, setSearchActivated] = useState(false);
  const [gameId, setGameId] = useState("");

  const searchClick = e => {
    e.preventDefault();
    setSearchActivated(true);

    const conditions = {
      gameId,
      beginTime: moment(beginTime).format("YYYY-MM-DD"),
      endTime: moment(endTime).format("YYYY-MM-DD")
    };

    handleSearchClick(conditions);
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <Form>
            <div className="border p-1 mb-1 rounded font-13 bg-light">
              <Row lg={8}>
                <Col md={2}>
                  <Label htmlFor="create_time_begin">提問時間起</Label>
                  <Input
                    bsSize="sm"
                    type="date"
                    name="create_time_begin"
                    id="create_time_begin"
                    value={moment(beginTime).format("YYYY-MM-DD")}
                    onChange={e => {
                      if (
                        moment(e.target.value).format("YYYY-MM-DD") !==
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
                    type="date"
                    name="create_time_end"
                    id="create_time_end"
                    value={moment(endTime).format("YYYY-MM-DD")}
                    onChange={e => {
                      if (
                        moment(e.target.value).format("YYYY-MM-DD") !==
                        "Invalid date"
                      )
                        return setEndTime(e.target.value);
                    }}
                  />
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="create_time_begin">遊戲</Label>
                    <Input
                      bsSize="sm"
                      type="select"
                      name="gameSelect"
                      id="gameSelect"
                      onChange={e => setGameId(e.target.value)}
                      value={gameId}
                    >
                      <option value="">==選擇遊戲==</option>
                      {games.length > 0 &&
                        games.map(game => (
                          <option key={`sel-${game.site}`} value={game.site}>
                            {game.name}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <button
                    className={`btn btn-sm ml-2 mb-0  mt-3 btn-${
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
