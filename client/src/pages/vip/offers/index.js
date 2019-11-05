import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Label,
  Table,
  Input,
  Form,
  FormGroup,
  Alert
} from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import classNames from "classnames";
import PageTitle from "../../../components/PageTitle";
import { getVipOffers } from "../../../redux/actions";
import Moment from "react-moment";
import Spinner from "../../../components/Spinner";
import PropTypes from "prop-types";

const VipOfferHome = ({ getVipOffers, records, loading, error }) => {
  const [arrangedData, setArrangedData] = useState([]);

  const mainTitle = "方案列表";
  useEffect(() => {
    getVipOffers();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

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

  //#
  //a.id,a.type,a.title, a.content,a.cost, a.game_id,a.create_time,a.status, a.offer_id,a.admin_uid, a.update_time, g.name as game_name
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "offer_id",
      text: "方案 ID",
      sort: true
    },

    {
      dataField: "game_name",
      text: "遊戲"
    },

    {
      dataField: "title",
      text: "方案名稱"
    },
    {
      dataField: "create_time",
      text: "建立日期",
      sort: true,
      formatter: (cellContent, row) => {
        return <Moment format="YYYY-MM-DD">{row.update_time}</Moment>;
      }
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Link
              to={`/offline/gov_letter/edit/${row.id}`}
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
          { label: mainTitle, path: "/vip/offers/offer_list", active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col sm={4}>
          <Link
            to="/vip/offers/add_offer"
            className="btn btn-rounded btn-danger mb-3"
          >
            <i className="mdi mdi-plus-circle mr-2" /> 新增方案
          </Link>
        </Col>
        <Col md={8} sm={8}>
          <Form inline className="mb-2 float-right"></Form>
        </Col>
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

VipOfferHome.propTypes = {
  getVipOffers: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  records: state.VipOffers.records,
  loading: state.VipOffers.loading,
  error: state.VipOffers.error
});

export default connect(
  mapStateToProps,
  { getVipOffers }
)(VipOfferHome);
