// @flow
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import moment from 'moment';
import HyperDatepicker from '../../../components/Datepicker';
import Performers from './Performers';
import GameDistBarchart from './GameDistBarchart';
import LoaderWidget from '../../../components/Loader';
import { getData } from '../../../redux/actions';
import YearlyPerformanceChart from './YearlyPerformanceChart';
import ServiceReport from './ServiceReport';

const AdminDashboardPage = ({ getData, stat, loading, error }) => {
    //console.log('stat loading', stat, loading);

    const { summary } = stat;
    const [startDate, setStartDate] = useState(new Date(moment().subtract(7, 'days')));
    const [endDate, setEndDate] = useState(new Date());

    const [gameDistData, setGameDistData] = useState(summary ? summary.allocateCount.result : []);
    //console.log('gameDistData', gameDistData);

    const selectStaff = uid => {
        //console.log("selectStaff", uid);
        if (uid === '') {
        } else {
        }
        const found_data =
            uid === '' ? summary.allocateCount : summary.allocateCountByMember.find(data => data.admin_uid === uid);

        setGameDistData(found_data.result);
    };

    useEffect(() => {
        //console.log('startDate', startDate);
        //console.log('endDate', endDate);
        getData(startDate, endDate);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        //console.log(' stat useEffect', loading);
        if (!loading) {
            if (stat.forAdmin) {
                setGameDistData(summary.allocateCount.result);
            }
        }
    }, [stat]);

    const handleSubmit = e => {
        e.preventDefault();
        getData(startDate, endDate);
    };

    return (
        <Fragment>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="form-inline" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <HyperDatepicker
                                            className="form-control form-control-dark"
                                            dateFormat="yyyy/MM/dd"
                                            selected={startDate}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={date => setStartDate(date)}
                                        />
                                    </div>
                                    ~
                                    <div className="input-group">
                                        <HyperDatepicker
                                            className="form-control form-control-dark"
                                            dateFormat="yyyy/MM/dd"
                                            selected={endDate}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={date => setEndDate(date)}
                                            minDate={startDate}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary ml-2">
                                    <i className="mdi mdi-autorenew" />
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>

            {error && (
                <Alert color="danger" isOpen={error ? true : false}>
                    {error}
                </Alert>
            )}
            {loading ? (
                <LoaderWidget />
            ) : stat.forAdmin ? (
                <Fragment>
                    <Row>
                        <Col xl={6} lg={6}>
                            <Performers period_report={summary.csSummary} />
                        </Col>

                        <Col xl={6} lg={6}>
                            <GameDistBarchart
                                stat={gameDistData}
                                cs_members={summary.cs_members}
                                selectStaff={selectStaff}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <YearlyPerformanceChart chrart_data={summary.csSummaryByYear} />
                        </Col>
                    </Row>
                </Fragment>
            ) : (
                <ServiceReport stat={stat} />
            )}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    stat: state.Dashboard.stat,
    loading: state.Dashboard.loading,
    error: state.Dashboard.error,
});

export default connect(
    mapStateToProps,
    { getData }
)(AdminDashboardPage);
