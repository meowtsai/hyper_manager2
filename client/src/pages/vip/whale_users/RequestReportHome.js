import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { getVipGames, getVipRequests } from '../../../redux/actions';
import PageTitle from '../../../components/PageTitle';
import QuerySearchBox from './QuerySearchBox';
import { vipServiceOptions } from './whaleOptConfig';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';
import filterFactory, {
  textFilter,
  selectFilter
} from 'react-bootstrap-table2-filter';

const RequestReportHome = ({
  games,
  requestData,
  getVipGames,
  getVipRequests,
  user
}) => {
  const mainTitle = 'VIP - 鯨魚用戶服務紀錄';
  let fileName = `VIP_鯨魚用戶服務紀錄_${Date.now()}`;
  const [arrangedData, setArrangedData] = useState([]);
  const [selAdminOptions, setSelAdminOptions] = useState({});
  const [defaultAdmin, setDefaultAdmin] = useState('');

  const csvHeaders = [
    { label: '#', key: 'id' },
    { label: '角色序號', key: 'role_id' },
    { label: '角色', key: 'char_name' },
    { label: '主類別', key: 'type' },
    { label: '次類別', key: 'code' },
    { label: 'tag', key: 'tag' },
    { label: '內容', key: 'note' },
    { label: '時間', key: 'create_time' },
    { label: '專員', key: 'admin_name' }
  ];

  useEffect(() => {
    getVipGames();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (requestData.length > 0) {
      setArrangedData(requestData);
      const selAdminOptionsArray = new Set(requestData.map(q => q.admin_name));
      let tmpS = {};
      selAdminOptionsArray.forEach((g, index) => {
        if (g === user.admin_name) {
          setDefaultAdmin(index);
        }

        tmpS[index] = g;
      });
      setSelAdminOptions(tmpS);
    }
  }, [requestData]);
  const handleSearchClick = conditions => {
    //console.log("handleSearchClick", conditions);
    fileName = `VIP_鯨魚用戶服務紀錄_${conditions.gameId}${Date.now()}`;
    getVipRequests(conditions);
  };
  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-2'>
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  const columns = [
    {
      dataField: 'char_name',
      text: '角色名稱',
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <div>
            <strong style={{ color: 'blue' }}>{cellContent} </strong>
            <br />
            GID: {row.role_id}
          </div>
        );
      },
      sort: true
    },
    {
      dataField: 'service_type',
      text: '主類別',
      filter: selectFilter({
        options: vipServiceOptions.map(opt => ({
          label: opt.label,
          value: opt.type
        }))
      }),
      formatter: (cellContent, row) => {
        return (
          <small>
            {
              vipServiceOptions.filter(item => item.type == row.service_type)[0]
                .label
            }
          </small>
        );
      },
      sort: true
    },
    {
      dataField: 'request_code',
      text: '次類別',

      filter: selectFilter({
        options: Object.keys(vipServiceOptions[0].list)
          .map(item => ({
            label: vipServiceOptions[0].list[item],
            value: item
          }))
          .concat(
            Object.keys(vipServiceOptions[1].list).map(item => ({
              label: vipServiceOptions[1].list[item],
              value: item
            }))
          )
      }),
      formatter: (cellContent, row) => {
        return (
          <small>
            {
              vipServiceOptions.filter(item => item.type == row.service_type)[0]
                .list[row.request_code]
            }
          </small>
        );
      },
      sort: true
    },
    {
      dataField: 'tag',
      text: 'tag',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'note',
      text: '內容',
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return { width: '400px' };
      },
      formatter: (cellContent, row) => {
        return (
          <div>
            <small className='text-muted'>
              #{row.id} @{' '}
              <Moment format='YYYY-MM-DD HH:mm'>{row.create_time}</Moment>
            </small>
            <br />
            {cellContent}
          </div>
        );
      },
      sort: true
    },

    {
      dataField: 'admin_name',
      text: '專員',
      filter: textFilter(),
      filter: selectFilter({
        options: selAdminOptions,
        defaultValue: defaultAdmin
      }),
      sort: true
    }
  ];
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'VIP', path: '/VIP/', active: false },
          { label: mainTitle, path: '/VIP/request_report', active: true }
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
                'YYYY-MM-DD HH:mm:ss'
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
          filename={fileName + '.csv'}>
          下載 csv檔案
        </CSVLink>
      )}

      <Row className='mb-2'>
        <Col lg={12}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: arrangedData.length,
              sizePerPage: 100,
              paginationTotalRenderer: customTotal
            })}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />

                <BootstrapTable
                  keyField='id'
                  data={arrangedData}
                  columns={columns}
                  condensed
                  noDataIndication='沒有紀錄'
                  defaultSorted={[
                    {
                      dataField: 'dt',
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

RequestReportHome.propTypes = {
  getVipGames: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  games: state.VIP.game_list,
  requestData: state.VIP.requestData,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  getVipGames,
  getVipRequests
})(RequestReportHome);
