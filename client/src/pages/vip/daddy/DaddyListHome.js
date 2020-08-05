import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
} from "reactstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import classNames from "classnames";
import axios from "axios";
import LoaderWidget from "../../../components/Loader";
const DaddyListHome = () => {
  const [daddyList, setDaddyList] = useState([]);
  const [mappingReports, setMappingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios("/api/daddy/list");
        setLoading(false);
        setMappingReports(result.data.reports || []);
        setDaddyList(result.data.list || []);
      } catch (error) {
        setLoading(false);
        setError("您沒有相關權限");
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state
  if (loading) return <LoaderWidget />;
  if (error) {
    return (
      <Alert color="danger" isOpen={error ? true : false}>
        <div>{error}</div>
      </Alert>
    );
  }
  const expandRow = {
    showExpandColumn: true,
    expandByColumnOnly: true,

    renderer: (row) => {
      const whaleReports = mappingReports.filter(
        (report) => report.whale_id === row.whale_id
      );

      return (
        <Fragment>
          {whaleReports.map((report) => (
            <p className="m-0  align-middle font-12">
              <Link
                to={`/vip/wire_report/edit/${report.report_id}`}
                className="small"
              >
                {report.report_id}
              </Link>
              <br />
              <small className="mr-2">
                <b>角色:</b> {report.char_name} (
                <span className="text-mute">{report.role_id}</span>)
              </small>
              <small>
                <b>遊戲:</b>{" "}
                {report.game_id === "g66naxx2tw" ? "明日之後" : "第五人格"}{" "}
              </small>
              <small className="mr-2">
                <b>金額:</b> {report.wire_amount}{" "}
              </small>
              <small className="mr-2">
                <b>時間:</b>
                <Moment className="Source Title" format="YYYY-MM-DD HH:mm:ss">
                  {report.wire_time}
                </Moment>
              </small>
            </p>
          ))}
        </Fragment>
      );
    },
  };

  const ReportsColumn = (cell, row, rowIndex, extraData) => {
    //-whale_id                             | report_id           | game_id    | char_name          | wire_amount | wire_time

    const whaleReports = mappingReports.filter(
      (report) => report.whale_id === row.whale_id
    );

    const totalSpend = whaleReports.reduce((prev, curr) => {
      return prev + curr.wire_amount;
    }, 0);

    return (
      <Fragment>
        共{whaleReports.length} 筆訂單, {totalSpend} 儲值金額
      </Fragment>
    );
  };

  const columns = [
    {
      dataField: "wire_name",
      text: "匯款名",
      sort: true,

      classes: "table-user",
    },
    {
      dataField: "phone",
      text: "手機",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "detail",
      isDummyField: true,
      text: "訂單明細",
      formatter: ReportsColumn,
      sort: false,
    },
    {
      dataField: "address",
      text: "地址",
      sort: false,
    },
    {
      dataField: "action",
      isDummyColumn: true,
      text: "Action",
      sort: false,
      classes: "table-action",
    },
  ];
  const paginationOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    withFirstAndLast: false,
    showTotal: true,
    sizePerPageList: [
      {
        text: "50",
        value: 50,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "10",
        value: 10,
      },
    ],
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip", active: false },
          { label: "大戶", path: "/vip/daddy", active: true },
        ]}
        title={"VIP - 大戶列表"}
      />
      <Row className="mb-2">
        <Col lg={6}> </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm={4}>
                  <Button color="danger" className="mb-2">
                    <i className="mdi mdi-plus-circle mr-2"></i> Add Customer
                  </Button>
                </Col>

                <Col sm={8}>
                  <div className="text-sm-right">
                    <Button color="success" className="mb-2 mr-1">
                      <i className="mdi mdi-settings"></i>
                    </Button>

                    <Button color="light" className="mb-2 mr-1">
                      Import
                    </Button>

                    <Button color="light" className="mb-2 mr-1">
                      Export
                    </Button>
                  </div>
                </Col>
              </Row>

              <DaddyTable
                data={daddyList}
                columns={columns}
                paginationOptions={paginationOptions}
                expandRow={expandRow}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DaddyListHome;

// customer table
const DaddyTable = (mainProps) => {
  const customTotal = (from, to, size) => (
    <label className="react-bootstrap-table-pagination-total ml-2">
      Showing {from} to {to} of {size}
    </label>
  );

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <Fragment>
      <label className="d-inline mr-1">Display</label>
      <UncontrolledDropdown className="d-inline">
        <DropdownToggle
          caret
          tag="button"
          type="button"
          className="btn btn-outline-secondary btn-sm"
        >
          {currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>
          {options.map((option, idx) => (
            <DropdownItem
              key={idx}
              type="button"
              className={classNames({
                active: currSizePerPage + "" === option.page + "",
              })}
              onClick={() => onSizePerPageChange(option.page)}
            >
              {option.text}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
      <label className="d-inline ml-1">customers</label>
    </Fragment>
  );

  const { SearchBar } = Search;

  return (
    <PaginationProvider
      bootstrap4
      pagination={paginationFactory({
        ...mainProps.paginationOptions,
        paginationTotalRenderer: customTotal,
        custom: true,
        sizePerPageRenderer: sizePerPageRenderer,
      })}
      keyField="whale_id"
      data={mainProps.data}
      columns={mainProps.columns}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField="whale_id"
          data={mainProps.data}
          columns={mainProps.columns}
          search
        >
          {(props) => (
            <React.Fragment>
              <Row className="mt-2">
                <Col md={6}>
                  <SizePerPageDropdownStandalone {...paginationProps} />
                </Col>
                <Col md={6} className="text-sm-right mt-2 mt-sm-0">
                  Search: <SearchBar {...props.searchProps} />
                </Col>
              </Row>

              <BootstrapTable
                {...props.baseProps}
                striped
                bordered={false}
                wrapperClasses="table-responsive"
                {...paginationTableProps}
                expandRow={mainProps.expandRow}
              />
              <Row>
                <Col>
                  <PaginationTotalStandalone
                    {...paginationProps}
                    dataSize={mainProps.data.length}
                  />
                </Col>
                <Col className="react-bootstrap-table-pagination-list">
                  <PaginationListStandalone {...paginationProps} />
                </Col>
              </Row>
            </React.Fragment>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
