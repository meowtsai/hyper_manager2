import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import { getServiceStatistics } from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
const ServiceStatistics = ({
  getServiceStatistics,
  antsHandleData,
  csHandleData,
  qCountData,
  csHandleAllocationData,
  antsHandleAllocationData,
  question_type,
  loading,
  allgames,
  error,
  user
}) => {
  const mainTitle = "客服案件統計";
  const mainPath = "/service";

  const [gameId, setGameId] = useState("g78naxx2hmt");
  const [gameName, setGameName] = useState("決戰平安京");
  const [yyyymm, setYyyymm] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`
  );

  const [rptCondition, setRptCondition] = useState("all");

  const [activeTab, setActiveTab] = useState("1");

  const tabContents = [
    {
      id: "1",
      title: "提問單",
      icon: "mdi mdi-home-variant"
    },
    {
      id: "2",
      title: "後送案件",
      icon: "mdi mdi-account-circle"
    }
  ];

  useEffect(() => {
    getServiceStatistics(yyyymm);
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  const onSearchClick = () => {
    getServiceStatistics(yyyymm);
  };

  const onGameIDChange = gameid => {
    if (gameid !== "" && gameid !== undefined && gameid !== null) {
      setGameId(gameid);
      setGameName(allgames.filter(g => g.game_id === gameid)[0].game_name);
    }
  };

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  let mmGroup = [];
  const dd = new Date();
  const mIndex = dd.getMonth();
  const yyyy = dd.getFullYear();

  // const mIndex = 0;
  // const yyyy = 2020;

  mmGroup.push(`${yyyy}-${(mIndex + 1).toString().padStart(2, "0")}`);

  for (let index = 0; index < 5; index++) {
    let curY = yyyy;
    let curM = mIndex - index;
    if (curM <= 0) {
      curM = 12 - index;
      curY = yyyy - 1;
    }

    mmGroup.push(`${curY}-${curM.toString().padStart(2, "0")}`);
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
      <Row className="mt-2">
        <Col md={6} sm={6}>
          {allgames.length > 0 && (
            <Form inline className="mb-2">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label htmlFor="selGameId" className="mr-sm-2">
                  遊戲:
                </Label>
                <Input
                  type="select"
                  name="selGameId"
                  id="selGameId"
                  className="custom-select"
                  value={gameId}
                  onChange={e => onGameIDChange(e.target.value)}
                >
                  <option value="">選擇遊戲...</option>

                  {allgames.map(mItem => (
                    <option key={`game-` + mItem.game_id} value={mItem.game_id}>
                      {mItem.game_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <ButtonGroup className="btn-group mb-2 ml-3">
                <Button
                  onClick={e => setRptCondition("all")}
                  color={rptCondition === "all" ? "danger" : "light"}
                >
                  by 日期 + 人員
                </Button>
                <Button
                  onClick={e => setRptCondition("date")}
                  color={rptCondition === "date" ? "danger" : "light"}
                >
                  by 日期
                </Button>
                <Button
                  onClick={e => setRptCondition("user")}
                  color={rptCondition === "user" ? "danger" : "light"}
                >
                  by 人員
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Col>
        <Col md={6} sm={6}>
          <Form inline className="mb-2  float-right">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="selMonth" className="mr-sm-2">
                月份:
              </Label>
              <Input
                type="select"
                name="selMonth"
                id="selMonth"
                className="custom-select"
                value={yyyymm}
                onChange={e => setYyyymm(e.target.value)}
              >
                {mmGroup.map(mItem => (
                  <option key={`yymm-` + mItem} value={mItem}>
                    {mItem}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <Button
              color="primary"
              className="mb-2 mr-1"
              onClick={onSearchClick}
            >
              搜尋
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Nav tabs className="nav-bordered">
            {tabContents.map((tab, index) => {
              return (
                <NavItem key={`tab_${index}`}>
                  <NavLink
                    href="#"
                    className={classnames({
                      active: activeTab === tab.id
                    })}
                    onClick={() => {
                      toggle(tab.id);
                    }}
                  >
                    <i
                      className={classnames(
                        tab.icon,
                        "d-lg-none",
                        "d-block",
                        "mr-1"
                      )}
                    ></i>
                    <span className="d-none d-lg-block">{tab.title}</span>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
      </Row>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="mb-2">
            <Col lg={4}>
              {qCountData.length > 0 && (
                <CSVLink
                  data={qCountData.filter(item => item.game_id === gameId)}
                  headers={[
                    { label: "日期", key: "時間" },
                    { label: "數量", key: "cnt" },
                    ...Object.keys(question_type).map(t => ({
                      label: question_type[t],
                      key: question_type[t]
                    }))
                  ]}
                  filename={
                    gameName +
                    yyyymm +
                    "提問單進件量" +
                    new Date().getTime() +
                    ".csv"
                  }
                >
                  下載 csv檔案
                </CSVLink>
              )}

              {qCountData && (
                <Card>
                  <CardBody>
                    <h4 className="header-title">{gameName}-提問單進件量</h4>
                    <Table className="mb-0" bordered size="sm">
                      <thead>
                        <tr>
                          <th>日期</th>
                          <th>數量</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qCountData
                          .filter(item => item.game_id === gameId)
                          .map((item, index) => (
                            <tr key={`q_${index}`}>
                              <th>{item.時間}</th>
                              <td>{item.cnt}</td>
                            </tr>
                          ))}

                        <tr>
                          <th>總計</th>
                          <td>
                            {qCountData
                              .filter(item => item.game_id === gameId)
                              .reduce((a, b) => a + b.cnt, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </Col>
            <Col lg={4}>
              {statTable(
                antsHandleData,
                `${gameName}-蟻力提問單處理量`,
                gameId,
                yyyymm,
                rptCondition,
                question_type
              )}
            </Col>
            <Col lg={4}>
              {statTable(
                csHandleData,
                `${gameName}-客服提問單處理量`,
                gameId,
                yyyymm,
                rptCondition,
                question_type
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="mb-2">
            <Col lg={4}>
              {statTable(
                antsHandleAllocationData,
                `${gameName}-蟻力後送案件量`,
                gameId,
                yyyymm,
                rptCondition,
                {}
              )}
            </Col>
            {(user.role === "admin" || user.role === "pm") && (
              <Col lg={4}>
                {statTable(
                  csHandleAllocationData,
                  `${gameName}-客服後送處理量`,
                  gameId,
                  yyyymm,
                  rptCondition,
                  {}
                )}
              </Col>
            )}
          </Row>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

ServiceStatistics.propTypes = {
  getServiceStatistics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  antsHandleData: state.Service.antsHandleData,
  csHandleData: state.Service.csHandleData,
  qCountData: state.Service.qCountData,
  csHandleAllocationData: state.Service.csHandleAllocationData,
  antsHandleAllocationData: state.Service.antsHandleAllocationData,
  question_type: state.Service.question_type,
  allgames: state.Service.allgames,
  loading: state.Service.loading,
  error: state.Service.error,
  user: state.Auth.user
});

export default connect(mapStateToProps, { getServiceStatistics })(
  ServiceStatistics
);

const statTable = (
  statData,
  label,
  gameId,
  yyyymm,
  condition,
  question_type
) => {
  const dataRaw = statData
    .filter(d => d.game_id === gameId)
    .map(d => ({
      dt: d.時間,
      admin_name: d.admin_name,
      test_cnt: d.test_cnt,
      cnt: d.cnt,
      ...d
    }));

  let itemSet = [];
  let cond =
    condition === "all" ? "all" : condition === "date" ? "dt" : "admin_name";
  //let cond = condition ======"date" ? "dt" : "admin_name";
  const condLabel = condition === "all" ? "日期" : "人員";

  const data =
    cond === "all"
      ? dataRaw
      : dataRaw.reduce(function(prev, curr) {
          if (itemSet.indexOf(curr[cond]) < 0) {
            itemSet.push(curr[cond]);
            return [...prev, { ...curr }];
          } else {
            prev = prev.map(user => {
              if (user[cond] === curr[cond]) {
                return {
                  [cond]: user[cond],
                  test_cnt:
                    Number.parseInt(user.test_cnt) +
                    Number.parseInt(curr.test_cnt),
                  cnt: Number.parseInt(user.cnt) + Number.parseInt(curr.cnt)
                };
              } else {
                return user;
              }
            });
            return prev;
          }
        }, []);

  return (
    <Fragment>
      <CSVLink
        data={dataRaw}
        headers={[
          { label: "日期", key: "dt" },
          { label: "人員", key: "admin_name" },
          { label: "數量", key: "cnt" },
          { label: "測試", key: "test_cnt" },
          ...Object.keys(question_type).map(t => ({
            label: question_type[t],
            key: question_type[t]
          }))
        ]}
        filename={label + yyyymm + new Date().getTime() + ".csv"}
      >
        下載 csv檔案
      </CSVLink>

      <Card>
        <CardBody>
          <h4 className="header-title">{label} </h4>
          <Table className="mb-0" bordered size="sm">
            <thead>
              <tr>
                {condition === "all" ? (
                  <Fragment>
                    <th>日期</th> <th>人員</th>
                  </Fragment>
                ) : (
                  <th>{condLabel}</th>
                )}
                <th>數量</th>
                {Object.keys(question_type).length !== 0 && <th>測試</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`q_${index}`}>
                  {condition === "all" ? (
                    <Fragment>
                      <th>{item.dt}</th> <th>{item.admin_name}</th>
                    </Fragment>
                  ) : (
                    <th>{item[cond]}</th>
                  )}
                  <td>{item.cnt}</td>
                  {Object.keys(question_type).length !== 0 && (
                    <td>{item.test_cnt}</td>
                  )}
                </tr>
              ))}

              <tr>
                {condition === "all" ? (
                  <Fragment>
                    <th colSpan="2">總計</th>
                  </Fragment>
                ) : (
                  <th>總計</th>
                )}

                <td>{data.reduce((a, b) => a + Number.parseInt(b.cnt), 0)}</td>
                {Object.keys(question_type).length !== 0 && (
                  <td>
                    {data.reduce((a, b) => a + Number.parseInt(b.test_cnt), 0)}
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
};
