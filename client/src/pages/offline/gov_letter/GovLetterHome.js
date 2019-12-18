import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../../components/PageTitle';
import { Row, Col, Button, Card, CardBody, Label, Table, Input, Form, FormGroup, Alert } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import classNames from 'classnames';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { getOfflineCsData } from '../../../redux/actions';
import Moment from 'react-moment';
import Spinner from '../../../components/Spinner';
import PropTypes from 'prop-types';

const GovLetterHome = ({ getOfflineCsData, records, loading, error }) => {
    const [keyword, setKeyword] = useState('');
    const [selGame, setSelGame] = useState('');
    const [filter, setFilter] = useState('all');
    const [arrangedData, setArrangedData] = useState([]);
    const [selStatus, setSelStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [gameOptions, setGameOptions] = useState([{ game_id: '', game_name: '' }]);


    const filterStatus = type => {
        //console.log('filter selGame', selGame);
        //console.log('filter status', selStatus);
        const gameFilter = (game_id, record) => {
            if (game_id !== '') {
                return record.game_id === game_id;
            }
            return true;
        };

        const statusFilter = (status, record) => {
            if (status !== '') {
                return record.status === status;
            }
            return true;
        };

        const newData = records.filter(
            record =>
                (record.o_letter_id.indexOf(keyword) > -1 ||
                    record.contact.indexOf(keyword) > -1 ||
                    record.role_name.indexOf(keyword) > -1) &&
                gameFilter(selGame, record) &&
                statusFilter(selStatus, record)
        );
        setFilter('keyword');
        setArrangedData(newData);
    };
    
    const mainTitle = "公函";
    useEffect(() => {
        //console.log('startDate', startDate);
        //console.log('endDate', endDate);
        getOfflineCsData('govletter');
        document.title = mainTitle;
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setArrangedData(records);

        const distinctGames = [];
        const map = new Map();
        for (const item of records) {
            if (!map.has(item.game_id)) {
                map.set(item.game_id, true);
                distinctGames.push({
                    game_id: item.game_id,
                    game_name: item.game_name,
                });
            }
        }
        setGameOptions(distinctGames);
    }, [records]);
    useEffect(() => {
        if (error) {
            setErrors(error);
        } else {
            setErrors({});
        }
    }, [error]);

    //#  	發文字號	發文日期	承辦人姓名	回文期限  	角色資訊	結案日期  	狀態	建立時間
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'o_letter_id',
            text: '發文字號',
            sort: true,
        },

        {
            dataField: 'o_letter_date',
            text: '發文日期',
            formatter: (cellContent, row) => {
                return <Moment format="YYYY/MM/DD">{row.o_letter_date}</Moment>;
            },
        },

        {
            dataField: 'contact',
            text: '承辦人姓名',
            sort: true,
        },
        {
            dataField: 'deadline',
            text: '回文期限',
            sort: true,
            formatter: (cellContent, row) => {
                return <Moment format="YYYY-MM-DD">{row.deadline}</Moment>;
            },
        },
        {
            dataField: 'role_info',
            isDummyField: true,
            text: '角色資訊',
            formatter: (cellContent, row) => {
                return (
                    <Fragment>
                        【{row.game_name}】{row.role_name} ({row.server_name})
                    </Fragment>
                );
            },
        },
        {
            dataField: 'close_date',
            text: '結案日期',
            sort: true,
            formatter: (cellContent, row) => {
                if (row.close_date) {
                    return <Moment format="YYYY-MM-DD">{row.close_date}</Moment>;
                }
            },
        },
        {
            dataField: 'formated_status',
            text: '狀態',
            sort: false,
            formatter: (cell, row) => {
                return (
                    <React.Fragment>
                        <h5>
                            <span
                                className={classNames('badge', {
                                    'badge-success-lighten': row.status === '4',
                                    'badge-danger-lighten': row.status === '1',
                                })}>
                                {row.status === '4' && <i className="mdi mdi-check mr-1"></i>}
                                {row.status === '1' && <i className="mdi mdi-timer-sand mr-1"></i>}
                                {cell}
                            </span>
                        </h5>
                    </React.Fragment>
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
            dataField: 'action',
            isDummyField: true,
            text: '操作',
            formatter: (cell, row) => {
                return (
                    <React.Fragment>
                        <Link to={`/offline/gov_letter/edit/${row.id}`} className="action-icon">
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
        showExpandColumn: true,
        expandByColumnOnly: true,
        renderer: row => (
            <Row>
                <Col xl={6}>
                    <Table className="mb-0" sm={4} dark>
                        <tbody>
                            <tr>
                                <th>狀態</th>
                                <td colSpan="3">
                                    {row.formated_status}(結案日期:
                                    {<Moment format="YYYY-MM-DD">{row.deadline}</Moment>})
                                </td>
                            </tr>
                            <tr>
                                <th>發文字號：</th>
                                <td>{row.o_letter_id}</td>
                                <th>承辦人：</th>
                                <td>{row.contact}</td>
                            </tr>
                            <tr>
                                <th>發文日期：</th>
                                <td>{<Moment format="YYYY-MM-DD">{row.o_letter_date}</Moment>}</td>
                                <th>回覆期限：</th>
                                <td>{<Moment format="YYYY-MM-DD">{row.deadline}</Moment>} </td>
                            </tr>
                            <tr>
                                <th>遊戲角色：</th>
                                <th colSpan="3">
                                    【{row.game_name}】{row.role_name} ({row.server_name})
                                </th>
                            </tr>
                            <tr>
                                <th>處理人員：</th>
                                <td>{row.admin_name}</td>
                                <th>建立時間：</th>
                                <td>{<Moment format="YYYY-MM-DD HH:mm">{row.create_time}</Moment>}</td>
                            </tr>
                            <tr>
                                <th className="text-nowrap">備註記事：</th>
                                <td colSpan="3">
                                    <span dangerouslySetInnerHTML={{ __html: row.note }} />{' '}
                                </td>
                            </tr>
                            <tr>
                                <th>相關檔案：</th>
                                <td colSpan="3">
                                    {row.file_path && (
                                        <div>
                                            <a target="blank" href={row.file_path}>
                                                * 公函檔案1
                                            </a>
                                        </div>
                                    )}
                                    {row.file_path2 && (
                                        <div>
                                            <a target="blank" href={row.file_path2}>
                                                * 公函檔案2
                                            </a>
                                        </div>
                                    )}
                                    {row.file_path3 && (
                                        <div>
                                            <a target="blank" href={row.file_path3}>
                                                * 公函檔案3
                                            </a>
                                        </div>
                                    )}
                                </td>
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
                    { label: '線下客服', path: '/offline/gov_letter', active: false },
                    { label: mainTitle, path: '/offline/gov_letter', active: true },
                ]}
                title={mainTitle }
            />
            <Row className="mb-2">
                <Col sm={4}>
                    <Link to="/offline/gov_letter/create" className="btn btn-rounded btn-danger mb-3">
                        <i className="mdi mdi-plus-circle mr-2" /> 新增公函
                    </Link>
                </Col>
                <Col md={8} sm={8}>
                    <Form inline className="mb-2 float-right">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="status" className="mr-sm-2">
                                遊戲:
                            </Label>
                            <Input
                                type="select"
                                name="sel_game"
                                id="sel_game"
                                className="custom-select"
                                onChange={e => setSelGame(e.target.value)}>
                                <option value="">選擇遊戲...</option>
                                {gameOptions.map(game => (
                                    <option key={`sel-${game.game_id}`} value={game.game_id}>
                                        {game.game_name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="status" className="mr-sm-2">
                                狀態:
                            </Label>
                            <Input
                                type="select"
                                name="sel_status"
                                id="sel_status"
                                className="custom-select"
                                onChange={e => setSelStatus(e.target.value)}>
                                <option value="">狀態...</option>
                                <option value="1">1-處理中</option>
                                <option value="4">4-已結案</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="search" className="mr-sm-2">
                                關鍵字:
                            </Label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="查找發文字號, 角色名稱, 承辦人..."
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

GovLetterHome.propTypes = {
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
)(GovLetterHome);
