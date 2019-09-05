import axios from 'axios';

import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_SERVERS } from './constants';

import { getServersSuccess, getServersFailed } from './actions';

/**
 * Get Servers list by provided gameid
 * @param {*} gameId -
 */
function* getServersByGameId({ payload: gameId }) {
    //console.log('getServersByGameId', gameId);
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `/api/servers/list/${gameId}`,
    };

    try {
        const response = yield axios(options);
        yield put(getServersSuccess(response.data));
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
        yield put(getServersFailed(message));
    }
}

export function* watchGetData(): any {
    yield takeEvery(GET_SERVERS, getServersByGameId);
}

function* serversSaga(): any {
    yield all([fork(watchGetData)]);
}

export default serversSaga;
