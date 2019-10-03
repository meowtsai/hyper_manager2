import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  getAllocateById,
  postAllocation,
  putAllocation
} from "../../../redux/actions";
// import Moment from "react-moment";
// import moment from "moment";
import AllocationList from "./AllocationList";
//import PropTypes from "prop-types";

const TestPage = ({
  getAllocateById,
  putAllocation,
  allocation,
  allocation_logs,
  user
}) => {
  useEffect(() => {
    //getTestData();
    getAllocateById(312212);
    // eslint-disable-next-line
  }, []);

  //   var start = moment([2007, 0, 5]);
  // var end   = moment([2007, 0, 10]);
  // end.from(start);       // "in 5 days"
  // end.from(start, true); // "5 days"

  return (
    <Fragment>
      <AllocationList
        q_id={312212}
        allocation={allocation}
        allocation_logs={allocation_logs}
        postAllocation={postAllocation}
        putAllocation={putAllocation}
        user={user}
      />
    </Fragment>
  );
};

TestPage.propTypes = {};

const mapStateToProps = state => ({
  allocation: state.ServiceAllocate.allocation,
  allocation_logs: state.ServiceAllocate.allocation_logs,
  loading: state.ServiceAllocate.loading,
  error: state.ServiceAllocate.error,
  updateOKMessage: state.ServiceAllocate.updateOKMessage,
  user: state.Auth.user
});

export default connect(
  mapStateToProps,
  { getAllocateById, putAllocation }
)(TestPage);
