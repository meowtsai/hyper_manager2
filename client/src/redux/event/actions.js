import {
  GET_SERIAL_RECORDS,
  GET_SERIAL_RECORDS_SUCCESS,
  GET_SERIAL_RECORDS_FAILED
} from './constants';

type EventAction = { type: string, payload: {} | string };

export const getSerialEventRecords = (event_id: Number): EventAction => ({
  type: GET_SERIAL_RECORDS,
  payload: event_id
});

export const getSerialEventRecordsSuccess = (data: []): EventAction => ({
  type: GET_SERIAL_RECORDS_SUCCESS,
  payload: data
});

export const getSerialEventRecordsFailed = (error: string): EventAction => ({
  type: GET_SERIAL_RECORDS_FAILED,
  payload: error
});
