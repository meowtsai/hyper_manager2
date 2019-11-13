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
  Button
} from "reactstrap";
import { getServiceStatistics } from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
const ServiceStatistics = ({
  getServiceStatistics,
  antsHandleData,
  csHandleData,
  qCountData,
  loading,
  allgames,
  error
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
      <Row></Row>
      <Row className="mb-2">
        <Col lg={3}>
          {qCountData.length > 0 && (
            <CSVLink
              data={qCountData.filter(item => item.game_id === gameId)}
              headers={[
                { label: "日期", key: "時間" },
                { label: "數量", key: "cnt" }
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
        <Col lg={3}>
          {antsHandleData.length > 0 && (
            <CSVLink
              data={antsHandleData.filter(item => item.game_id === gameId)}
              headers={[
                { label: "日期", key: "時間" },
                { label: "數量", key: "cnt" }
              ]}
              filename={
                gameName +
                yyyymm +
                "蟻力提問單處理量" +
                new Date().getTime() +
                ".csv"
              }
            >
              下載 csv檔案
            </CSVLink>
          )}
          {antsHandleData && (
            <Card>
              <CardBody>
                <h4 className="header-title">{gameName}-蟻力提問單處理量</h4>

                <Table className="mb-0" bordered size="sm">
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>數量</th>
                      <th>測試</th>
                    </tr>
                  </thead>
                  <tbody>
                    {antsHandleData
                      .filter(item => item.game_id === gameId)
                      .map((item, index) => (
                        <tr key={`q_${index}`}>
                          <th>{item.時間}</th>
                          <td>{item.cnt}</td>
                          <td>{item.test_cnt}</td>
                        </tr>
                      ))}

                    <tr>
                      <th>總計</th>
                      <td>
                        {antsHandleData
                          .filter(item => item.game_id === gameId)
                          .reduce((a, b) => a + Number.parseInt(b.cnt), 0)}
                      </td>
                      <td>
                        {antsHandleData
                          .filter(item => item.game_id === gameId)
                          .reduce((a, b) => a + Number.parseInt(b.test_cnt), 0)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
        <Col lg={3}>
          {antsHandleData.length > 0 && (
            <CSVLink
              data={antsHandleData.filter(item => item.game_id === gameId)}
              headers={[
                { label: "日期", key: "時間" },
                { label: "數量", key: "cnt" }
              ]}
              filename={
                gameName +
                yyyymm +
                "蟻力提問單處理量" +
                new Date().getTime() +
                ".csv"
              }
            >
              下載 csv檔案
            </CSVLink>
          )}
          {csHandleData && (
            <Card>
              <CardBody>
                <h4 className="header-title">{gameName}-客服提問單處理量</h4>

                <Table className="mb-0" bordered size="sm">
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>數量</th>
                      <th>測試</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csHandleData
                      .filter(item => item.game_id === gameId)
                      .map((item, index) => (
                        <tr key={`q_${index}`}>
                          <th>{item.時間}</th>
                          <td>{item.cnt}</td>
                          <td>{item.test_cnt}</td>
                        </tr>
                      ))}

                    <tr>
                      <th>總計</th>
                      <td>
                        {csHandleData
                          .filter(item => item.game_id === gameId)
                          .reduce((a, b) => a + Number.parseInt(b.cnt), 0)}
                      </td>
                      <td>
                        {csHandleData
                          .filter(item => item.game_id === gameId)
                          .reduce((a, b) => a + Number.parseInt(b.test_cnt), 0)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
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
  allgames: state.Service.allgames,
  loading: state.Service.loading,
  error: state.Service.error
});

export default connect(
  mapStateToProps,
  { getServiceStatistics }
)(ServiceStatistics);
