import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTestData } from "../../../redux/actions";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";

const TestPage = ({ getTestData, records }) => {
  const [selected, setSelected] = useState({});
  console.log("selected", selected);
  useEffect(() => {
    getTestData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (records !== undefined) {
      console.log(records);
      //   if (records.length > 0) {
      const record = records.filter(item => item.id === 308350)[0];
      setSelected(record);
    }
  }, [records]);

  //   var start = moment([2007, 0, 5]);
  // var end   = moment([2007, 0, 10]);
  // end.from(start);       // "in 5 days"
  // end.from(start, true); // "5 days"

  return (
    <div>
      TestPage last_replied_time:
      <Moment format="YYYY-MM-DD HH:mm:ss">
        {selected.last_replied_time}
      </Moment>{" "}
      <br />
      create_time:
      <Moment format="YYYY-MM-DD HH:mm:ss">{selected.create_time}</Moment>{" "}
      <br />
      now:
      <Moment format="YYYY-MM-DD HH:mm:ss"></Moment> <br />
      {moment().from(moment(selected.last_replied_time))}
    </div>
  );
};

TestPage.propTypes = {};

const mapStateToProps = state => ({
  records: state.Service.test_list,
  loading: state.Service.loading,
  error: state.ServiceAllocate.error
});

export default connect(
  mapStateToProps,
  { getTestData }
)(TestPage);
