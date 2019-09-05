import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../../components/PageTitle';
import { Row, Col, Button, Card, CardBody, Label, Table, Form, FormGroup, Alert } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { getOfflineCsData } from '../../../redux/actions';
import Moment from 'react-moment';
import Spinner from '../../../components/Spinner';
import PropTypes from 'prop-types';

const PersonalVisitHome = ({ getOfflineCsData, records, loading, error }) => {
    const [keyword, setKeyword] = useState('');
    const [filter, setFilter] = useState('all');
    const [arrangedData, setArrangedData] = useState([]);
    const [errors, setErrors] = useState({});

    const mainTitle = '玩家親訪記錄';
    const mainPath = '/offline/personal_visit';

    const filterStatus = type => {
        const newData = records.filter(
            record =>
                record.client_name.indexOf(keyword) > -1 ||
                record.cause.indexOf(keyword) > -1 ||
                (record.role_name ? record.role_name.indexOf(keyword) > -1 : false)
        );
        setFilter('keyword');
        setArrangedData(newData);
    };

    useEffect(() => {
        //console.log('startDate', startDate);
        //console.log('endDate', endDate);
        getOfflineCsData('pv');
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setArrangedData(records);
    }, [records]);
    useEffect(() => {
        if (error) {
            setErrors(error);
        } else {
            setErrors({});
        }
    }, [error]);

    //ID	訪客姓名	拜訪時間	親訪原因	角色資訊	操作
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'client_name',
            text: '訪客姓名',
            sort: true,
        },
        {
            dataField: 'visit_time',
            text: '拜訪時間',
            formatter: (cellContent, row) => {
                return <Moment format="YYYY/MM/DD HH:mm">{row.visit_time}</Moment>;
            },
        },
        {
            dataField: 'cause',
            text: '親訪原因',
            sort: true,
        },
        {
            dataField: 'role_info',
            isDummyField: true,
            text: '角色資訊',
            formatter: (cellContent, row) => {
                return (
                    <Fragment>
                        {row.game_name ? `【${row.game_name}】` : ''}
                        {row.role_name ? `${row.role_name}` : ''}
                        {row.server_name ? `( ${row.server_name})` : ''}
                    </Fragment>
                );
            },
        },
        {
            dataField: 'create_time',
            text: '建立時間',
            sort: true,
            formatter: (cellContent, row) => {
                return <Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>;
            },
        },
        {
            dataField: 'admin_name',
            text: '處理人員',
            sort: true,
        },
        {
            dataField: 'action',
            isDummyField: true,
            text: '操作',
            formatter: (cell, row) => {
                return (
                    <React.Fragment>
                        <Link to={`${mainPath}/edit/${row.id}`} className="action-icon">
                            {' '}
                            <i className="mdi mdi-square-edit-outline"></i>
                        </Link>
                    </React.Fragment>
                );
            },
        },
    ];
    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <Row>
                <Col xl={6}>
                    <Table className="mb-0" sm={4} dark>
                        <tbody>
                            <tr>
                                <th>訪客姓名</th>
                                <td>{row.client_name}</td>
                                <th>拜訪時間</th>

                                <td>{<Moment format="YYYY-MM-DD HH:mm">{row.visit_time}</Moment>}</td>
                            </tr>
                            <tr>
                                <th>訪客電話</th>
                                <td>{row.client_phone}</td>
                                <th>訪客mail</th>
                                <td>{row.client_email}</td>
                            </tr>
                            <tr>
                                <th>遊戲角色：</th>
                                <th colSpan="3">
                                    {row.game_name ? `【${row.game_name}】` : ''}
                                    {row.role_name ? `${row.role_name}` : ''}
                                    {row.server_name ? `( ${row.server_name})` : ''}
                                </th>
                            </tr>
                            <tr>
                                <th>參考單號</th>
                                <td colSpan="3">
                                    {row.ref_q_id && (
                                        <a
                                            href={`https://manager.longeplay.com.tw/service/view/${row.ref_q_id}`}
                                            target="blank">
                                            提問單編號:{row.ref_q_id}
                                        </a>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th className="text-nowrap">親訪原因:</th>
                                <td colSpan="3">
                                    <span>{row.cause}</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="text-nowrap">備註記事：</th>
                                <td colSpan="3">
                                    <span dangerouslySetInnerHTML={{ __html: row.note }} />{' '}
                                </td>
                            </tr>
                            <tr>
                                <th>處理人員：</th>
                                <td>{row.admin_name}</td>
                                <th>建立時間：</th>
                                <td>{<Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        ),
    };

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
                    { label: '線下客服', path: mainPath, active: false },
                    { label: mainTitle, path: mainPath, active: true },
                ]}
                title={mainTitle}
            />
            <Row className="mb-2">
                <Col sm={4}>
                    <Link to={`${mainPath}/create`} className="btn btn-rounded btn-danger mb-3">
                        <i className="mdi mdi-plus-circle mr-2" /> 新增{mainTitle}
                    </Link>
                </Col>
                <Col md={8} sm={8}>
                    <Form inline className="mb-2 float-right">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="search" className="mr-sm-2">
                                關鍵字:
                            </Label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="查找訪客姓名,親訪原因,角色資訊..."
                                value={keyword}
                                onChange={e => setKeyword(e.target.value.trim())}
                            />
                        </FormGroup>
                        <Button
                            color={filter === 'keyword' ? 'primary' : 'light'}
                            onClick={() => filterStatus('keyword')}>
                            搜尋
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={arrangedData}
                                columns={columns}
                                defaultSorted={[
                                    {
                                        dataField: 'id',
                                        order: 'desc',
                                    },
                                ]}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                wrapperClasses="table-responsive"
                                expandRow={expandRow}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

PersonalVisitHome.propTypes = {
    getOfflineCsData: PropTypes.func.isRequired,
    records: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
};

const mapStateToProps = state => ({
    records: state.OfflineCs.records,
    loading: state.OfflineCs.loading,
    error: state.OfflineCs.error,
});

export default connect(
    mapStateToProps,
    { getOfflineCsData }
)(PersonalVisitHome);
