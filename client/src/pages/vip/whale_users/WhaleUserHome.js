import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Button,
  Input,
  Alert,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { CSVLink } from "react-csv";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
import {
  isAddedOptions,
  vipRankingOptions,
  vipServiceOptions
} from "./whaleOptConfig";
import {
  getVipGames,
  getVip,
  putVip,
  clearVIPMessage,
  deleteVipServiceRequest,
  addVipServiceRequest
} from "../../../redux/actions";
import Moment from "react-moment";
import moment from "moment";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
//import paginationFactory from "react-bootstrap-table2-paginator";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";

import PropTypes from "prop-types";

const WhaleUserHome = ({
  getVipGames,
  getVip,
  putVip,
  game_list,
  loading,
  error,
  errors,
  not_allowed,
  vip_list,
  updateOKMessage,
  clearVIPMessage,
  requestData,
  deleteVipServiceRequest,
  addVipServiceRequest,
  history
}) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query_game_id = params.get("game_id") ? params.get("game_id") : "";

  const [gameId, setGameId] = useState(query_game_id);
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [reqRoleIDArray, setReqRoleIDArray] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const onAddRequestRecord = ({ type, code, note }) => {
    const record = {
      game_id: gameId,
      role_id: currentUser.char_in_game_id,
      service_type: type,
      request_code: code,
      note
    };
    addVipServiceRequest(record);
  };

  useEffect(() => {
    getVipGames();
    if (gameId) {
      getVip(gameId);
    }
    document.title = "VIP - 鯨魚用戶列表";
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //console.log("requestData effect", requestData.length);
    if (requestData.length > 0) {
      const arr1 = requestData.map(d => d.role_id);
      //const arr1 = ["a"];

      const arr2 = vip_list
        .filter(vip => {
          if (arr1.indexOf(vip.char_in_game_id) >= 0) {
            return false;
          } else {
            return true;
          }
        })
        .map(v => v.char_in_game_id);
      //console.log("requestData effect arr2", arr2.length);
      setReqRoleIDArray(arr2);
    }
  }, [requestData]);

  useEffect(() => {
    let timeOutId;

    if (
      updateOKMessage !== undefined &&
      updateOKMessage !== null &&
      modal === true
    ) {
      setModal(!modal);
    }
    if (
      (updateOKMessage !== undefined && updateOKMessage !== null) ||
      (error !== undefined && error !== null && !not_allowed)
    ) {
      //console.log("error effect", error);
      timeOutId = setTimeout(() => {
        clearVIPMessage();
        //console.log("error effect timeOutId", timeOutId);
      }, 2000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updateOKMessage, error]);

  const changeVIPGame = game_id => {
    //console.log(game_id);
    if (game_id) {
      history.push(`/vip/whale_users?game_id=${game_id}`);
      setGameId(game_id);
      getVip(game_id);
    }
  };

  const onLineAddChange = uid => {
    //console.log("onLineAddChange", gameId, uid);
    putVip(gameId, uid, "LINE_ACTION");
  };

  const onConfirmInactive = uid => {
    console.log("onConfirmInactive", gameId, uid);
  };

  const onEdit = char_in_game_id => {
    //console.log("onEdit", char_in_game_id);
    setCurrentUser(
      vip_list.filter(vip => vip.char_in_game_id === char_in_game_id)[0] || {}
    );

    toggle();
  };

  const headerSortingStyle = { backgroundColor: "#c8e6c9" };

  const columns = [
    {
      dataField: "uid",
      text: "帳號",
      filter: textFilter(),
      sort: true,
      headerSortingStyle,
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      }
    },
    {
      dataField: "vip_ranking",
      text: "VIP",
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
      headerSortingStyle,
      sort: true,
      formatter: cellContent => {
        const opt = vipRankingOptions.filter(
          opt => opt.value === cellContent
        )[0];

        return opt ? (
          <span className={`mr-1 badge badge-${opt.color}-lighten badge-pill`}>
            {opt.label || ""}
          </span>
        ) : (
          ""
        );
      },
      filter: selectFilter({
        options: vipRankingOptions
      })
    },
    {
      dataField: "char_name",
      text: "角色暱稱",
      filter: textFilter(),
      sort: true,
      headerSortingStyle,
      headerStyle: (column, colIndex) => {
        return { width: "150px" };
      },
      formatter: (cellContent, row) => {
        return cellContent ? (
          <Fragment>
            {" "}
            <Link
              to={`/vip/user_dashboard/${row.site}?user=${row.char_in_game_id}`}
            >
              {cellContent}
            </Link>
          </Fragment>
        ) : (
          ""
        );
      }
    },
    {
      dataField: "char_in_game_id",
      text: "角色ID",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      }
    },
    {
      dataField: "server_name",
      text: "伺服器",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      }
    },
    {
      dataField: "country",
      text: "國家",
      filter: textFilter(),
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      }
    },

    {
      dataField: "vip_ranking_updated",
      text: "升階",
      sort: true,
      headerSortingStyle,
      formatter: (cellContent, row) => {
        return cellContent ? (
          <Moment className="text-muted small" format="YYYY-MM-DD HH:mm:ss">
            {cellContent}
          </Moment>
        ) : (
          ""
        );
      }
    },
    {
      dataField: "latest_topup_date",
      text: "最後儲值",
      sort: true,
      headerSortingStyle,
      formatter: (cellContent, row) => {
        return cellContent ? (
          <Moment className="text-muted small" format="YYYY-MM-DD HH:mm:ss">
            {cellContent}
          </Moment>
        ) : (
          ""
        );
      }
    },

    {
      dataField: "deposit_total",
      text: "儲值總額",
      sort: true,
      headerSortingStyle,
      formatter: (cellContent, row) => {
        // Create our number formatter.
        //new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
        var totalFormatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "TWD",
          minimumFractionDigits: 0
        });
        return <span>{totalFormatter.format(cellContent)}</span>;
      }
    },
    {
      dataField: "is_added",
      text: "Line",
      filter: selectFilter({
        options: isAddedOptions
      }),
      headerStyle: (column, colIndex) => {
        return { width: "50px" };
      },
      formatter: (cellContent, row) => {
        const displayBlock =
          row.is_added === 1 ? (
            <span>
              {" "}
              <i className="mdi mdi-account-check-outline"></i>{" "}
            </span>
          ) : null;
        return displayBlock;
      }
    },
    {
      dataField: "line_date",
      text: "加入日期",
      sort: true,
      headerSortingStyle,
      formatter: (cellContent, row) => {
        const displayBlock =
          row.is_added === 1 ? (
            <span>
              <Moment className="text-muted small" format="YYYY-MM-DD HH:mm:ss">
                {row.line_date}
              </Moment>
            </span>
          ) : null;
        return displayBlock;
      }
    },

    {
      dataField: "inactive_confirm_date",
      text: "確認流失",
      sort: true,
      formatter: (cellContent, row) => {
        const displayBlock = cellContent ? (
          <span>
            <i className="mdi mdi-account-off-outline"></i>{" "}
            <Moment className="text-muted small" format="YYYY-MM-DD HH:mm:ss">
              {cellContent}
            </Moment>
          </span>
        ) : null;
        return displayBlock;
      }
    },
    {
      dataField: "last_login",
      text: "最後登入",
      sort: true,
      formatter: (cellContent, row) => {
        const displayBlock = cellContent ? (
          <Moment className="text-muted small" format="YYYY-MM-DD">
            {cellContent}
          </Moment>
        ) : null;
        return displayBlock;
      }
    }
    // {
    //   dataField: "action",
    //   isDummyField: true,
    //   text: "操作",
    //   formatter: (cell, row) => {
    //     return (
    //       <Fragment>
    //         <UncontrolledButtonDropdown>
    //           <DropdownToggle color="light" caret></DropdownToggle>
    //           <DropdownMenu>
    //             <DropdownItem onClick={e => onLineAddChange(row.uid)}>
    //               {row.is_added === 1 ? (
    //                 <i className="mdi mdi-account-remove mr-1"></i>
    //               ) : (
    //                 <i className="mdi mdi-account-plus mr-1"></i>
    //               )}

    //               {row.is_added === 1 ? "設為未加入Line" : "設為已經加入Line"}
    //             </DropdownItem>
    //             <DropdownItem onClick={e => onConfirmInactive(row.uid)}>
    //               {" "}
    //               <i className="mdi mdi-account-off mr-1"></i>確認流失
    //             </DropdownItem>
    //             <DropdownItem onClick={e => onEdit(row.char_in_game_id)}>
    //               {" "}
    //               <i className="mdi mdi-square-edit-outline mr-1"></i>編輯
    //             </DropdownItem>
    //           </DropdownMenu>
    //         </UncontrolledButtonDropdown>
    //       </Fragment>
    //     );
    //   }
    // }
  ];

  const onDelReqeust = record_id => {
    //console.log("onDelReqeust", record_id);
    deleteVipServiceRequest(record_id);
  };

  const arr1 = requestData.map(d => d.role_id);
  //const arr1 = ["a"];

  const arr2 = vip_list
    .filter(vip => {
      if (arr1.indexOf(vip.char_in_game_id) >= 0) {
        return false;
      } else {
        return true;
      }
    })
    .map(v => v.char_in_game_id);

  const expandRow = {
    showExpandColumn: true,
    expandByColumnOnly: true,
    nonExpandable: arr2,

    renderer: row => {
      const reqData = requestData
        .filter(data => data.role_id === row.char_in_game_id)
        .sort((a, b) => a.create_time > b.create_time);

      if (reqData.length > 0) {
        return (
          <Fragment>
            {" "}
            {reqData.map(d => {
              const vsop =
                vipServiceOptions.filter(
                  vo => vo.type.toString() === d.service_type
                )[0] || {};

              return (
                <div key={`${row.char_in_game_id}_${d.id}`}>
                  <i className={`${vsop.icon} text-info`}></i>
                  <span className="text-info">
                    {vsop.label}-{vsop.list[d.request_code]}{" "}
                  </span>

                  <blockquote className="blockquote">
                    <p className="mb-0">
                      <Button
                        outline
                        color="danger"
                        size="sm"
                        style={{ padding: "0.08rem", lineHeight: "1" }}
                        className="btn-icon mr-2"
                        onClick={() => onDelReqeust(d.id)}
                      >
                        <i
                          className={classNames(
                            "mdi",
                            "mdi-window-close",
                            "ml-0",
                            "mr-0"
                          )}
                        ></i>
                      </Button>
                      {d.note}{" "}
                    </p>
                    <footer className="blockquote-footer">
                      負責專員:{d.admin_name}{" "}
                      <cite title="Source Title">
                        <Moment
                          className="Source Title"
                          format="YYYY-MM-DD HH:mm:ss"
                        >
                          {d.create_time}
                        </Moment>
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              );
            })}{" "}
          </Fragment>
        );
      } else {
        return null;
      }
    }
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );
  const fileName = `${gameId}_VIP_${Date.now()}`;
  //帳號	角色	原廠ID	伺服器	儲值累積	最後訂單時間	地區	未儲值/日	升階	邀請次數	加入Line	加入Line日期	最後登入日期	確認流失	VIP級別	Column1

  const csvHeaders = [
    { label: "帳號", key: "uid" },
    { label: "角色", key: "char_name" },

    { label: "原廠ID", key: "char_in_game_id" },
    { label: "伺服器", key: "server_name" },
    { label: "儲值累積", key: "deposit_total" },
    { label: "最後訂單時間", key: "latest_topup_date" },
    { label: "地區", key: "country" },
    { label: "升階", key: "vip_ranking_updated" },
    { label: "加入Line", key: "is_added" },
    { label: "加入Line日期", key: "line_date" },
    { label: "最後登入日期", key: "last_login" },
    { label: "確認流失", key: "inactive_confirm_date" },
    { label: "VIP級別", key: "vip_ranking" }
  ];

  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }

  if (error) {
    return (
      <Alert color="danger" isOpen={error ? true : false}>
        <div>{error}</div>
      </Alert>
    );
  }

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip", active: false },
          { label: "鯨魚用戶", path: "/vip/whale_users", active: true }
        ]}
        title={"VIP - 鯨魚用戶列表"}
      />
      <Row className="mb-2">
        <Col lg={6}>
          <FormGroup>
            <Input
              type="select"
              name="gameSelect"
              id="gameSelect"
              onChange={e => changeVIPGame(e.target.value)}
              value={gameId}
            >
              <option value="">==選擇遊戲==</option>
              {game_list.length > 0 &&
                game_list.map(game => (
                  <option key={`sel-${game.site}`} value={game.site}>
                    {game.name}
                  </option>
                ))}
            </Input>
          </FormGroup>

          {vip_list.length > 0 && (
            <CSVLink
              data={vip_list
                .map(vip => ({
                  ...vip,
                  line_date:
                    vip.line_date === null
                      ? ""
                      : moment(vip.line_date).format("YYYY-MM-DD"),
                  latest_topup_date:
                    vip.latest_topup_date === null
                      ? ""
                      : moment(vip.latest_topup_date).format(
                          "YYYY-MM-DD HH:mm"
                        ),
                  last_login:
                    vip.last_login === null
                      ? ""
                      : moment(vip.last_login).format("YYYY-MM-DD"),
                  vip_ranking_updated:
                    vip.vip_ranking_updated === null
                      ? ""
                      : moment(vip.vip_ranking_updated).format("YYYY-MM-DD"),
                  inactive_confirm_date:
                    vip.inactive_confirm_date === null
                      ? ""
                      : moment(vip.inactive_confirm_date).format("YYYY-MM-DD"),
                  is_added: vip.is_added === 1 ? "V" : "",

                  vip_ranking: vip.vip_ranking
                    ? vipRankingOptions.filter(
                        ranking => ranking.value === vip.vip_ranking
                      )[0].label
                    : ""
                }))
                .sort((a, b) => b.deposit_total - a.deposit_total)}
              headers={csvHeaders}
              filename={fileName + ".csv"}
            >
              下載 csv檔案
            </CSVLink>
          )}
        </Col>

        <Col lg={4}>
          {error && (
            <Alert color="danger" isOpen={error ? true : false}>
              <div>{error}</div>
            </Alert>
          )}

          {updateOKMessage && (
            <Alert color="success" isOpen={updateOKMessage ? true : false}>
              <div>{updateOKMessage}</div>
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col lg={12}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: vip_list.length,
              sizePerPage: 100,
              paginationTotalRenderer: customTotal
            })}
          >
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />
                <BootstrapTable
                  keyField="char_in_game_id"
                  data={vip_list}
                  columns={columns}
                  striped
                  hover
                  condensed
                  noDataIndication="請選擇遊戲"
                  defaultSorted={[
                    {
                      dataField: "deposit_total",
                      order: "desc"
                    }
                  ]}
                  wrapperClasses="table-responsive"
                  rowClasses="text-dark m-0 font-13"
                  expandRow={expandRow}
                  filter={filterFactory()}
                  {...paginationTableProps}
                />
              </div>
            )}
          </PaginationProvider>
        </Col>
      </Row>
    </Fragment>
  );
};

WhaleUserHome.propTypes = {
  getVipGames: PropTypes.func.isRequired,
  getVip: PropTypes.func.isRequired,
  game_list: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  vip_list: state.VIP.vip_list,
  requestData: state.VIP.requestData,
  game_list: state.VIP.game_list,
  loading: state.VIP.loading,
  error: state.VIP.error,
  errors: state.VIP.errors,
  not_allowed: state.VIP.not_allowed,
  updateOKMessage: state.VIP.updateOKMessage
});

export default connect(mapStateToProps, {
  getVipGames,
  getVip,
  putVip,
  clearVIPMessage,
  deleteVipServiceRequest,
  addVipServiceRequest
})(WhaleUserHome);
