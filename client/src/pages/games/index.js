import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import GameStatusBadge from "./GameStatusBadge";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import PropTypes from "prop-types";
import { Row, Col, Alert } from "reactstrap";
import { getGames } from "../../redux/actions";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";

const GamesHome = ({ games, getGames, loading, errors }) => {
  const mainTitle = "遊戲";
  const mainPath = "/games";

  useEffect(() => {
    getGames();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  const selStatusOptions = { 0: "關", 1: "開", 2: "內測" };

  const columns = [
    {
      dataField: "game_id",
      text: "遊戲ID",
      filter: textFilter(),
      headerAttrs: (column, colIndex) => ({ width: "10%" })
    },
    {
      dataField: "game_name",
      text: "遊戲名稱",
      formatter: GameColumn,
      headerAttrs: (column, colIndex) => ({ width: "25%" }),
      filter: textFilter()
    },
    {
      dataField: "is_active",
      text: "遊戲狀態",
      headerStyle: (column, colIndex) => {
        return { width: "118px" };
      },
      filter: selectFilter({
        options: selStatusOptions
      }),
      formatter: (cell, row) => {
        return <GameStatusBadge status_code={row.is_active} />;
      }
    },
    {
      dataField: "action",
      isDummyColumn: true,
      text: "操作",
      sort: false,
      classes: "table-action",
      formatter: ActionColumn
    }
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );
  if (loading) {
    return <Spinner className="m-2" color="secondary" />;
  }
  if (errors.msg) {
    return (
      <Alert color="danger" isOpen={errors.msg ? true : false}>
        <div>{errors.msg}</div>
      </Alert>
    );
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
        <Col sm={4}>
          <Link
            to={`${mainPath}/create`}
            className="btn btn-rounded btn-danger mb-3"
          >
            <i className="mdi mdi-plus-circle mr-2" /> 新增{mainTitle}
          </Link>
        </Col>

        <Col md={6} sm={6}></Col>
      </Row>
      <Row>
        <Col lg={12}>
          <BootstrapTable
            bootstrap4
            keyField="game_id"
            striped
            hover
            condensed
            data={games}
            columns={columns}
            defaultSorted={[
              {
                dataField: "game_id",
                order: "desc"
              }
            ]}
            filter={filterFactory()}
            pagination={paginationFactory({
              sizePerPage: 50,
              showTotal: true,
              paginationTotalRenderer: customTotal
            })}
            classes="border-dark"
            wrapperClasses="border-dark"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

GamesHome.propTypes = {
  getGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.Games.list,
  loading: state.Games.loading,
  errors: state.Games.errors
});

export default connect(mapStateToProps, { getGames })(GamesHome);

const GameColumn = (cell, row, rowIndex, extraData) => {
  const fanpage = row.fanpage;
  const emptyImg = row.logo_path ? (
    <img
      src={row.logo_path}
      alt={row.name}
      title={row.name}
      className="rounded "
      height="48"
    />
  ) : (
    <div className="avatar-sm">
      <span
        className="avatar-title bg-primary-lighten rounded mr-3"
        height="48"
      ></span>
    </div>
  );
  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col className="col-auto">{emptyImg}</Col>
        <Col className="col pl-0">
          <p className="m-0 d-inline-block align-middle font-16">
            {row.game_name}
            <br />

            <a
              href={`https://support.longeplay.com.tw/service_quick?param_game_id=${row.game_id}`}
              target="_blank"
              rel="noopener noreferrer"
              alt={row.game_name}
            >
              <i className="mdi mdi-help-network ml-1"></i>
            </a>

            {row.fanpage && (
              <a
                href={row.fanpage}
                target="_blank"
                rel="noopener noreferrer"
                alt={row.game_name}
              >
                <i className="mdi mdi-facebook-box ml-1"></i>
              </a>
            )}
            {row.site && (
              <a
                href={row.site}
                target="_blank"
                rel="noopener noreferrer"
                alt={row.game_name}
              >
                <i className="mdi mdi-web ml-1"></i>
              </a>
            )}
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const ActionColumn = (cell, row, rowIndex, extraData) => {
  return (
    <Fragment>
      <Link to={`/games/edit/${row.game_id}`} className="action-icon">
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
    </Fragment>
  );
};
