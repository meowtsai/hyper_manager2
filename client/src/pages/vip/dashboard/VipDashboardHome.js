import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import PageTitle from "../../../components/PageTitle";
import { Row, Col } from "reactstrap";
import BarChart from "./BarChart";
import Products from "./Products";
import TopBuyers from "./TopBuyers";
import PropTypes from "prop-types";
import { getVipDashboardData } from "../../../redux/actions";

const VipDashboardHome = ({ getVipDashboardData, data }) => {
  const mainTitle = "VIP Dashboard";
  const [rangeTitle, setRangeTitle] = useState("服務開始至今");

  useEffect(() => {
    getVipDashboardData();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  const refreshData = (opt) => {
    //console.log("refreshData", opt);
    getVipDashboardData(opt);
    setRangeTitle("過去" + opt.value + "日");
  };
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
      <Row>
        <Col xl={3}>
          <TopBuyers
            data={data.top_buyers}
            refreshData={refreshData}
            title={rangeTitle}
          />
        </Col>
        <Col>
          <Products
            data={data.product_selling_data}
            refreshData={refreshData}
            title={rangeTitle}
          />
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
