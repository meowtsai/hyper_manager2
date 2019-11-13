import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle";

import { Row, Col } from "reactstrap";

const ServerHome = props => {
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[{ label: "伺服器", path: "/servers", active: false }]}
        title={"伺服器列表"}
      />
      <Row className="mb-2">
        <Col lg={4} />
      </Row>
    </Fragment>
  );
};

ServerHome.propTypes = {};

export default ServerHome;
