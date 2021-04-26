import LoaderProgressBar from "../../../components/LoaderProgressBar";
import React, { useEffect, useState } from "react";

const testProgressbar = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let timerId = setInterval(() => {
      setProgressValue(progressValue + 10);
    }, 3000);
    console.log("useEffect timerId", timerId);
    return () => clearInterval(timerId);
  }, [progressValue]);

  return (
    <div>
      <LoaderProgressBar value={progressValue} />
    </div>
  );
};

export default testProgressbar;
