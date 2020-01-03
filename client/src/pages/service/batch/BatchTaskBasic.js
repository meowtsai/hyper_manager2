import React from "react";
import { Row, Col, Table } from "reactstrap";
import Moment from "react-moment";
import PropTypes from "prop-types";

const BatchTaskBasic = ({ row, deleteRef, removeBatchQ, removeQFromBatch }) => {
  const handleRemoveAll = () => {
    const deleteAll = window.confirm("將全部已選取的問題移除嗎?");
    if (deleteAll) {
      removeBatchQ(row.id);
    }
  };

  const handleRemoveSingle = q_id => {
    const deleteOne = window.confirm(`將問題#${q_id}移除嗎?`);
    if (deleteOne) {
      removeQFromBatch(q_id);
    }
  };

  return (
    <Row>
      <Col xl={6}>
        {!row.id ? (
          "沒有該項目"
        ) : (
          <Table className="mb-0" sm={4}>
            <tbody>
              <tr>
                <th>遊戲</th>
                <td>{row.game_name}</td>
                <th>項目名稱</th>
                <td>{row.title}</td>
              </tr>
              <tr>
                <th>建立時間</th>
                <td>
                  {<Moment format="YYYY-MM-DD">{row.create_time}</Moment>}
                </td>
                <th>建立人員</th>
                <td>{row.admin_name} </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div
                    className="border p-1 mt-3 mt-lg-0 rounded"
                    style={{ backgroundColor: "pink" }}
                  >
                    <h5 className="header-title mb-1 text-info">
                      提問單號(共{row.q_list ? row.q_list.length : 0}筆){" "}
                      {removeBatchQ && (
                        <button
                          className="btn btn-sm ml-2 btn-light"
                          onClick={e => handleRemoveAll(e)}
                        >
                          <i className="text-dark mr-1 mdi mdi-trash-can-outline" />
                          全部移除
                        </button>
                      )}
                    </h5>

                    <div className="table-responsive">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            <td>
                              {row.q_list &&
                                row.q_list.map(item => (
                                  <span key={`ques-${item.question_id}`}>
                                    <a
                                      className="text-info ml-3"
                                      target="blank"
                                      href={`/service/view/${item.question_id}`}
                                      key={`taskitem_${item.question_id}`}
                                    >
                                      {item.question_id}
                                    </a>{" "}
                                    {removeQFromBatch && (
                                      <span
                                        onClick={e =>
                                          handleRemoveSingle(item.question_id)
                                        }
                                      >
                                        <i className="text-danger mdi mdi-trash-can-outline" />{" "}
                                      </span>
                                    )}
                                  </span>
                                ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

BatchTaskBasic.propTypes = {
  row: PropTypes.object.isRequired
};

export default BatchTaskBasic;
