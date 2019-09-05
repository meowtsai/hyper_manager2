// @flow
import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from './constants';

type DashboardAction = { type: string, payload: {} | string };

export const getData = (startDate: date, endDate: date): DashboardAction => ({
    type: GET_DATA,
    payload: { startDate, endDate },
});

export const getDataSuccess = (summary: {}): DashboardAction => ({
    type: GET_DATA_SUCCESS,
    payload: summary,
});

export const getDataFailed = (error: string): DashboardAction => ({
    type: GET_DATA_FAILED,
    payload: error,
});
