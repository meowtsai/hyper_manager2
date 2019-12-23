// @flow
import React from "react";
import { Card, CardBody, Table, ButtonGroup, Button } from "reactstrap";

const PresetMessageList = ({ list, editClick, deleteClick }) => {
  return (
    <Card>
      <CardBody>
        <Table
          hover
          responsive
          className="table-striped table-sm table-centered mb-0 table-nowrap"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>訊息內容</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((record, index) => {
              return (
                <tr key={`pma_${record.id}`}>
                  <td>{record.id}</td>
                  <td>{record.message}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="secondary"
                        className="btn-icon"
                        onClick={e => editClick(record.id)}
                      >
                        <i className="mdi mdi-square-edit-outline"></i>
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        className="btn-icon"
                        onClick={e => deleteClick(record.id)}
                      >
                        <i className="mdi mdi-trash-can-outline"></i>
                      </Button>
                    </ButtonGroup>
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

export default PresetMessageList;
