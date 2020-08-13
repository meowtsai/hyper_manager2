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
import { CSVLink } from "react-csv";
import Moment from "react-moment";
import moment from "moment";
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
import { vipRankingOptions } from "../whale_users/whaleOptConfig";
const DaddyListHome = () => {
  const [daddyList, setDaddyList] = useState([]);
  //const [mappingReports, setMappingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios("/api/daddy/list");
        setLoading(false);
        //setMappingReports(result.data.reports || []);
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
      const whaleReports = [];

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

  // const ReportsColumn = (cell, row, rowIndex, extraData) => {
  //   //-whale_id                             | report_id           | game_id    | char_name          | wire_amount | wire_time

  //   const whaleReports = mappingReports.filter(
  //     (report) => report.whale_id === row.whale_id
  //   );

  //   const totalSpend = whaleReports.reduce((prev, curr) => {
  //     return prev + curr.wire_amount;
  //   }, 0);

  //   return (
  //     <Fragment>
  //       共{whaleReports.length} 筆訂單, {totalSpend} 儲值金額
  //     </Fragment>
  //   );
  // };

  const genderOptions = {
    m: "男性",
    f: "女性",
    x: "中性",
  };

  const RoleColumn = (cell, row, rowIndex, extraData) => {
    const opt = vipRankingOptions.filter(
      (opt) => opt.value === row.vip_ranking
    )[0];
    const ranking_badge = opt ? (
      <span className={`mr-1 badge badge-${opt.color}-lighten badge-pill`}>
        {opt.label || ""}
      </span>
    ) : (
      ""
    );
    return (
      <div>
        <strong style={{ color: "blue" }}>{row.char_name} </strong>
        {ranking_badge}
        <br />
        {opt ? (
          <Link to={`/vip/user_dashboard/${row.game_id}?user=${row.role_id}`}>
            {row.role_id}
          </Link>
        ) : (
          row.role_id
        )}
      </div>
    );
  };

  const columns = [
    {
      dataField: "game_id",
      text: "遊戲",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <small>
            {cellContent === "g66naxx2tw" ? "明日之後" : "第五人格"}
          </small>
        );
      },
      classes: "table-user",
    },
    {
      dataField: "role_id",
      text: "角色",
      sort: true,
      formatter: RoleColumn,
      classes: "table-user",
    },

    {
      dataField: "char_name",
      text: "角色",
      hidden: true,
    },
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
      text: "購買資訊",
      formatter: (cellContent, row) => {
        return (
          <small>
            最近一次下單時間：
            <Moment format="YYYY-MM-DD HH:mm">{row.last_active_at}</Moment>
            (約
            <Moment diff={row.last_active_at} unit="days" decimal={false}>
              {new Date()}
            </Moment>{" "}
            天前 )
            <br />
            訂單總數：{row.total_orders_num} <br />
            訂單總金額：{row.total_orders_amount}
          </small>
        );
      },
      sort: false,
    },
    {
      dataField: "area",
      text: "居住地區",
      sort: false,
    },
    {
      dataField: "gender",
      text: "性別",
      formatter: (cellContent, row) => {
        return <span>{genderOptions[cellContent]}</span>;
      },
      sort: false,
    },
    {
      dataField: "birthday",
      text: "生日",
      formatter: (cellContent, row) => {
        return (
          <small>
            <Moment format="YYYY-MM-DD">{cellContent}</Moment>(約
            <Moment diff={cellContent} unit="years" decimal={false}>
              {new Date()}
            </Moment>{" "}
            歲 )
          </small>
        );
      },
      sort: false,
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
  const fileName = `VIP儲值服務用戶_${moment().format(
    "YYYY-MM-DD"
  )}${Date.now()}`;
  const csvHeaders = [
    { label: "遊戲id", key: "game_id" },
    { label: "伺服器", key: "server_id" },
    { label: "角色ID", key: "role_id" },
    { label: "角色名稱", key: "char_name" },
    { label: "VIP等級", key: "vip_ranking" },
    { label: "匯款戶名", key: "wire_name" },
    { label: "最近下單日", key: "last_active_at" },
    { label: "總金額", key: "total_orders_amount" },
    { label: "性別", key: "gender" },
    { label: "生日", key: "birthday" },
    { label: "EMail", key: "email" },
    { label: "手機", key: "phone" },
  ];

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip", active: false },
          { label: "VIP儲值服務用戶", path: "/vip/daddy", active: true },
        ]}
        title={"VIP - VIP儲值服務用戶"}
      />
      <Row className="mb-2">
        <Col lg={6}> </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* <Row>
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
              </Row> */}

              <CSVLink
                data={daddyList.map((item) => ({
                  ...item,
                  last_active_at: moment(item.last_active_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  birthday: moment(item.birthday).format("YYYY-MM-DD"),
                  gender: genderOptions[item.gender],
                  phone: `'${item.phone}`,
                }))}
                headers={csvHeaders}
                filename={fileName + ".csv"}
              >
                下載 csv檔案
              </CSVLink>

              <DaddyTable
                data={daddyList}
                columns={columns}
                paginationOptions={paginationOptions}
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
      {from} ~ {to} /共 {size} 筆
    </label>
  );

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <Fragment>
      <label className="d-inline mr-1">顯示</label>
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
      <label className="d-inline ml-1">用戶</label>
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
                  關鍵字搜尋: <SearchBar {...props.searchProps} />
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
