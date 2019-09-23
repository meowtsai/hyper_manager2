import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { getOverview } from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";

const ServiceOverview = ({
  getOverview,
  ovAllocate,
  ovToday,
  ovTotal,
  loading,
  error
}) => {
  const mainTitle = "客服案件總覽";
  const mainPath = "/service";

  useEffect(() => {
    getOverview();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "客服", path: mainPath, active: false },
          { label: mainTitle, path: mainPath, active: true }
        ]}
        title={mainTitle}
      />
      <Row className="mb-2">
        <Col lg={3}>
          {ovToday && (
            <Card>
              <CardBody>
                <h4 className="header-title">本日案件</h4>
                <p className="text-muted font-14 mb-4">
                  本日 <code>新增</code> 案件。
                </p>

                <Table className="mb-0" bordered size="sm">
                  <tbody>
                    <tr>
                      <th>新增案件</th>
                      <td>{ovToday.total}</td>
                    </tr>
                    <tr>
                      <th>未回覆案件</th>
                      <td>{ovToday.status_new}</td>
                    </tr>
                    <tr>
                      <th>等待中案件</th>
                      <td>{ovToday.status_process}</td>
                    </tr>
                    <tr>
                      <th>結案</th>
                      <td>{ovToday.status_done}</td>
                    </tr>
                    <tr>
                      <th>預約結案</th>
                      <td>{ovToday.status_tobeclosed}</td>
                    </tr>
                    <tr>
                      <th>合計</th>
                      <td>{ovToday.total}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
        <Col lg={3}>
          {ovTotal && (
            <Card>
              <CardBody>
                <h4 className="header-title">所有案件</h4>
                <p className="text-muted font-14 mb-4">
                  至今 <code>所有</code> 案件。
                </p>

                <Table className="mb-0" bordered size="sm">
                  <tbody>
                    <tr>
                      <th>未回覆案件</th>
                      <td>{ovTotal.status_new}</td>
                    </tr>
                    <tr>
                      <th>等待中案件</th>
                      <td>{ovTotal.status_process}</td>
                    </tr>
                    <tr>
                      <th>結案</th>
                      <td>{ovTotal.status_done}</td>
                    </tr>
                    <tr>
                      <th>預約結案</th>
                      <td>{ovTotal.status_tobeclosed}</td>
                    </tr>
                    <tr>
                      <th>隱藏</th>
                      <td>{ovTotal.status_hidden}</td>
                    </tr>
                    <tr>
                      <th>合計</th>
                      <td>{ovTotal.total}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={9}>
          {ovAllocate && (
            <Card>
              <CardBody>
                <h4 className="header-title">後送案件</h4>
                <p className="text-muted font-14 mb-4">
                  目前 <code>後送</code> 案件。
                </p>

                <Table className="mb-0" bordered size="sm">
                  <tbody>
                    <tr>
                      <th className="text-nowrap">後送中</th>
                      <td>
                        {ovAllocate
                          .filter(item => item.allocate_status === "1")
                          .map(member => (
                            <span className="p-2">
                              {member.name}:{member.cnt}{" "}
                            </span>
                          ))}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-nowrap">完成</th>
                      <td>
                        {ovAllocate
                          .filter(
                            item =>
                              item.allocate_status === "2" &&
                              item.role === "cs_master"
                          )
                          .map(member => (
                            <span className="p-2">
                              {member.name}:{member.cnt}{" "}
                            </span>
                          ))}

                        <span className="p-2">
                          蟻力群組:
                          {ovAllocate
                            .filter(
                              item =>
                                item.allocate_status === "2" &&
                                item.role === "ants"
                            )
                            .reduce((acc, curr) => acc + parseInt(curr.cnt), 0)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={9}></Col>
      </Row>
    </Fragment>
  );
};

ServiceOverview.propTypes = {
  getOverview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ovToday: state.Service.ovToday,
  ovTotal: state.Service.ovTotal,
  ovAllocate: state.Service.ovAllocate,
  loading: state.Service.loading,
  error: state.Service.error
});

export default connect(
  mapStateToProps,
  { getOverview }
)(ServiceOverview);
