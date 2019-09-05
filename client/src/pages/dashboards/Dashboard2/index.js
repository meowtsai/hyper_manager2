// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import HyperDatepicker from '../../../components/Datepicker';

const EcommerceDashboardPage = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="form-inline">
                                <div className="form-group">
                                    <HyperDatepicker />
                                </div>
                                <button className="btn btn-primary ml-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                                <button className="btn btn-primary ml-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard 222</h4>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EcommerceDashboardPage;
