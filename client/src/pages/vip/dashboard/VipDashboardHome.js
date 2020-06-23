import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Row, Col } from "reactstrap";
import BarChart from "./BarChart";
import PropTypes from "prop-types";
import { getVipDashboardData } from "../../../redux/actions";

const VipDashboardHome = ({ getVipDashboardData, data }) => {
  const mainTitle = "VIP Dashboard";
  useEffect(() => {
    getVipDashboardData();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/dashboard", active: false },
          { label: mainTitle, path: "/vip/dashboard", active: true },
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col sm={12}>
          <BarChart data={data.past_month_data} />
        </Col>
      </Row>
    </Fragment>
  );
};

VipDashboardHome.propTypes = { getVipDashboardData: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  data: state.VipRpt.vip_dashboard_data,
  loading: state.VipRpt.loading,
  error: state.VipRpt.error,
});

export default connect(mapStateToProps, { getVipDashboardData })(
  VipDashboardHome
);
