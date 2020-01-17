import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { Card, CardBody, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import { getVipGames, getVipRequests } from "../../../redux/actions";
import PageTitle from "../../../components/PageTitle";
import QuerySearchBox from "./QuerySearchBox";
import { vipServiceOptions } from "./whaleOptConfig";

const RequestReportHome = ({
  games,
  requestData,
  getVipGames,
  getVipRequests
}) => {
  const mainTitle = "VIP - 鯨魚用戶服務紀錄";
  let fileName = `VIP_鯨魚用戶服務紀錄_${Date.now()}`;

  const csvHeaders = [
    { label: "#", key: "id" },
    { label: "角色序號", key: "role_id" },
    { label: "角色", key: "char_name" },
    { label: "主類別", key: "type" },
    { label: "次類別", key: "code" },
    { label: "tag", key: "tag" },
    { label: "內容", key: "note" },
    { label: "時間", key: "create_time" },
    { label: "專員", key: "admin_name" }
  ];

  useEffect(() => {
    getVipGames();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  const handleSearchClick = conditions => {
    //console.log("handleSearchClick", conditions);
    fileName = `VIP_鯨魚用戶服務紀錄_${conditions.gameId}${Date.now()}`;
    getVipRequests(conditions);
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/VIP/", active: false },
          { label: mainTitle, path: "/VIP/request_report", active: true }
        ]}
        title={mainTitle}
      />

      <QuerySearchBox handleSearchClick={handleSearchClick} games={games} />

      {requestData.length > 0 && (
        <CSVLink
          data={requestData
            .map(record => ({
              ...record,
              create_time: moment(record.create_time).format(
                "YYYY-MM-DD HH:mm:ss"
              ),

              type: vipServiceOptions.filter(
                item => item.type == record.service_type
              )[0].label,
              code: vipServiceOptions.filter(
                item => item.type == record.service_type
              )[0].list[record.request_code]
            }))
            .sort((a, b) => b.deposit_total - a.deposit_total)}
          headers={csvHeaders}
          filename={fileName + ".csv"}
        >
          下載 csv檔案
        </CSVLink>
      )}

      <Card>
        <CardBody>
          <Table className="mb-0 font-13" bordered size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>角色序號</th>
                <th>角色</th>
                <th>主類別</th>
                <th>次類別</th>
                <th>tag</th>
                <th style={{ width: "550px" }}>內容</th>
                <th>時間</th>
                <th>專員</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((record, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{record.id}</th>
                    <td>{record.role_id}</td>
                    <td>{record.char_name}</td>
                    <td>
                      {
                        vipServiceOptions.filter(
                          item => item.type == record.service_type
                        )[0].label
                      }
                    </td>
                    <td>
                      {
                        vipServiceOptions.filter(
                          item => item.type == record.service_type
                        )[0].list[record.request_code]
                      }
                    </td>
                    <td>{record.tag}</td>
                    <td>{record.note}</td>
                    <td>
                      {moment(record.create_time).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td>{record.admin_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
};

RequestReportHome.propTypes = {
  getVipGames: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  games: state.VIP.game_list,
  requestData: state.VIP.requestData
});

export default connect(mapStateToProps, {
  getVipGames,
  getVipRequests
})(RequestReportHome);
