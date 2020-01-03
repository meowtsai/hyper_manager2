// @flow
import {
  GET_BATCH_TASKS,
  GET_BATCH_TASKS_SUCCESS,
  GET_BATCH_TASKS_FAILED,
  EDIT_BATCH_TASK,
  EDIT_BATCH_TASK_SUCCESS,
  EDIT_BATCH_TASK_FAILED,
  DELETE_BATCH_TASK,
  DELETE_BATCH_TASK_SUCCESS,
  DELETE_BATCH_TASK_FAILED,
  CLEAR_BATCH_TASK_MESSAGE,
  GET_CURRENT_BATCH_TASK,
  GET_CURRENT_BATCH_TASK_SUCCESS,
  GET_CURRENT_BATCH_TASK_FAILED,
  ADD_QUESTION_TO_BATCH,
  ADD_QUESTION_TO_BATCH_SUCCESS,
  ADD_QUESTION_TO_BATCH_FAILED,
  REMOVE_BATCH_Q,
  REMOVE_BATCH_Q_SUCCESS,
  REMOVE_BATCH_Q_FAILED,
  REMOVE_Q_FROM_BATCH,
  REMOVE_Q_FROM_BATCH_SUCCESS,
  REMOVE_Q_FROM_BATCH_FAILED,
  BATCH_REPLY_ACTION,
  BATCH_REPLY_ACTION_SUCCESS,
  BATCH_REPLY_ACTION_FAILED
} from "./constants";

type BatchTaskAction = { type: string, payload: {} | string };

export const getBatchTasks = (): BatchTaskAction => ({
  type: GET_BATCH_TASKS
});

export const getBatchTasksSuccess = (data: []): BatchTaskAction => ({
  type: GET_BATCH_TASKS_SUCCESS,
  payload: data
});

export const getBatchTasksFailed = (errors: {} | string): BatchTaskAction => ({
  type: GET_BATCH_TASKS_FAILED,
  payload: errors
});

export const editBatchTask = (record: {}): BatchTaskAction => ({
  type: EDIT_BATCH_TASK,
  payload: record
});

export const editBatchTaskSuccess = (result: {}): BatchTaskAction => ({
  type: EDIT_BATCH_TASK_SUCCESS,
  payload: result
});

export const editBatchTaskFailed = (errors: {} | string): BatchTaskAction => ({
  type: EDIT_BATCH_TASK_FAILED,
  payload: errors
});

export const deleteBatchTask = (id: string, history: {}): BatchTaskAction => ({
  type: DELETE_BATCH_TASK,
  payload: { id, history }
});

export const deleteBatchTaskSuccess = (result: {}): BatchTaskAction => ({
  type: DELETE_BATCH_TASK_SUCCESS,
  payload: result
});

export const deleteBatchTaskFailed = (
  errors: {} | string
): BatchTaskAction => ({
  type: DELETE_BATCH_TASK_FAILED,
  payload: errors
});

export const clearBatchTaskMessage = (): BatchTaskAction => ({
  type: CLEAR_BATCH_TASK_MESSAGE
});

export const getCurrentBatchTask = (
  record_id: int,
  history: {}
): BatchTaskAction => ({
  type: GET_CURRENT_BATCH_TASK,
  payload: { record_id, history }
});

export const getCurrentBatchTaskSuccess = (record: {}): BatchTaskAction => ({
  type: GET_CURRENT_BATCH_TASK_SUCCESS,
  payload: record
});

export const getCurrentBatchTaskFailed = (error: string): BatchTaskAction => ({
  type: GET_CURRENT_BATCH_TASK_FAILED,
  payload: error
});

export const removeBatchQ = (batch_id: number): BatchTaskAction => ({
  type: REMOVE_BATCH_Q,
  payload: batch_id
});

export const removeBatchQSuccess = (result: {}): BatchTaskAction => ({
  type: REMOVE_BATCH_Q_SUCCESS,
  payload: result
});

export const removeBatchQFailed = (errors: {} | string): BatchTaskAction => ({
  type: REMOVE_BATCH_Q_FAILED,
  payload: errors
});

export const removeQFromBatch = (question_id: number): BatchTaskAction => ({
  type: REMOVE_Q_FROM_BATCH,
  payload: question_id
});

export const removeQFromBatchSuccess = (result: {}): BatchTaskAction => ({
  type: REMOVE_Q_FROM_BATCH_SUCCESS,
  payload: result
});

export const removeQFromBatchFailed = (
  errors: {} | string
): BatchTaskAction => ({
  type: REMOVE_Q_FROM_BATCH_FAILED,
  payload: errors
});

//回覆批次問題
//data: `batch_id=${batch_id}&new_type=${new_type}&post_content=${post_content}&mode=${mode}`,
export const batchReplyAction = (replyData: {}): BatchTaskAction => ({
  type: BATCH_REPLY_ACTION,
  payload: replyData
});

export const batchReplyActionSuccess = (result: {}): BatchTaskAction => ({
  type: BATCH_REPLY_ACTION_SUCCESS,
  payload: result
});

export const batchReplyActionFailed = (
  errors: {} | string
): BatchTaskAction => ({
  type: BATCH_REPLY_ACTION_FAILED,
  payload: errors
});
