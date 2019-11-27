import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
const AllocateStatusBadge = ({ status_code }) => {
  const colorKeyObject = {
    0: {
      name: "Secondary",
      color: "secondary",
      text: "後送初始"
    },
    1: {
      name: "Warning",
      color: "warning",
      text: "專員處理中"
    },
    2: {
      name: "Info",
      color: "info",
      text: "原廠查詢中"
    },
    3: {
      name: "Danger",
      color: "danger",
      text: "後送條件不足"
    },
    4: {
      name: "Success",
      color: "success",
      text: "後送處理完成"
    },
    99: {
      name: "Secondary",
      color: "Secondary",
      text: "補充說明"
    }
  };

  return (
    <Badge color={colorKeyObject[status_code].color} className="mr-1">
      {colorKeyObject[status_code].text}
    </Badge>
  );
};

AllocateStatusBadge.propTypes = {
  status_code: PropTypes.number.isRequired
};

export default AllocateStatusBadge;
