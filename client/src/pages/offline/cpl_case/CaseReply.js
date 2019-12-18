import React from "react";
import { Row, Col, Table, Button, ButtonGroup } from "reactstrap";
import Moment from "react-moment";
import PropTypes from "prop-types";

const CaseReply = ({ replies, onEditClick, onDeleteReplyClick }) => {
  return (
    <Row className="mt-2">
      <Col xl={6}>
        <h5 className="text-primary">聯絡歷程</h5>
        <Table className="mb-0" bordered>
          <tbody>
            {replies &&
              replies.map(reply => (
                <tr key={`reply-${reply.id}`} className="mt-2">
                  <th>
                    <Moment format="YYYY-MM-DD">{reply.contact_time}</Moment>
                    <br />
                    編輯者: {reply.admin_uname}
                  </th>
                  <td colSpan="3">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: reply.note
                      }}
                    />
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="secondary"
                        className="btn-icon"
                        onClick={e => onEditClick(reply.id)}
                      >
                        <i className="mdi mdi-square-edit-outline"></i>
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        className="btn-icon"
                        onClick={e => onDeleteReplyClick(reply.id)}
                      >
                        <i className="mdi mdi-trash-can-outline"></i>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}

            {(!replies || replies.length === 0) && (
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

CaseReply.propTypes = {
  replies: PropTypes.array.isRequired,
  onDeleteReplyClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default CaseReply;
