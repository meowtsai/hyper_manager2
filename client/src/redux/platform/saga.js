// @flow

import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { UPDATE_PASSWORD } from './constants';
import { updatePasswordSuccess, updatePasswordFailed } from './actions';

/**
 * Change password
 */
function* updatePassword({ payload: { account, password } }) {
    const options = {
        data: JSON.stringify({ account, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: '/api/platform/modify_password',
    };

    try {
        const response = yield axios(options);
        yield put(updatePasswordSuccess(response));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(updatePasswordFailed(message));
    }
}

export function* watchChangePassword(): any {
    yield takeEvery(UPDATE_PASSWORD, updatePassword);
}

function* PlatformSaga(): any {
    yield all([fork(watchChangePassword)]);
}

export default PlatformSaga;
