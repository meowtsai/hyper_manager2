// @flow
import {
    GET_GOV_DATA,
    GET_GOV_DATA_SUCCESS,
    GET_GOV_DATA_FAILED,
    EDIT_RECORD,
    EDIT_RECORD_SUCCESS,
    EDIT_RECORD_FAILED,
    GET_CURRENT,
    GET_CURRENT_SUCCESS,
    GET_CURRENT_FAILED,
} from './constants';

type OfflineCsAction = { type: string, payload: {} | string };

export const getOfflineCsData = (dataType: string): OfflineCsAction => ({
    type: GET_GOV_DATA,
    payload: dataType,
});

export const getOfflineCsDataSuccess = (records: []): OfflineCsAction => ({
    type: GET_GOV_DATA_SUCCESS,
    payload: records,
});

export const getOfflineCsDataFailed = (error: string): OfflineCsAction => ({
    type: GET_GOV_DATA_FAILED,
    payload: error,
});

export const editRecord = (dataType: string, record: FormData): OfflineCsAction => ({
    type: EDIT_RECORD,
    payload: { dataType, record },
});

export const editRecordSuccess = (result: {}): OfflineCsAction => ({
    type: EDIT_RECORD_SUCCESS,
    payload: result.affectedId,
});

export const editRecordFailed = (errors: {} | string): OfflineCsAction => ({
    type: EDIT_RECORD_FAILED,
    payload: errors,
});
export const getCurrentRecord = (dataType: string, record_id: int, history: {}): OfflineCsAction => ({
    type: GET_CURRENT,
    payload: { dataType, record_id, history },
});

export const getCurrentRecordSuccess = (record: {}): OfflineCsAction => ({
    type: GET_CURRENT_SUCCESS,
    payload: record,
});

export const getCurrentRecordFailed = (error: string): OfflineCsAction => ({
    type: GET_CURRENT_FAILED,
    payload: error,
});
