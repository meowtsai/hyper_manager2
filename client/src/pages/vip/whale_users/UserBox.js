// @flow
import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { vipRankingOptions } from "./whaleOptConfig";
import Moment from "react-moment";
const UserBox = ({ user }) => {
  var totalFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0
  });

  const opt = vipRankingOptions.filter(
    opt => opt.value === user.vip_ranking
  )[0];

  return (
    <Card className="">
      <CardBody className="profile-user-box">
        <Row>
          <Col sm={8}>
            <div className="media">
              <div className="media-body">
                <h4 className="mt-1 mb-1">
                  {user.char_name}
                  {user.is_added === 1 ? (
                    <span>
                      {" "}
                      <i className="mdi mdi-account-check-outline text-success"></i>{" "}
                    </span>
                  ) : null}
                </h4>
                <p className="font-13 text-dark-50"> {user.uid}</p>

                <ul className="mb-0 list-inline">
                  <li className="list-inline-item mr-3">
                    <h5 className="mb-1">
                      {totalFormatter.format(user.deposit_total)}
                    </h5>

                    <p className="mb-0 font-13 text-dark-50">儲值總額</p>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="mb-1">
                      <span
                        className={`mr-1 badge badge-${opt.color}-lighten badge-pill`}
                      >
                        {opt.label || ""}
                      </span>
                    </h5>
                    <p className="mb-0 font-13 text-dark-50">VIP 等級</p>
                  </li>
                </ul>
                <hr />

                <div className="text-left">
                  <p className="text-muted">
                    <strong>角色ID :</strong>{" "}
                    <span className="ml-2">{user.char_in_game_id}</span>
                  </p>

                  <p className="text-muted">
                    <strong>伺服器 :</strong>{" "}
                    <span className="ml-2">{user.server_name}</span>
                  </p>

                  <p className="text-muted">
                    <strong>加入日期 :</strong>
                    <span className="ml-2">
                      {" "}
                      {user.line_date ? (
                        <Moment format="YYYY-MM-DD">{user.line_date}</Moment>
                      ) : null}
                    </span>
                  </p>
                  <p className="text-muted">
                    <strong>最後登入 :</strong>
                    <span className="ml-2">
                      <Moment format="YYYY-MM-DD">{user.last_login}</Moment>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserBox;
