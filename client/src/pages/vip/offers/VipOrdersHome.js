import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Alert, Input, FormGroup, Label } from 'reactstrap';
import classNames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import PageTitle from '../../../components/PageTitle';
import { getVipOrders, deleteVipWireReport } from '../../../redux/actions';
import Moment from 'react-moment';
import moment from 'moment';
import Spinner from '../../../components/Spinner';
import { CSVLink } from 'react-csv';
import { reportStatusOptions, invoiceOptions } from './vipOptions';
import { vipRankingOptions } from '../whale_users/whaleOptConfig';

import PropTypes from 'prop-types';
import VipOrderExpandRow from './VipOrderExpandRow';
import filterFactory, {
  textFilter,
  selectFilter,
} from 'react-bootstrap-table2-filter';

const VipOrdersHome = ({
  getVipOrders,
  records,
  loading,
  error,
  deleteVipWireReport,
}) => {
  const [arrangedData, setArrangedData] = useState([]);

  const [beginTime, setBeginTime] = useState(
    moment().format('YYYY-MM-DDT00:00')
  );
  const [endTime, setEndTime] = useState(moment().format('YYYY-MM-DDT23:59'));
  const [selectedGame, setSelectedGame] = useState('');
  const [searchActivated, setSearchActivated] = useState(false);

  const mainTitle = 'VIP 訂單列表';
  useEffect(() => {
    getVipOrders();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      setArrangedData(records);
    }
  }, [records]);

  const deleteClick = (e, report_id) => {
    const deleteConfirm = window.confirm(`您確定要刪除${report_id}這筆紀錄嗎?`);
    if (deleteConfirm) {
      deleteVipWireReport(report_id);
    }
  };

  const filterByEmailOrPhone = (filterVal, data) => {
    //console.log("filterVal", filterVal);
    if (filterVal) {
      return data.filter(
        (item) =>
          item.phone.indexOf(filterVal) > -1 ||
          item.email.indexOf(filterVal) > -1
      );
    }
    return data;
  };

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

  //聯繫電話	EMAIL	方案ID	方案數量	方案總金額	開單時間	訂單編號	伺服器	角色GID	角色名稱	匯款銀行	匯款帳號後五碼	匯款戶名	匯款時間	匯款總金額	信用點	備註	獎勵發放	發票號碼
  //玩家建單日期時間	伺服器	角色ID	角色名稱	匯款銀行	玩家匯款資訊(帳號末五碼)	匯款戶名(本名或帳號都可)	匯款日期	匯款時間	訂單金額	發票日期	發票號碼	虛寶內容	後台建單訂單編號	派寶完成	備註	紀錄人員
  const fileName = `VIP訂單_${moment().format('YYYY-MM-DD')}${Date.now()}`;
  const csvHeaders = [
    { label: '訂單號', key: 'report_id' },
    { label: '玩家建單日期時間', key: 'create_time' },
    { label: '遊戲', key: 'game_name' },
    { label: '伺服器', key: 'server_name' },
    { label: '角色ID', key: 'role_id' },
    { label: '角色名稱', key: 'char_name' },
    { label: 'VIP等級', key: 'vip_ranking' },
    { label: '匯款銀行', key: 'bank_name' },
    { label: '玩家匯款資訊(帳號末五碼)', key: 'wire_code' },
    { label: '匯款戶名(本名或帳號都可)', key: 'wire_name' },
    { label: '匯款時間', key: 'wire_time' },
    { label: '訂單金額', key: 'wire_amount' },
    { label: '備註', key: 'note' },
    { label: '發票選項', key: 'invoice_option' },
    { label: '收件人', key: 'recipient' },
    { label: '寄送住址', key: 'address' },
    { label: '發票日期', key: 'invoice_date' },
    { label: '發票號碼', key: 'invoice_id' },
    { label: '虛寶內容', key: 'credits' },
    { label: '訂單狀態', key: 'report_status' },
    { label: '處理人員', key: 'admin_name' },
  ];

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-2'>
      顯示 {size} 筆總數中的 {from} ~ {to} 紀錄
    </span>
  );

  const columns = [
    {
      dataField: 'create_time',
      text: '時間',
      hidden: true,
    },
    {
      dataField: 'report_id',
      text: '單號',
      sort: true,
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <small>
            <Moment format='YYYY-MM-DD HH:mm'>{row.create_time}</Moment>
            <br />
            {row.report_id}
          </small>
        );
      },
      footer: '',
    },
    {
      dataField: 'contact_info',
      isDummyField: true,
      filter: textFilter({
        placeholder: 'email 或手機',
        onFilter: filterByEmailOrPhone,
      }),
      text: '聯繫資訊',
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <div>📧 {row.email}</div>
            <div>📱 {row.phone}</div>
          </React.Fragment>
        );
      },
      footer: '',
    },
    {
      dataField: 'product_id',
      text: '方案',
      filter: textFilter(),
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div>
            方案{cellContent} * {row.qty}{' '}
          </div>
        );
      },
      footer: '',
    },
    {
      dataField: 'server_name',
      text: '伺服器',
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <div>
            {row.game_id === 'g66naxx2tw' ? (
              <img
                className='mr-1'
                style={{ opacity: 0.7 }}
                src='https://game.longeplay.com.tw/p/upload/pictures/8e43db062e94be5cebb5ad6e5ff9590f.png'
                width='10'
                alt='明日logo'
              />
            ) : (
              <img
                className='mr-1'
                style={{ opacity: 0.7 }}
                src='https://game.longeplay.com.tw/p/upload/pictures/b96dffcf093d677988b287a22e9db5a7.png'
                width='10'
                alt='第五logo'
              />
            )}
            <strong>{cellContent} </strong>
          </div>
        );
      },
      footer: '',
    },
    {
      dataField: 'char_name',
      text: '角色',
      filter: textFilter(),
      formatter: (cellContent, row) => {
        const opt = vipRankingOptions.filter(
          (opt) => opt.value === row.vip_ranking
        )[0];
        const ranking_badge = opt ? (
          <span className={`mr-1 badge badge-${opt.color}-lighten badge-pill`}>
            {opt.label || ''}
          </span>
        ) : (
          ''
        );
        return (
          <div>
            <strong style={{ color: 'blue' }}>{cellContent} </strong>
            {ranking_badge}
            <br />
            {opt ? (
              <Link
                to={`/vip/user_dashboard/${row.game_id}?user=${row.role_id}`}>
                {row.role_id}
              </Link>
            ) : (
              row.role_id
            )}
          </div>
        );
      },

      footer: '',
    },

    {
      dataField: 'wire_amount',
      text: '金額',
      footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
    },
    {
      dataField: 'report_status',
      text: '狀態',
      filter: selectFilter({
        options: reportStatusOptions,
      }),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <span
              className={classNames('badge', {
                'badge-secondary': row.report_status === '1',
                'badge-success': row.report_status === '4',
                'badge-danger': row.report_status === '2',
                'badge-info': row.report_status === '5',
                'badge-dark': row.report_status === '6',
              })}>
              {reportStatusOptions[cellContent]}
            </span>
          </Fragment>
        );
      },
      footer: '',
    },
    {
      dataField: 'invoice_option',
      text: '發票選項',
      headerStyle: (column, colIndex) => {
        return { width: '100px' };
      },
      filter: selectFilter({
        options: invoiceOptions,
      }),
      formatter: (cellContent, row) => {
        return invoiceOptions[cellContent];
      },
      footer: '',
    },

    {
      dataField: 'invoice_id',
      text: '發票號碼',
      headerStyle: (column, colIndex) => {
        return { width: '120px' };
      },
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            {cellContent}
            <span className='text-muted d-block'>
              {moment(row.invoice_date).format('YYYY-MM-DD') ===
              'Invalid date' ? (
                ''
              ) : (
                <Moment format='YYYY-MM-DD'>{row.invoice_date}</Moment>
              )}
            </span>
          </Fragment>
        );
      },
      footer: '',
    },
    {
      dataField: 'admin_name',
      filter: textFilter(),
      text: '處理人',
    },
    {
      dataField: 'action',
      isDummyField: true,
      classes: 'table-action',
      headerStyle: (column, colIndex) => {
        return { width: '100px' };
      },
      text: '操作',
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Link
              to={`/vip/wire_report/edit/${row.report_id}`}
              className='action-icon'>
              {' '}
              <i className='mdi mdi-square-edit-outline'></i>
            </Link>
            {row.report_status === '1' && (
              <a
                className='action-icon text-danger'
                onClick={(e) => deleteClick(e, row.report_id)}>
                <i className='mdi mdi-trash-can-outline'></i>
              </a>
            )}
          </React.Fragment>
        );
      },
      footer: '',
    },
  ];

  const handleSearchClick = (e) => {
    //console.log(inStockDateFilter);
    e.preventDefault();
    setSearchActivated(true);
    setArrangedData(
      records.filter(
        (row) =>
          row.game_id === selectedGame &&
          moment(row.create_time).format('YYYY-MM-DDTHH:mm') >= beginTime &&
          moment(row.create_time).format('YYYY-MM-DDTHH:mm') <= endTime
      )
    );
  };
  const clearSearch = (e) => {
    //console.log(inStockDateFilter);
    setSearchActivated(false);
    e.preventDefault();
    setArrangedData(records);
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'VIP', path: '/wire_report/list', active: false },
          { label: mainTitle, path: '/vip/wire_report/list', active: true },
        ]}
        title={mainTitle}
      />
      <Row className='mb-2'>
        <Col sm={12}>
          <Form inline>
            <FormGroup>
              <Label className='ml-1 mr-1'>遊戲</Label>
              <Input
                type='select'
                name='gameSelect'
                id='gameSelect'
                onChange={(e) => setSelectedGame(e.target.value)}>
                <option value=''>全遊戲</option>
                <option value='g66naxx2tw'>明日之後</option>
                <option value='h55naxx2tw'>第五人格</option>
              </Input>{' '}
              <Label className='ml-1 mr-1'>建單時間</Label>
              <Input
                bsSize='sm'
                type='datetime-local'
                name='create_time_begin'
                id='create_time_begin'
                value={moment(beginTime).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => {
                  if (
                    moment(e.target.value).format('YYYY-MM-DDTHH:mm') !==
                    'Invalid date'
                  )
                    return setBeginTime(e.target.value);
                }}
              />{' '}
              ~
              <Input
                bsSize='sm'
                type='datetime-local'
                name='create_time_end'
                id='create_time_end'
                value={moment(endTime).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => {
                  if (
                    moment(e.target.value).format('YYYY-MM-DDTHH:mm') !==
                    'Invalid date'
                  )
                    return setEndTime(e.target.value);
                }}
              />
              <button
                className={`btn btn-sm ml-2 btn-${
                  searchActivated ? 'primary' : 'secondary'
                }`}
                onClick={(e) => handleSearchClick(e)}>
                搜尋
              </button>
              <button
                className={`btn btn-sm ml-2 btn-${
                  searchActivated ? 'secondary' : 'primary'
                }`}
                onClick={(e) => clearSearch(e)}>
                清除條件
              </button>
            </FormGroup>
          </Form>

          <Form inline className='mb-2 mt-2'>
            {arrangedData.length > 0 && (
              <CSVLink
                data={arrangedData.map((item) => ({
                  ...item,
                  create_time: moment(item.create_time).format(
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                  credits: (item.gold + item.free_golds) * item.qty + ' 信用點',
                  report_status: reportStatusOptions[item.report_status],
                  wire_time: moment(item.wire_time).format(
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                  invoice_option: invoiceOptions[item.invoice_option],
                  invoice_date:
                    moment(item.invoice_date).format('YYYY-MM-DD') !==
                    'Invalid date'
                      ? moment(item.invoice_date).format('YYYY-MM-DD')
                      : '',
                }))}
                headers={csvHeaders}
                filename={fileName + '.csv'}>
                下載 csv檔案
              </CSVLink>
            )}
          </Form>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col lg={12}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: arrangedData.length,
              sizePerPage: 100,
              paginationTotalRenderer: customTotal,
            })}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />

                <BootstrapTable
                  keyField='report_id'
                  data={arrangedData}
                  columns={columns}
                  condensed
                  noDataIndication='沒有紀錄'
                  defaultSorted={[
                    {
                      dataField: 'create_time',
                      order: 'desc',
                    },
                  ]}
                  wrapperClasses='table-responsive'
                  rowClasses='text-dark m-0 font-13'
                  expandRow={VipOrderExpandRow}
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

VipOrdersHome.propTypes = {
  getVipOrders: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  records: state.VipOffers.vip_orders_list,
  loading: state.VipOffers.loading,
  error: state.VipOffers.error,
});

export default connect(mapStateToProps, { getVipOrders, deleteVipWireReport })(
  VipOrdersHome
);
