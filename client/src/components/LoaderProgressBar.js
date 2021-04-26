import React from "react";
import { Progress } from "reactstrap";

/**
 * Renders the preloader
 */
const LoaderProgressBar = (props) => {
  console.log(props);
  return (
    <div className="preloader">
      <div className="status">
        <Progress color="success" value={props.value} />
      </div>
    </div>
  );
};

export default LoaderProgressBar;
