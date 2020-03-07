import React, { useState, useEffect, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  NavLink,
  UncontrolledCollapse,
  Table
} from 'reactstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const UserRelaventData = ({ data }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div id='accordion' className='custom-accordion mb-4'>
      <Card className='mb-0'>
        <CardHeader>
          <h5 className='m-0'>
            <NavLink
              className='custom-accordion-title d-block pt-2 pb-2'
              id='group1'
              href='#'>
              🗂️ 歷史提問單 ({data.length})
              <span className='float-right'>
                <i className='mdi mdi-chevron-down accordion-arrow'></i>
              </span>
            </NavLink>
          </h5>
        </CardHeader>
        <UncontrolledCollapse toggler='#group1'>
          <CardBody>
            <div className='text-muted'>
              {' '}
              共{data.length}筆{' '}
              {data.length > 20 && !expand ? '目前顯示最近20筆' : ''}
              {data.length > 20 ? (
                expand ? (
                  <span
                    className='float-right'
                    style={{ cursor: 'pointer' }}
                    onClick={e => setExpand(!expand)}>
                    <i className='mdi mdi-collapse-all-outline' /> 收合
                  </span>
                ) : (
                  <span
                    className='float-right'
                    style={{ cursor: 'pointer' }}
                    onClick={e => setExpand(!expand)}>
                    <i className='mdi mdi-expand-all-outline' /> 展開
                  </span>
                )
              ) : null}
            </div>
            <Table className='mb-0 font-13 text-muted' size='sm'>
              <tbody>
                {(expand ? data : data.filter((x, i) => i < 20)).map(
                  (record, index) => {
                    return (
                      <tr key={`urd_${index}`}>
                        <th scope='row'>{record.id}</th>
                        <td>{record.game_name}</td>
                        <td>
                          <a
                            href={`/service/view/${record.id}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-info font-weight-bold mb-1 d-block'>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  record.content.length > 20
                                    ? record.content.substr(0, 20) + '...'
                                    : record.content
                              }}
                              title={record.content}></p>
                          </a>
                        </td>
                        <td>
                          <Moment format='YYYY-MM-DD HH:mm:ss'>
                            {record.create_time}
                          </Moment>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </CardBody>
        </UncontrolledCollapse>
      </Card>
    </div>
  );
};

UserRelaventData.propTypes = {
  data: PropTypes.array.isRequired
};

export default UserRelaventData;
