import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { Row, Col, Table, Form, Label, FormGroup, Button } from "reactstrap";
import moment from "moment";
import HyperDatepicker from "../../../components/Datepicker";
import { getServiceStatisticsByHour } from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
const ServiceStatisticsByHour = ({
  getServiceStatisticsByHour,
  question_type,
  statReportData,
  statReplyData,
  loading,
  allgames,
  error,
  user
}) => {
  const mainTitle = "客服案件［時間別］統計";
  const mainPath = "/service";

  //const [gameId, setGameId] = useState("ALL");
  //const [gameName, setGameName] = useState("全部");
  //const [sDate, setSDate] = useState(new Date(moment().subtract(7, "days"))); //new Date()
  const [sDate, setSDate] = useState(new Date()); //
  //const [rptCondition, setRptCondition] = useState("all");
  const [hourArray, setHourArray] = useState([]);
  //console.log("hourArray", hourArray);
  useEffect(() => {
    //moment().format("YYYY-MM-DDT23:59"));
    getServiceStatisticsByHour(moment(sDate).format("YYYY-MM-DD"));
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //console.log(statReportData.map(d => d.hour));
    let tmpHH = [];
    if (statReportData.length > 0) {
      statReportData
        .map(d => d.hour)
        .forEach(d => {
          if (tmpHH.indexOf(d) < 0) tmpHH.push(d);
        });
      setHourArray(tmpHH.sort());
    }
  }, [statReportData]);

  const onSearchClick = () => {
    getServiceStatisticsByHour(moment(sDate).format("YYYY-MM-DD"));
  };

  // const onGameIDChange = gameid => {
  //   if (gameid !== "" && gameid !== undefined && gameid !== null) {
  //     setGameId(gameid);
  //     if (gameid === "ALL") {
  //       setGameName("全部");
  //     } else {
  //       setGameName(allgames.filter(g => g.game_id === gameid)[0].game_name);
  //     }
  //   }
  // };

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
      <Row className="mt-2">
        <Col md={6} sm={6}>
          {/* {allgames.length > 0 && (
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
                  <option value="ALL">全部</option>

                  {allgames.map(mItem => (
                    <option key={`game-` + mItem.game_id} value={mItem.game_id}>
                      {mItem.game_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          )} */}
        </Col>
        <Col md={6} sm={6}>
          <Form inline className="mb-2  float-right">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label className="mr-sm-2">日期:</Label>
              <HyperDatepicker
                hideAddon={true}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                selected={sDate}
                onChange={date => setSDate(date)}
              />
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
          <h5 className="header-title mb-3">
            進件數量： 選擇當日每個小時玩家所送出提問單的數量統計。
          </h5>
          <Table className="mb-0 font-13" bordered>
            <thead>
              <tr className="bg-light">
                <th>時間</th>
                {hourArray.map(hh => (
                  <th key={`hh_${hh}`}>{hh}</th>
                ))}

                <th>總數</th>
              </tr>
            </thead>

            <tbody>
              {allgames.map(game => (
                <tr key={`gg_${game.game_id}`}>
                  <th className="bg-light">{game.game_name}</th>
                  {hourArray.map(hh =>
                    statTD(
                      statReportData
                        .filter(
                          data =>
                            data.game_id === game.game_id && data.hour === hh
                        )
                        .reduce((a, b) => a + b.cnt, 0),
                      `hh2_${game.game_id}${hh}`
                    )
                  )}

                  {statTD(
                    statReportData
                      .filter(data => data.game_id === game.game_id)
                      .reduce((a, b) => a + b.cnt, 0),
                    `gg_${game.game_id}`
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>總數</td>
                {hourArray.map(hh =>
                  statTD(
                    statReportData
                      .filter(data => data.hour === hh)
                      .reduce((a, b) => a + b.cnt, 0),
                    `hh5_${hh}`
                  )
                )}
                {statTD(
                  statReportData.reduce((a, b) => a + b.cnt, 0),
                  `gg4_total`
                )}
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <h5 className="header-title mb-3">
            官方回覆數量：
            選擇當日每個小時我方所回覆的數量統計（包含批次處理，不包含機器人）。
          </h5>
          <Table className="mb-0 font-13" bordered>
            <thead>
              <tr className="bg-light">
                <th>時間</th>
                {hourArray.map(hh => (
                  <th key={`hh_${hh}`}>{hh}</th>
                ))}

                <th>總數</th>
              </tr>
            </thead>

            <tbody>
              {allgames.map(game => (
                <tr key={`gg_${game.game_id}`}>
                  <th className="bg-light">{game.game_name}</th>

                  {hourArray.map(hh =>
                    statTD(
                      statReplyData
                        .filter(
                          data =>
                            data.game_id === game.game_id && data.hour === hh
                        )
                        .reduce((a, b) => a + b.cnt, 0),
                      `hh3_${game.game_id}${hh}`
                    )
                  )}

                  {statTD(
                    statReplyData
                      .filter(data => data.game_id === game.game_id)
                      .reduce((a, b) => a + b.cnt, 0),
                    `gg3_${game.game_id}`
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>總數</td>
                {hourArray.map(hh =>
                  statTD(
                    statReplyData
                      .filter(data => data.hour === hh)
                      .reduce((a, b) => a + b.cnt, 0),
                    `hh4_${hh}`
                  )
                )}
                {statTD(
                  statReplyData.reduce((a, b) => a + b.cnt, 0),
                  `gg5_total`
                )}
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
};

ServiceStatisticsByHour.propTypes = {
  getServiceStatisticsByHour: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  statReportData: state.Service.statReportData,
  statReplyData: state.Service.statReplyData,
  question_type: state.Service.question_type,
  allgames: state.Service.allgames,
  loading: state.Service.loading,
  error: state.Service.error,
  user: state.Auth.user
});

export default connect(mapStateToProps, { getServiceStatisticsByHour })(
  ServiceStatisticsByHour
);

const statTD = (data, key) => (
  <td
    key={key}
    style={{
      backgroundColor: `rgb(255, ${255 - data * 2}
                       , ${255 - data * data * 3}`
    }}
  >
    {data}
  </td>
);
