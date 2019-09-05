// @flow

import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_USERS } from './constants';

import { getAdminUsersSuccess, getAdminUsersFailed } from './actions';

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getAdminUsersByRole({ payload: role }) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `/api/admin_users/getAdminUsersByRole/${role}`,
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

export function* watchGetData(): any {
    yield takeEvery(GET_USERS, getAdminUsersByRole);
}

function* adminUsersSaga(): any {
    yield all([fork(watchGetData)]);
}

export default adminUsersSaga;
