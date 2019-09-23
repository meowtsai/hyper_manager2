// @flow
import {
  GET_ALLOCATE_DATA,
  GET_ALLOCATE_DATA_SUCCESS,
  GET_ALLOCATE_DATA_FAILED
} from "./constants";

type ServiceAllocateAction = { type: string, payload: {} | string };

export const getAllocateData = (condition: {}): ServiceAllocateAction => ({
  type: GET_ALLOCATE_DATA,
  payload: condition
});

export const getAllocateDataSuccess = (data: []): ServiceAllocateAction => ({
  type: GET_ALLOCATE_DATA_SUCCESS,
  payload: data
});

export const getAllocateDataFailed = (
  error: string
): ServiceAllocateAction => ({
  type: GET_ALLOCATE_DATA_FAILED,
  payload: error
});
