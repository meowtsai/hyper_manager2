import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
const GameStatusBadge = ({ status_code }) => {
  const colorKeyObject = {
    0: {
      name: "Danger",
      color: "danger",
      text: "關"
    },
    1: {
      name: "Success",
      color: "success",
      text: "開"
    },
    2: {
      name: "Warning",
      color: "warning",
      text: "內測"
    }
  };

  return (
    <Badge color={colorKeyObject[status_code].color} className="mr-1">
      {colorKeyObject[status_code].text}
    </Badge>
  );
};

GameStatusBadge.propTypes = {
  status_code: PropTypes.number.isRequired
};

export default GameStatusBadge;
