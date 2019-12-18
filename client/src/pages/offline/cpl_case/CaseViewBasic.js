import React from "react";
import { Row, Col, Table } from "reactstrap";
import Moment from "react-moment";
import PropTypes from "prop-types";

const CaseViewBasic = ({ row, config_status, deleteRef, deleteAttach }) => {
  return (
    <Row>
      <Col xl={6}>
        <Table className="mb-0" sm={4} dark>
          <tbody>
            <tr>
              <th>狀態</th>
              <td colSpan="3">
                {config_status[row.status]}
                {row.close_date !== "1899-11-29T16:00:00.000Z" &&
                  row.close_date && (
                    <span>
                      (結案日期 :
                      <Moment format="YYYY-MM-DD">{row.close_date}</Moment>)
                    </span>
                  )}
              </td>
            </tr>
            <tr>
              <th>發文字號：</th>
              <td>{row.o_case_id}</td>
              <th>申訴人：</th>
              <td>{row.appellant}</td>
            </tr>
            <tr>
              <th>發文日期：</th>
              <td>{<Moment format="YYYY-MM-DD">{row.o_case_date}</Moment>}</td>
              <th>回覆期限：</th>
              <td>{<Moment format="YYYY-MM-DD">{row.deadline}</Moment>} </td>
            </tr>
            <tr>
              <th>遊戲角色：</th>
              <th colSpan="3">
                【{row.game_name}】{row.role_name} ({row.server_name})
              </th>
            </tr>
            <tr>
              <th>處理人員：</th>
              <td>{row.admin_name}</td>
              <th>建立時間：</th>
              <td>
                {<Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>}
              </td>
            </tr>
            <tr>
              <th className="text-nowrap">申訴原因：</th>
              <td colSpan="3">
                <span dangerouslySetInnerHTML={{ __html: row.reason }} />{" "}
              </td>
            </tr>
            <tr>
              <th>相關案件：</th>
              <td colSpan="3">
                {row.refs.map(ref => (
                  <div key={`ref_${ref.ref_id}`}>
                    <a
                      className="text-light"
                      target="blank"
                      href={`${ref.ref_id}`}
                    >
                      * # {ref.ref_id} - {ref.o_case_id}
                    </a>{" "}
                    {deleteRef && (
                      <span
                        className="ml-2"
                        onClick={e => deleteRef(ref.ref_id)}
                      >
                        <i className="text-danger mdi mdi-trash-can-outline" />{" "}
                      </span>
                    )}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <th>相關附件：</th>
              <td colSpan="3">
                {row.attachments.map(attach => (
                  <div key={`attach_${attach.id}`}>
                    <a
                      className="text-light"
                      target="blank"
                      href={attach.pic_path}
                    >
                      * {attach.title}
                    </a>
                    {deleteAttach && (
                      <span
                        className="ml-2"
                        onClick={e => deleteAttach(attach.id)}
                      >
                        <i className="text-danger mdi mdi-trash-can-outline" />{" "}
                      </span>
                    )}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

CaseViewBasic.propTypes = {
  row: PropTypes.object.isRequired,
  config_status: PropTypes.object.isRequired
};

export default CaseViewBasic;
