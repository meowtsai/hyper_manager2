// @flow

import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_GAMES_DATA } from './constants';

import { getGamesSuccess, getGamesFailed } from './actions';

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getGames() {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: '/api/games/list',
    };

    try {
        const response = yield axios(options);
        yield put(getGamesSuccess(response.data));
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
        yield put(getGamesFailed(message));
    }
}

export function* watchGetData(): any {
    yield takeEvery(GET_GAMES_DATA, getGames);
}

function* gamesSaga(): any {
    yield all([fork(watchGetData)]);
}

export default gamesSaga;
