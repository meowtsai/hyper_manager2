import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Form, Alert } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import PageTitle from "../../../components/PageTitle";
import { getVipOrders } from "../../../redux/actions";
import Moment from "react-moment";
import moment from "moment";
import Spinner from "../../../components/Spinner";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

const VipOrdersHome = ({ getVipOrders, records, loading, error }) => {
  const [arrangedData, setArrangedData] = useState([]);

  const mainTitle = "VIP 訂單列表";
  useEffect(() => {
    getVipOrders();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      setArrangedData(records);
    }
  }, [records]);

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  if (error) {
    return (
      <Alert color="danger" isOpen={error ? true : false}>
        <div>{error}</div>
      </Alert>
    );
  }
  const reportStatusOptions = {
    "1": "初始",
    "2": "已核對",
    "4": "派寶完成"
  };

  //聯繫電話	EMAIL	方案ID	方案數量	方案總金額	開單時間	訂單編號	伺服器	角色GID	角色名稱	匯款銀行	匯款帳號後五碼	匯款戶名	匯款時間	匯款總金額	信用點	備註	獎勵發放	發票號碼
  //玩家建單日期時間	伺服器	角色ID	角色名稱	匯款銀行	玩家匯款資訊(帳號末五碼)	匯款戶名(本名或帳號都可)	匯款日期	匯款時間	訂單金額	發票日期	發票號碼	虛寶內容	後台建單訂單編號	派寶完成	備註	紀錄人員
  const fileName = `VIP訂單_${moment().format("YYYY-MM-DD")}${Date.now()}`;
  const csvHeaders = [
    { label: "玩家建單日期時間", key: "create_time" },
    { label: "伺服器", key: "server_name" },
    { label: "角色ID", key: "role_id" },
    { label: "角色名稱", key: "char_name" },

    { label: "匯款銀行", key: "bank_name" },
    { label: "玩家匯款資訊(帳號末五碼)", key: "wire_code" },
    { label: "匯款戶名(本名或帳號都可)", key: "wire_name" },
    { label: "匯款時間", key: "wire_time" },
    { label: "訂單金額", key: "wire_amount" },

    { label: "發票日期", key: "invoice_date" },
    { label: "發票號碼", key: "invoice_id" },
    { label: "虛寶內容", key: "credits" },
    { label: "訂單狀態", key: "report_status" },
    { label: "處理人員", key: "admin_name" }
  ];

  const columns = [
    {
      dataField: "report_id",
      text: "單號",
      sort: true
    },
    {
      dataField: "phone",
      text: "聯繫電話",
      sort: true
    },
    {
      dataField: "email",
      text: "EMAIL",
      sort: true
    },
    {
      dataField: "product_id",
      text: "方案ID",
      sort: true
    },
    {
      dataField: "qty",
      text: "方案數量",
      sort: true
    },
    {
      dataField: "game_name",
      text: "遊戲"
    },

    {
      dataField: "server_name",
      text: "伺服器"
    },
    {
      dataField: "create_time",
      text: "建立日期",
      sort: true,
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>;
      }
    },
    {
      dataField: "product_id",
      text: "信用點",
      formatter: (cellContent, row) => {
        let credits;
        credits = (row.gold + row.free_golds) * row.qty;
        return credits;
      }
    },
    {
      dataField: "note",
      text: "備註"
    },
    {
      dataField: "report_status",
      text: "狀態",
      formatter: (cellContent, row) => {
        return reportStatusOptions[cellContent];
      }
    },
    {
      dataField: "invoice_id",
      text: "發票號碼"
    },
    {
      dataField: "admin_name",
      text: "處理人"
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Link
              to={`/vip/wire_report/edit/${row.report_id}`}
              className="action-icon"
            >
              {" "}
              <i className="mdi mdi-square-edit-outline"></i>
            </Link>
          </React.Fragment>
        );
      }
    }
  ];

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip/offers", active: false },
          { label: mainTitle, path: "/vip/offers/order_list", active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col sm={4}></Col>
        <Col md={8} sm={8}>
          <Form inline className="mb-2 float-right"></Form>
        </Col>
      </Row>
      <Row className="mb-2">
        {arrangedData.length > 0 && (
          <CSVLink
            data={arrangedData.map(item => ({
              ...item,
              create_time: moment(item.create_time).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              credits: (item.gold + item.free_golds) * item.qty + " 信用點",
              report_status: reportStatusOptions[item.report_status],
              wire_time: moment(item.wire_time).format("YYYY-MM-DD HH:mm:ss")
            }))}
            headers={csvHeaders}
            filename={fileName + ".csv"}
          >
            下載 csv檔案
          </CSVLink>
        )}

        <Col lg={12}>
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={arrangedData}
                columns={columns}
                defaultSorted={[
                  {
                    dataField: "id",
                    order: "desc"
                  }
                ]}
                pagination={paginationFactory({ sizePerPage: 10 })}
                wrapperClasses="table-responsive"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

VipOrdersHome.propTypes = {
  getVipOrders: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  records: state.VipOffers.vip_orders_list,
  loading: state.VipOffers.loading,
  error: state.VipOffers.error
});

export default connect(mapStateToProps, { getVipOrders })(VipOrdersHome);
