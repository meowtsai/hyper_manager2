import React, { Fragment } from "react";
import { Row, Col, Table, Card, CardBody } from "reactstrap";
import Moment from "react-moment";
import moment from "moment";
import AllocateStatusBadge from "../../allocate/AllocateStatusBadge";
import * as showdown from "showdown";
const QuestionExpandRow = {
  showExpandColumn: true,
  expandByColumnOnly: true,

  renderer: row => (
    <Row>
      <Col xl={6}>
        <Table className="mb-0 font-13" sm={5} dark>
          <tbody>
            <tr>
              <th>單號：</th>
              <td>{row.id}</td>
              <th>結案專員：</th>
              <td>{row.admin_uname}</td>
            </tr>
            <tr>
              <th>狀態</th>
              <td>
                {row.status_text}
                {row.is_read === "0" ? (
                  <span className="text-secondary">(未讀)</span>
                ) : (
                  <span className="text-success">(已讀)</span>
                )}
              </td>
              <th>後送狀態</th>
              <td>
                {row.newAllocateRecord.length > 0 && (
                  <Fragment>
                    <span className="pr-2 text-nowrap mb-0 d-inline-block">
                      <i className="mdi mdi-briefcase-outline text-muted"></i>{" "}
                      <AllocateStatusBadge
                        status_code={row.newAllocateRecord[0].allocate_status}
                      />
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                      <i className="mdi mdi-face text-muted"></i>{" "}
                      <b>{row.newAllocateRecord[0].assignee_name}</b>{" "}
                    </span>
                  </Fragment>
                )}
              </td>
            </tr>
            <tr>
              <th>提問類型</th>
              <td colSpan="3">{row.type_text}</td>
            </tr>
            <tr>
              <th>遊戲：</th>
              <td>{row.game_name}</td>
              <th>伺服器：</th>
              <td>{row.server_name}</td>
            </tr>
            <tr>
              <th>原廠uid</th>
              <td>{row.partner_uid}</td>
              <th>角色名：</th>
              <td>{row.character_name}</td>
            </tr>

            <tr>
              <th>提問時間：</th>
              <td>
                <Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>
              </td>
              <th>上次更新：</th>
              <td>
                {moment(row.update_time).format("YYYY-MM-DD") ===
                "Invalid date" ? (
                  ""
                ) : (
                  <Moment format="YYYY-MM-DD">{row.update_time}</Moment>
                )}
              </td>
            </tr>

            <tr>
              <th>電話：</th>
              <td>{row.phone}</td>
              <th>Email：</th>
              <td>{row.email}</td>
            </tr>
            <tr>
              <th>IP：</th>
              <td>{row.ip}</td>
              <th>國家：</th>
              <td>{row.country}</td>
            </tr>
            <tr>
              <th>備註</th>
              <td colSpan="3">{row.note}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
      <Col xl={6}>
        <Table className="mb-0" sm={5} dark>
          <tbody>
            <tr>
              <td colSpan="4" className="text-dark font-13">
                <Comments
                  replies={row.replies}
                  content={row.content}
                  char_name={row.character_name}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
};
export default QuestionExpandRow;

const Comments = ({ char_name = "玩家", content, replies }) => {
  return (
    <Card>
      <CardBody>
        <h4 className="mt-0 mb-3">對話 ({replies.length})</h4>

        <div className="media mt-2">
          <span role="img" aria-label="user">
            🤨{" "}
          </span>
          <div className="media-body">
            <h5 className="mt-0">{char_name}</h5>

            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />

            {replies.map(reply => (
              <div key={`comment-${reply.id}`} className="media mt-3">
                {reply.is_official === "1" ? (
                  <span role="img" aria-label="user">
                    🧚{" "}
                  </span>
                ) : (
                  <span role="img" aria-label="user">
                    🤨{" "}
                  </span>
                )}
                <div className="media-body">
                  <h5 className="mt-0">
                    {reply.is_official === "1" ? reply.name : char_name}
                  </h5>{" "}
                  <small>
                    <Moment format="YYYY-MM-DD HH:mm">
                      {reply.create_time}
                    </Moment>
                  </small>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: new showdown.Converter().makeHtml(reply.content)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
