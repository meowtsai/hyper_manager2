// @flow

import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_USERS, GET_USER_TASKS, GET_USER_LOGS } from './constants';

import {
  getAdminUsersSuccess,
  getAdminUsersFailed,
  getUserTasksSuccess,
  getUserTasksFailed,
  getUserLogsFailed,
  getUserLogsSuccess
} from './actions';

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getAdminUsersByRole({ payload: role }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url: `/api/admin_users/getAdminUsersByRole/${role}`
  };

  try {
    const response = yield axios(options);
    yield put(getAdminUsersSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = '內部伺服器發生錯誤';
        break;
      case 401:
        message = '帳號或密碼錯誤';
        break;
      default:
        message = error;
    }
    yield put(getAdminUsersFailed(message));
  }
}

/**
 * Get user tasks, like favourite, allocation tasks
 * @param {*} payload - uid
 */
function* getUserTask() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url: `/api/admin_users/getUserTasks`
  };

  try {
    const response = yield axios(options);
    yield put(getUserTasksSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = '內部伺服器發生錯誤';
        break;
      case 401:
        message = '帳號或密碼錯誤';
        break;
      default:
        message = error.response.data;
    }
    yield put(getAdminUsersFailed(message));
  }
}
/**
 * Get user logs
 * @param {*} payload - date_begin date_end
 */
function* getUserLog({ payload: { date_begin, date_end } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url: `/api/admin_users/getUserLogs?date_begin=${date_begin}&date_end=${date_end}`
  };

  try {
    const response = yield axios(options);
    yield put(getUserLogsSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = '內部伺服器發生錯誤';
        break;
      case 401:
        message = '帳號或密碼錯誤';
        break;
      default:
        message = error.response.data;
    }
    yield put(getUserLogsFailed(message));
  }
}
export function* watchGetData(): any {
  yield takeEvery(GET_USERS, getAdminUsersByRole);
}

export function* watchGetUserTasks(): any {
  yield takeEvery(GET_USER_TASKS, getUserTask);
}
export function* watchGetUserLogs(): any {
  yield takeEvery(GET_USER_LOGS, getUserLog);
}

function* adminUsersSaga(): any {
  yield all([
    fork(watchGetData),
    fork(watchGetUserTasks),
    fork(watchGetUserLogs)
  ]);
}

export default adminUsersSaga;
