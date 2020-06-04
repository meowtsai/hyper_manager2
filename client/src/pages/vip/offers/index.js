import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import PageTitle from '../../../components/PageTitle';
import { getVipOffers } from '../../../redux/actions';
import Moment from 'react-moment';
import Spinner from '../../../components/Spinner';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const VipOfferHome = ({ getVipOffers, records, loading, error }) => {
  const [arrangedData, setArrangedData] = useState([]);

  const mainTitle = '方案列表';
  useEffect(() => {
    getVipOffers();
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

  //#
  //a.id,a.type,a.title, a.content,a.cost, a.game_id,a.create_time,a.status, a.offer_id,a.admin_uid, a.update_time, g.name as game_name
  const columns = [
    {
      dataField: 'product_id',
      text: '方案 ID',
      sort: true,
    },

    {
      dataField: 'game_name',
      text: '遊戲',
    },

    {
      dataField: 'title',
      text: '方案名稱',
    },
    {
      dataField: 'price',
      text: '價格',
      formatter: (cellContent, row) => {
        // Create our number formatter.
        //new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
        var totalFormatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'TWD',
          minimumFractionDigits: 0,
        });
        return <span>{totalFormatter.format(cellContent)}</span>;
      },
    },
    {
      dataField: 'gold',
      text: '點數',
    },
    {
      dataField: 'is_active',
      text: '上架',
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <span
              className={`badge ${
                cellContent === '1' ? 'badge-success' : 'badge-danger'
              }`}>
              {cellContent === '1' ? '上架中' : '下架'}
            </span>
          </Fragment>
        );
      },
    },

    {
      dataField: 'start_time',
      text: '上架日期起訖',
      sort: true,
      formatter: (cellContent, row) => {
        const date_range = cellContent ? (
          <Moment format='YYYY-MM-DD'>{row.start_time}</Moment>
        ) : (
          '未設定'
        );
        return date_range;
      },
    },
    {
      dataField: 'action',
      isDummyField: true,
      text: '操作',
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Link
              to={`/vip/offers/form/${row.product_id}`}
              className='action-icon'>
              {' '}
              <i className='mdi mdi-square-edit-outline'></i>
            </Link>
          </React.Fragment>
        );
      },
    },
  ];
  const customTotal = (from, to, size) => (
    <label className='react-bootstrap-table-pagination-total ml-2'>
      共{size}筆，顯示 #{from} ~ #{to}
    </label>
  );

  const paginationOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    withFirstAndLast: false,
    showTotal: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: '25',
        value: 25,
      },
    ],
  };
  const { SearchBar } = Search;

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <Fragment>
      <label className='d-inline mr-1'>顯示</label>
      <UncontrolledDropdown className='d-inline'>
        <DropdownToggle
          caret
          tag='button'
          type='button'
          className='btn btn-outline-secondary btn-sm'>
          {currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>
          {options.map((option, idx) => (
            <DropdownItem
              key={idx}
              type='button'
              className={classNames({
                active: currSizePerPage + '' === option.page + '',
              })}
              onClick={() => onSizePerPageChange(option.page)}>
              {option.text}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
      <label className='d-inline ml-1'>方案</label>
    </Fragment>
  );

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'VIP', path: '/vip/offers', active: false },
          { label: mainTitle, path: '/vip/offers/offer_list', active: true },
        ]}
        title={mainTitle}
      />
      <Row className='mb-2'>
        <Col sm={4}>
          <Link
            to='/vip/offers/form/create'
            className='btn btn-rounded btn-danger mb-3'>
            <i className='mdi mdi-plus-circle mr-2' /> 新增方案
          </Link>
        </Col>
        <Col md={8} sm={8}>
          <Form inline className='mb-2 float-right'></Form>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col lg={12}>
          <Card>
            <CardBody>
              <PaginationProvider
                bootstrap4
                pagination={paginationFactory({
                  paginationOptions,
                  paginationTotalRenderer: customTotal,
                  custom: true,
                  sizePerPageRenderer: sizePerPageRenderer,
                })}
                keyField='id'
                data={arrangedData}
                columns={columns}>
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField='id'
                    data={arrangedData}
                    columns={columns}
                    search>
                    {(props) => (
                      <Fragment>
                        <Row className='mt-2'>
                          <Col md={6}>
                            <SizePerPageDropdownStandalone
                              {...paginationProps}
                            />
                          </Col>
                          <Col md={6} className='text-sm-right mt-2 mt-sm-0'>
                            搜尋: <SearchBar {...props.searchProps} />
                          </Col>
                        </Row>

                        <BootstrapTable
                          {...props.baseProps}
                          bordered={false}
                          headerClasses='thead-light'
                          wrapperClasses='table-responsive'
                          {...paginationTableProps}
                        />
                        <Row>
                          <Col>
                            <PaginationTotalStandalone
                              {...paginationProps}
                              dataSize={arrangedData.length}
                            />
                          </Col>
                          <Col className='react-bootstrap-table-pagination-list'>
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

VipOfferHome.propTypes = {
  getVipOffers: PropTypes.func.isRequired,
  records: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  records: state.VipOffers.vip_offer_list,
  loading: state.VipOffers.loading,
  error: state.VipOffers.error,
});

export default connect(mapStateToProps, { getVipOffers })(VipOfferHome);
