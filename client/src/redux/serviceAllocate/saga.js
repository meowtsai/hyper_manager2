import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALLOCATE_DATA,
  GET_ALLOCATE_BY_ID,
  POST_ALLOCATION,
  PUT_ALLOCATION,
  TAKE_ALLOCATION_TASKS,
  REASSIGN_ALLOCATION_TASK
} from "./constants";

import {
  getAllocateDataSuccess,
  getAllocateDataFailed,
  getAllocateByIdFailed,
  getAllocateByIdSuccess,
  postAllocationSuccess,
  postAllocationFailed,
  putAllocationSuccess,
  putAllocationFailed,
  takeAllocationTasksSuccess,
  takeAllocationTasksFailed,
  reassignAllocationTaskSuccess,
  reassignAllocationTaskFailed
} from "./actions";

/**
 * Get Servers list by provided gameid
 * @param {*} condition { allocate_admin_uid: xx, status:2 etc...} -
 */
function* getAllocateData({ payload: condition }) {
  //console.log("getAllocateData condition", condition);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/list`
  };

  try {
    const response = yield axios(options);
    yield put(getAllocateDataSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = "內部伺服器發生錯誤";
        break;
      case 401:
        message = "帳號或密碼錯誤";
        break;
      default:
        message = error;
    }
    yield put(getAllocateDataFailed(message));
  }
}

function* getAllocateById({ payload: id }) {
  //console.log(" getAllocateById id", id);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(getAllocateByIdSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data;
    yield put(getAllocateByIdFailed(message));
  }
}
function* postAllocation({ payload: { qid, allocation_cause } }) {
  //console.log(" postAllocation id", qid, allocation_cause);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/`,
    data: { question_id: qid, allocate_cause: allocation_cause }
  };

  try {
    const response = yield axios(options);
    yield put(postAllocationSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data;
    yield put(postAllocationFailed(message));
  }
}

//{"allocation_id":3 , "new_assignee":86}
function* reassignAllocation({ payload: { allocation_id, new_assignee } }) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/reassign`,
    data: { allocation_id, new_assignee }
  };

  try {
    const response = yield axios(options);
    yield put(reassignAllocationTaskSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data;
    yield put(reassignAllocationTaskFailed(message));
  }
}

function* putAllocation({ payload }) {
  //console.log(" postAllocation id", payload);

  //const {} = payload;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/`,
    data: payload
  };

  try {
    const response = yield axios(options);
    yield put(putAllocationSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data;
    yield put(putAllocationFailed(message));
  }
}

function* takeAllocationTasks() {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/allocation/take_allocation_tasks`
  };

  try {
    const response = yield axios(options);
    yield put(takeAllocationTasksSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(takeAllocationTasksFailed(message));
  }
}

export function* watchGetData(): any {
  yield takeEvery(GET_ALLOCATE_DATA, getAllocateData);
}

export function* watchGetDataById(): any {
  yield takeEvery(GET_ALLOCATE_BY_ID, getAllocateById);
}

export function* watchPostAllocationData(): any {
  yield takeEvery(POST_ALLOCATION, postAllocation);
}

export function* watchPutAllocationData(): any {
  yield takeEvery(PUT_ALLOCATION, putAllocation);
}

export function* watchTakeAllocationTasks(): any {
  yield takeEvery(TAKE_ALLOCATION_TASKS, takeAllocationTasks);
}

export function* watchReassignAllocation(): any {
  yield takeEvery(REASSIGN_ALLOCATION_TASK, reassignAllocation);
}

function* serviceAllocateSaga(): any {
  yield all([
    fork(watchGetData),
    fork(watchGetDataById),
    fork(watchPostAllocationData),
    fork(watchPutAllocationData),
    fork(watchTakeAllocationTasks),
    fork(watchReassignAllocation)
  ]);
}

export default serviceAllocateSaga;
