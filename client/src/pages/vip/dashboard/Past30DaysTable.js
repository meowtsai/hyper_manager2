import React, { Fragment } from "react";
import { Row, Col, Table } from "reactstrap";
import moment from "moment";
const Past30DaysTable = ({ data = [] }) => {
  const allDates = [...new Set((data || []).map((item) => item.udate))];
  const allGamesId = [...new Set((data || []).map((item) => item.game_id))];

  const newData = allGamesId.map((value, index) => ({
    label: data.filter((item) => item.game_id === value)[0].game_name,
    data: allDates.map((d) => {
      const dobj = data
        .filter((d) => d.game_id === value)
        .filter((item) => item.udate === d)[0];
      return dobj
        ? { amount: dobj.amount, count: dobj.count }
        : { amount: 0, count: 0 };
    }),
    // data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
  }));

  console.log("newData", newData);
  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th className="small">遊戲</th>
            {allDates.slice(0, 15).map((date, index) => {
              return <th className="small">{moment(date).format("MM-DD")}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {newData.map((d) => (
            <Fragment>
              <tr>
                <td rowSpan="2" className="small">
                  <strong> {d.label}</strong>
                </td>
                {d.data.slice(0, 15).map((record, index) => (
                  <td className="small">{record.amount}</td>
                ))}
              </tr>
              <tr>
                {d.data.slice(0, 15).map((record, index) => (
                  <td className="small">{record.count}</td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th className="small">遊戲</th>
            {allDates.slice(15, allDates.length).map((date, index) => {
              return <th className="small">{moment(date).format("MM-DD")}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {newData.map((d) => (
            <Fragment>
              <tr>
                <td rowSpan="2" className="small">
                  <strong> {d.label}</strong>
                </td>
                {d.data.slice(15, allDates.length).map((record, index) => (
                  <td className="small">{record.amount}</td>
                ))}
              </tr>
              <tr>
                {d.data.slice(15, allDates.length).map((record, index) => (
                  <td className="small">{record.count}</td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Past30DaysTable;

//`SELECT  a.game_id,g.name as game_name, DATE_FORMAT(update_time, '%Y/%m/%d') as udate, sum(wire_amount) as amount, count(*) as count
