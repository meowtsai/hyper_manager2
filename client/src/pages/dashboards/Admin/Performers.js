// @flow
import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const Performers = ({ period_report }) => {
  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">案件處理量</h4>

        <Table
          hover
          responsive
          className="table-striped table-sm table-centered mb-0 table-nowrap"
        >
          <thead>
            <tr>
              <th>專員</th>
              <th>後送處理中</th>
              <th>後送已完成</th>
              <th>公函</th>
              <th>消保案</th>
              <th>vip訂單</th>
              <th>加總</th>
            </tr>
          </thead>
          <tbody>
            {period_report
              .filter((cs) => cs.role === "cs_master")
              .map((record, index) => {
                return (
                  <tr key={`cs_${index}`}>
                    <th scope="row">
                      <h5 className="font-15 mb-1 font-weight-normal">
                        {record.admin_name}
                      </h5>
                    </th>
                    <td>{record.status_process}</td>
                    <td>{record.status_done}</td>
                    <td>{record.gov_cnt}</td>
                    <td>{record.cpl_cnt2}</td>
                    <td>{record.vip_order}</td>

                    <td>
                      {Number.parseInt(record.status_process) +
                        Number.parseInt(record.status_done) +
                        Number.parseInt(record.gov_cnt) +
                        Number.parseInt(record.cpl_cnt2) +
                        Number.parseInt(record.vip_order)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Performers;
