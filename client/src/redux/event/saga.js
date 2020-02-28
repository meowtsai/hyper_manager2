import axios from 'axios';

import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_SERIAL_RECORDS } from './constants';

import {
  getSerialEventRecordsSuccess,
  getSerialEventRecordsFailed
} from './actions';

function* getSerialRecords({ payload }) {
  console.log('getSerialRecords', payload);
  const event_id = payload;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url: `/api/events/serialRecords/${event_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getSerialEventRecordsSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(getSerialEventRecordsFailed(message));
  }
}

export function* watchGetSerialRecords(): any {
  yield takeEvery(GET_SERIAL_RECORDS, getSerialRecords);
}

function* EventSaga(): any {
  yield all([fork(watchGetSerialRecords)]);
}

export default EventSaga;
