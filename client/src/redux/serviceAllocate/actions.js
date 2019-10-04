// @flow
import {
  GET_ALLOCATE_DATA,
  GET_ALLOCATE_DATA_SUCCESS,
  GET_ALLOCATE_DATA_FAILED,
  GET_ALLOCATE_BY_ID,
  GET_ALLOCATE_BY_ID_SUCCESS,
  GET_ALLOCATE_BY_ID_FAILED,
  POST_ALLOCATION,
  POST_ALLOCATION_SUCCESS,
  POST_ALLOCATION_FAILED,
  PUT_ALLOCATION,
  PUT_ALLOCATION_SUCCESS,
  PUT_ALLOCATION_FAILED,
  TAKE_ALLOCATION_TASKS,
  TAKE_ALLOCATION_TASKS_SUCCESS,
  TAKE_ALLOCATION_TASKS_FAILED,
  REASSIGN_ALLOCATION_TASK,
  REASSIGN_ALLOCATION_TASK_SUCCESS,
  REASSIGN_ALLOCATION_TASK_FAILED,
  CLEAR_ALLOCATION_MESSAGE
} from "./constants";

type ServiceAllocateAction = { type: string, payload: {} | string };

export const reassignAllocationTask = (
  allocation_id,
  new_assignee
): ServiceAllocateAction => ({
  type: REASSIGN_ALLOCATION_TASK,
  payload: { allocation_id, new_assignee }
});

export const reassignAllocationTaskSuccess = (
  data: []
): ServiceAllocateAction => ({
  type: REASSIGN_ALLOCATION_TASK_SUCCESS,
  payload: data
});

export const reassignAllocationTaskFailed = (
  error: string
): ServiceAllocateAction => ({
  type: REASSIGN_ALLOCATION_TASK_FAILED,
  payload: error
});

export const takeAllocationTasks = (): ServiceAllocateAction => ({
  type: TAKE_ALLOCATION_TASKS
});

export const takeAllocationTasksSuccess = (
  data: []
): ServiceAllocateAction => ({
  type: TAKE_ALLOCATION_TASKS_SUCCESS,
  payload: data
});

export const takeAllocationTasksFailed = (
  error: string
): ServiceAllocateAction => ({
  type: TAKE_ALLOCATION_TASKS_FAILED,
  payload: error
});

export const getAllocateById = (id: string): ServiceAllocateAction => ({
  type: GET_ALLOCATE_BY_ID,
  payload: id
});

export const getAllocateByIdSuccess = (data: []): ServiceAllocateAction => ({
  type: GET_ALLOCATE_BY_ID_SUCCESS,
  payload: data
});

export const getAllocateByIdFailed = (
  error: string
): ServiceAllocateAction => ({
  type: GET_ALLOCATE_BY_ID_FAILED,
  payload: error
});

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

export const postAllocation = (
  qid,
  allocation_cause
): ServiceAllocateAction => ({
  type: POST_ALLOCATION,
  payload: { qid, allocation_cause }
});

export const postAllocationSuccess = (data: []): ServiceAllocateAction => ({
  type: POST_ALLOCATION_SUCCESS,
  payload: data
});

export const postAllocationFailed = (error: string): ServiceAllocateAction => ({
  type: POST_ALLOCATION_FAILED,
  payload: error
});

export const putAllocation = (data: {}): ServiceAllocateAction => ({
  type: PUT_ALLOCATION,
  payload: data
});

export const putAllocationSuccess = (data: []): ServiceAllocateAction => ({
  type: PUT_ALLOCATION_SUCCESS,
  payload: data
});

export const putAllocationFailed = (error: string): ServiceAllocateAction => ({
  type: PUT_ALLOCATION_FAILED,
  payload: error
});
export const clearAllocationMessage = (): ServiceAction => ({
  type: CLEAR_ALLOCATION_MESSAGE
});
