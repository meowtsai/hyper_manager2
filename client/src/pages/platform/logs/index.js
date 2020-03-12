import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../../components/PageTitle';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import { getUserLogs } from '../../../redux/actions';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';
import moment from 'moment';

import filterFactory, {
  textFilter,
  selectFilter
} from 'react-bootstrap-table2-filter';

import PropTypes from 'prop-types';

const UserLogsHome = ({ logs = [], loading, error, getUserLogs }) => {
  const mainTitle = '使用者後台操作紀錄(過去七日)';
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment()
      .add(1, 'days')
      .format('YYYY-MM-DD')
  );
  useEffect(() => {
    getUserLogs({ date_begin: startDate, date_end: endDate });
    document.title = mainTitle;
  }, []);
  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-2'>
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  const action_opt = {
    login_success: '登入',
    view_question: '檢視提問單',
    view_image: '開圖',
    logout: '登出'
  };

  const columns = [
    {
      dataField: 'id',
      text: '#'
    },
    {
      dataField: 'ip',
      text: 'IP'
    },
    {
      dataField: 'action',
      text: '操作',
      filter: selectFilter({
        options: action_opt
      }),
      formatter: (cellContent, row) => {
        return action_opt[cellContent];
      }
    },
    {
      dataField: 'function',
      text: '備註',
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            {row.action === 'view_question' || row.action === 'view_image'
              ? `遊戲: ${cellContent.split(',')[0]} \n 單號: ${
                  cellContent.split(',')[1]
                }`
              : cellContent}
          </Fragment>
        );
      },
      sort: true
    },
    {
      dataField: 'desc',
      text: '說明',
      filter: textFilter()
    },

    {
      dataField: 'create_time',
      text: '時間',
      formatter: (cellContent, row) => {
        return (
          <small className='text-muted'>
            <Moment format='YYYY-MM-DD HH:mm'>{row.create_time}</Moment>
          </small>
        );
      }
    }
  ];
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: mainTitle,
            path: '/platform/action_history',
            active: true
          }
        ]}
        title={mainTitle}
      />
      <Row className='mb-2'>
        <Col sm={4}></Col>
      </Row>
      <Row className='mb-2'>
        <Col sm={6}></Col>
      </Row>
      <Row className='mb-2'>
        <Col lg={12}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: logs.length,
              sizePerPage: 100,
              paginationTotalRenderer: customTotal
            })}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />

                <BootstrapTable
                  keyField='id'
                  data={logs}
                  columns={columns}
                  condensed
                  noDataIndication='沒有紀錄'
                  defaultSorted={[
                    {
                      dataField: 'id',
                      order: 'desc'
                    }
                  ]}
                  wrapperClasses='table-responsive'
                  rowClasses='text-dark m-0 font-13'
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

UserLogsHome.propTypes = {
  getUserLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  logs: state.AdminUsers.logs,
  loading: state.AdminUsers.loading,
  error: state.AdminUsers.error
});
export default connect(mapStateToProps, {
  getUserLogs
})(UserLogsHome);