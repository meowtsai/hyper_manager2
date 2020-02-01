import React, { useState } from "react";
import { Row, Col, Table, Button, ButtonGroup, Badge } from "reactstrap";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { vipServiceOptions } from "./whaleOptConfig";

const UserRequestData = ({ requests, lbltext, onDeleteClick }) => {
  const [expand, setExpand] = useState(false);
  return (
    <Row className="mt-2">
      <Col xl={6}>
        <h5 className="text-primary">{lbltext}</h5>
        <div className="text-muted">
          {" "}
          共{requests.length}筆{" "}
          {requests.length > 5 && !expand ? "目前顯示最近5筆" : ""}
          {requests.length > 5 ? (
            expand ? (
              <span
                className="float-right"
                style={{ cursor: "pointer" }}
                onClick={e => setExpand(!expand)}
              >
                <i className="mdi mdi-collapse-all-outline" /> 收合
              </span>
            ) : (
              <span
                className="float-right"
                style={{ cursor: "pointer" }}
                onClick={e => setExpand(!expand)}
              >
                <i className="mdi mdi-expand-all-outline" /> 展開
              </span>
            )
          ) : null}
        </div>
        <Table className="mb-0 font-13" bordered>
          <tbody>
            {requests &&
              (expand ? requests : requests.filter((x, i) => i < 5)).map(r => (
                <tr key={`reply-${r.id}`} className="mt-2">
                  <th style={{ width: "100px" }}>
                    <div># {r.id}</div>

                    <div>專員: {r.admin_name}</div>
                  </th>
                  <td>
                    <div className="text-muted">
                      <Moment format="YYYY-MM-DD hh:mm">{r.create_time}</Moment>
                    </div>
                    <Badge color="warning" className="mr-1">
                      {
                        vipServiceOptions.filter(
                          opt => opt.type == r.service_type
                        )[0].list[r.request_code]
                      }
                    </Badge>
                    <Badge color="dark" className="mr-1">
                      {r.tag}
                    </Badge>
                    {r.note}
                  </td>
                  <td style={{ width: "50px" }}>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="danger"
                        className="btn-icon"
                        onClick={e => onDeleteClick(r.id)}
                      >
                        <i className="mdi mdi-trash-can-outline"></i>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}

            {(!requests || requests.length === 0) && (
              <tr>
                <td>尚無資料</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

UserRequestData.propTypes = {
  requests: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
 
};

export default UserRequestData;
