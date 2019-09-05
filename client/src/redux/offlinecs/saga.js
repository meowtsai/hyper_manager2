// @flow

import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_GOV_DATA, EDIT_RECORD, GET_CURRENT } from './constants';

import {
    getOfflineCsDataSuccess,
    getOfflineCsDataFailed,
    editRecordSuccess,
    editRecordFailed,
    getCurrentRecordSuccess,
    getCurrentRecordFailed,
} from './actions';

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getData({ payload: type }) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `/api/offline_cs/${type === 'govletter' ? 'gov_list' : 'pv_list'}`,
    };

    try {
        const response = yield axios(options);
        yield put(getOfflineCsDataSuccess(response.data));
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
            case 403:
                message = error.response.data;
                break;
            default:
                message = error;
        }
        yield put(getOfflineCsDataFailed(message));
    }
}

/**
 * edit(add or modify) gov letter record
 */
function* editRecord({ payload }) {
    //console.log('editGovRecord *****', payload);
    const { dataType, record } = payload;
    //headers: { "Content-Type": "multipart/form-data" }
    const options = {
        data: record,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `/api/offline_cs/${dataType === 'govletter' ? 'gov_list' : 'pv_list'}`,
    };

    try {
        const response = yield axios(options);
        //console.log('editGovRecordSuccess editGovRecord', response);
        yield put(editRecordSuccess(response.data));
    } catch (error) {
        //console.log('error editGovRecord', error.response.data);
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error.response.data;
        }
        yield put(editRecordFailed(message));
    }
}

/**
 * Get single record by its id { dataType, record_id },
 * @param {*} payload - dataType and record_id
 */
function* getCurrentRecord({ payload }) {
    //console.log('getCurrentRecord payload ', payload);
    const { dataType, record_id } = payload;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `/api/offline_cs/${dataType === 'govletter' ? 'gov_list' : 'pv_list'}/detail/${record_id}`,
    };

    try {
        const response = yield axios(options);
        yield put(getCurrentRecordSuccess(response.data));
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
            case 400:
                message = error.response.data.msg;
                break;
            default:
                message = error.response.data;
        }
        yield put(getCurrentRecordFailed(message));
    }
}

export function* watchGetData(): any {
    yield takeEvery(GET_GOV_DATA, getData);
}
export function* watchGetCurrentRecordData(): any {
    yield takeEvery(GET_CURRENT, getCurrentRecord);
}
export function* watchEditRecord(): any {
    yield takeEvery(EDIT_RECORD, editRecord);
}

function* offlineCsSaga(): any {
    yield all([fork(watchGetData), fork(watchEditRecord), fork(watchGetCurrentRecordData)]);
}

export default offlineCsSaga;
