import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_BATCH_TASKS,
  EDIT_BATCH_TASK,
  DELETE_BATCH_TASK,
  GET_CURRENT_BATCH_TASK,
  REMOVE_BATCH_Q,
  REMOVE_Q_FROM_BATCH,
  BATCH_REPLY_ACTION
} from "./constants";

import {
  getBatchTasksSuccess,
  getBatchTasksFailed,
  editBatchTaskSuccess,
  editBatchTaskFailed,
  deleteBatchTaskSuccess,
  deleteBatchTaskFailed,
  getCurrentBatchTaskSuccess,
  getCurrentBatchTaskFailed,
  removeBatchQSuccess,
  removeBatchQFailed,
  removeQFromBatchSuccess,
  removeQFromBatchFailed,
  batchReplyActionSuccess,
  batchReplyActionFailed
} from "./actions";

/**
 * Get batch tasks list
 * @param {*} payload - task list & game list
 */
function* getBatchTasks() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/batch/list"
  };

  try {
    const response = yield axios(options);
    yield put(getBatchTasksSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(getBatchTasksFailed(message));
  }
}

/**
 * Get single record by its id { dataType, record_id },
 * @param {*} payload - dataType and record_id
 */
function* getCurrentBatch({ payload }) {
  //console.log('getCurrentRecord payload ', payload);
  //http://localhost:5000/api/batch/detail/80
  const { record_id, history } = payload;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/batch/detail/${record_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentBatchTaskSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = "內部伺服器發生錯誤";
        break;
      case 403:
        message = "權限不符合操作";
        //錯誤
        history.push("/pages/error-403");
        break;

      default:
        message = error.response.data;
    }
    yield put(getCurrentBatchTaskFailed(message));
  }
}

/**
 * edit(add or modify) gov letter record
 */
function* editRecord({ payload }) {
  const record = payload;
  const options = {
    data: record,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/batch/task"
  };
  try {
    const response = yield axios(options);

    yield put(editBatchTaskSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      default:
        message = error.response.data;
    }
    yield put(editBatchTaskFailed(message));
  }
}

/**
 * edit(add or modify) gov letter record
 */
function* batchReply({ payload }) {
  const replyData = payload;
  const options = {
    data: replyData,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/batch/batch_reply_json"
  };
  try {
    const response = yield axios(options);

    yield put(batchReplyActionSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      default:
        message = error.response.data;
    }
    yield put(batchReplyActionFailed(message));
  }
}

function* delBatchTask({ payload: { id, history } }) {
  //console.log("delBatchTask", payload);
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/batch/task/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(deleteBatchTaskSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteBatchTaskFailed(message));
  }
}

function* removeBatchQuestions({ payload }) {
  const batch_id = payload;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/batch/remove_batch_q/${batch_id}`
  };

  try {
    const response = yield axios(options);
    yield put(removeBatchQSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(removeBatchQFailed(message));
  }
}

function* removeQuestionFromBatch({ payload }) {
  const question_id = payload;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/batch/remove_from_batch/${question_id}`
  };

  try {
    const response = yield axios(options);
    yield put(removeQFromBatchSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(removeQFromBatchFailed(message));
  }
}
export function* watchGetBatchTasksData(): any {
  yield takeEvery(GET_BATCH_TASKS, getBatchTasks);
}

export function* watchEditBatchRecord(): any {
  yield takeEvery(EDIT_BATCH_TASK, editRecord);
}
export function* watchDeleteBatchRecord(): any {
  yield takeEvery(DELETE_BATCH_TASK, delBatchTask);
}

export function* watchgetCurrentBatch(): any {
  yield takeEvery(GET_CURRENT_BATCH_TASK, getCurrentBatch);
}

export function* watchgetRemoveBatchQ(): any {
  yield takeEvery(REMOVE_BATCH_Q, removeBatchQuestions);
}

export function* watchgetRemoveQFromBatch(): any {
  yield takeEvery(REMOVE_Q_FROM_BATCH, removeQuestionFromBatch);
}

export function* watchBatchReply(): any {
  yield takeEvery(BATCH_REPLY_ACTION, batchReply);
}

function* batchTaskSaga(): any {
  yield all([
    fork(watchGetBatchTasksData),
    fork(watchEditBatchRecord),
    fork(watchDeleteBatchRecord),
    fork(watchgetCurrentBatch),
    fork(watchgetRemoveBatchQ),
    fork(watchgetRemoveQFromBatch),
    fork(watchBatchReply)
  ]);
}

export default batchTaskSaga;
