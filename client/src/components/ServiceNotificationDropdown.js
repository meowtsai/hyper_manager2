import React from "react";
import { Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ServiceNotificationDropdown = props => {
  return (
    <div className="mt-2">
      <Link to="/apps/email/inbox" className="text-secondary  mt-3">
        <i className="dripicons-star"></i>收藏
        <span className="badge badge-warning-lighten float-right">5</span>
      </Link>
    </div>
  );
};

ServiceNotificationDropdown.propTypes = {};

export default ServiceNotificationDropdown;
