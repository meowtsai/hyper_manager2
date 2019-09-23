import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PageTitle from "../../../components/PageTitle";
import { getAllocateData } from "../../../redux/actions";
import Moment from "react-moment";
import Spinner from "../../../components/Spinner";
import PropTypes from "prop-types";

const AllocateListPage = ({ records, getAllocateData, loading, error }) => {
  const [arrangedData, setArrangedData] = useState([]);
  console.log("arrangedData", arrangedData);
  useEffect(() => {
    getAllocateData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedData(records);
  }, [records]);

  //#  	案件編號：點選案件編號可連結至案件檢視頁面
  // 問題類型：用戶所選擇的問題類型
  // 描述：客訴內容，是一個超連結可以連至到案件檢視頁面
  // 狀態：已處理、未處理、結案三種
  // 負責人：
  const columns = [
    {
      dataField: "id",
      text: "編號",
      sort: true
    },
    {
      dataField: "type",
      text: "問題類型",
      sort: true
    },

    {
      dataField: "content",
      text: "提問描述"
    },

    {
      dataField: "allocate_status",
      text: "後送狀態",
      sort: true
    },
    {
      dataField: "allocate_admin_name",
      text: "負責人",
      sort: true
    },
    {
      dataField: "allocate_date",
      text: "指派時間",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <Moment format="YYYY-MM-DD HH:mm:ss">{row.allocate_date}</Moment>
        );
      }
    }
  ];
  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: "/service/", active: false },
          { label: "派單系統", path: "/service/allocate/list", active: true }
        ]}
        title={"派單系統 - 待處理列表"}
      />
      <Row className="mb-2">
        <Col lg={4} />
      </Row>
      <Row className="mb-2">
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

AllocateListPage.propTypes = {
  getAllocateData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  records: state.ServiceAllocate.list,
  loading: state.ServiceAllocate.loading,
  error: state.ServiceAllocate.error
});

export default connect(
  mapStateToProps,
  { getAllocateData }
)(AllocateListPage);
