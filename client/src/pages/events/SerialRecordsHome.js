import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import { getSerialEventRecords } from '../../redux/actions';
import PropTypes from 'prop-types';
import { Row, Col, Form, Alert, Input, FormGroup } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../components/Spinner';
import { CSVLink } from 'react-csv';
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
const SerialRecordsHome = ({
  records,
  loading,
  error,
  getSerialEventRecords
}) => {
  const [arrangedData, setArrangedData] = useState([]);
  const mainTitle = '活動 - 荒野行動虛寶兌換記錄查詢頁';
  let fileName = `虛寶兌換記錄_${Date.now()}`;
  const csvHeaders = [
    { label: '角色ID', key: 'in_game_id' },
    { label: '角色名稱', key: 'name' },

    { label: 'Email', key: 'email' },
    { label: '序號', key: 'serial' },
    { label: '時間', key: 'dt' },
    { label: '獎項', key: 'title' },
    { label: '伺服器', key: 'server' }
  ];
  useEffect(() => {
    getSerialEventRecords(24);
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (records.length > 0) {
      setArrangedData(records);
    }
  }, [records]);

  if (loading) {
    return <Spinner className='m-2' color='secondary' />;
  }

  if (error) {
    return (
      <Alert color='danger' isOpen={error ? true : false}>
        <div>{error}</div>
      </Alert>
    );
  }

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-2'>
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );
  const serversOption = [
    { label: '手機版', value: 'mobile' },
    { label: 'PC伺服器 - 日本', value: 'pc_japan' },
    { label: 'PC伺服器 - 北美', value: 'pc_north_america' },
    { label: 'PC伺服器 - 東南亞', value: 'pc_se_asia' },
    { label: 'PC伺服器 - 國際', value: 'pc_i10n' }
  ];

  const columns = [
    {
      dataField: 'in_game_id',
      text: '帳號',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'name',
      text: '角色名稱',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'email',
      text: 'EMAIL',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'serial',
      text: '序號',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'dt',
      text: '兌換時間',
      formatter: (cellContent, row) => {
        return (
          <small>
            <Moment format='YYYY-MM-DD HH:mm'>{row.dt}</Moment>
          </small>
        );
      },
      sort: true
    },
    {
      dataField: 'title',
      text: '獎項',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'server',
      text: '伺服器',
      filter: selectFilter({
        options: serversOption
      }),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            {serversOption.filter(s => s.value === cellContent)[0].label}
          </Fragment>
        );
      },
      sort: true
    }
  ];

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'VIP', path: '/wire_report/list', active: false },
          { label: mainTitle, path: '/vip/wire_report/list', active: true }
        ]}
        title={mainTitle}
      />
      <Row className='mb-2'>
        <Col sm={8}>
          <Form inline className='mb-2 mt-2'>
            {arrangedData.length > 0 && (
              <CSVLink
                data={arrangedData.map(item => ({
                  ...item,
                  dt: moment(item.dt).format('YYYY-MM-DD HH:mm:ss'),

                  server: serversOption.filter(s => s.value === item.server)[0]
                    .label
                }))}
                headers={csvHeaders}
                filename={fileName + '.csv'}>
                下載 csv檔案
              </CSVLink>
            )}
          </Form>
        </Col>
        <Col md={4} sm={4}></Col>
      </Row>
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

SerialRecordsHome.propTypes = {
  getSerialEventRecords: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  records: state.Event.serial_list,
  loading: state.Event.loading,
  error: state.Event.error
});

export default connect(mapStateToProps, { getSerialEventRecords })(
  SerialRecordsHome
);
