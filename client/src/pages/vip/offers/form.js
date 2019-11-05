import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
import { getGames } from "../../../redux/actions";

// editVipOfferRecord,
//   getCurrentVipOfferRecord
const VipOfferForm = ({ getGames, match }) => {
  const record_id = match.params.record_id ? match.params.record_id : null;
  const mainTitle = "VIP 方案";
  const act_title = record_id ? "編輯" : "新增";

  useEffect(() => {
    //console.log("record_id", record_id);
    if (record_id) {
      //getCurrentRecord("govletter", record_id, history);
    }
    getGames();
    //getCSMaster();

    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip/offers", active: false },
          { label: mainTitle, path: "/vip/offers/offer_list", active: true },
          {
            label: act_title,
            path: "/vip/offers/add_offer",
            active: true
          }
        ]}
        title={`${act_title}${mainTitle}`}
      />

      <Row className="mb-2">
        <Col lg={4} />
      </Row>
    </Fragment>
  );
};

VipOfferForm.propTypes = {
  games: PropTypes.array
};

const mapStateToProps = state => ({
  games: state.Games.list,
  error: state.VipOffers.error,
  loading: state.VipOffers.loading
});
export default connect(
  mapStateToProps,
  {
    getGames
  }
)(VipOfferForm);

//方案id
//遊戲id
//方案標題
//類型
//描述
//金額
//點數
