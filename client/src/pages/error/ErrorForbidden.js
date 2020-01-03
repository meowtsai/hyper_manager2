// @flow
import React from "react";

import { Row, Col } from "reactstrap";

import notFoundImg from "../../assets/images/startman.svg";
import PageTitle from "../../components/PageTitle";

const ErrorForbidden = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Pages", path: "/pages/error-403" },
          { label: "403", path: "/pages/error-403", active: true }
        ]}
        title={"403 Error"}
      />

      <Row className="justify-content-center">
        <Col lg={4}>
          <div className="text-center">
            <img src={notFoundImg} height="90" alt="" />
            <h1 className="text-error mt-4">403</h1>
            <h4 className="text-uppercase text-danger mt-3">沒有權限</h4>
            <p className="text-muted mt-3">
              您沒有相關權限, 若需要開通請通知管理員
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ErrorForbidden;
