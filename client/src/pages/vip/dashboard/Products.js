// @flow
import React from "react";
import {
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";

const Products = ({ data = [], refreshData, title }) => {
  return (
    <Card>
      <CardBody>
        <UncontrolledButtonDropdown className="float-right">
          <DropdownToggle
            tag="button"
            className="btn btn-linkarrow-none card-drop p-0"
          >
            <i className="mdi mdi-dots-vertical"></i>
          </DropdownToggle>

          <DropdownMenu right>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "prods", value: 1 });
              }}
            >
              過去 1 日
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "prods", value: 7 });
              }}
            >
              過去 7 日
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "prods", value: 30 });
              }}
            >
              過去 30 日
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <h4 className="header-title mb-2">方案銷售數量({title})</h4>

        <Table hover responsive className="mb-0 mt-2">
          <tbody>
            {data.map((row) => (
              <tr key={`products_${row.product_id}`}>
                <td>
                  <h5 className="font-14 mb-1 font-weight-normal">
                    {row.title}
                  </h5>
                  <span className="text-muted font-13">{row.product_id}</span>
                </td>
                <td>
                  <h5 className="font-14 mb-1 font-weight-normal">
                    {" "}
                    {row.price}
                  </h5>
                  <span className="text-muted font-13">單價</span>
                </td>
                <td>
                  <h5 className="font-14 mb-1 font-weight-normal">
                    {" "}
                    {row.qty}
                  </h5>
                  <span className="text-muted font-13">數量</span>
                </td>
                <td>
                  <h5 className="font-14 mb-1 font-weight-normal">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "TWD",
                      minimumFractionDigits: 0,
                    }).format(row.total)}
                  </h5>
                  <span className="text-muted font-13">總額</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Products;
