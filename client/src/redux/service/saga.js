import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_QUESTIONS,
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_TYPE,
  GET_TEST_DATA,
  GET_OVERVIEW,
  GET_SERVICE_STATISTICS,
  GET_CURRENT_QUESTION,
  ALLOCATE_QUESTION,
  REPLY_QUESTION,
  CLOSE_QUESTION,
  GET_SERVICE_CONFIG,
  GET_QUESTIONS_BY_USER,
  FAVORITE_QUESTION_ACTION,
  ADD_QUESTION_TO_BATCH,
  REMOVE_QUESTION_FROM_BATCH,
  ADD_MULTIPLE_QUESTIONS_TO_BATCH
} from "./constants";

import {
  getQuestionsSuccess,
  getQuestionsFailed,
  updateQuestionStatusFailed,
  updateQuestionStatusSuccess,
  updateQuestionTypeSuccess,
  updateQuestionTypeFailed,
  getTestDataSuccess,
  getTestDataFailed,
  getOverviewSuccess,
  getOverviewFailed,
  getServiceStatisticsSuccess,
  getServiceStatisticsFailed,
  getCurrentQuestionFailed,
  getCurrentQuestionSuccess,
  allocateQuestionSuccess,
  allocateQuestionFailed,
  replyQuestionSuccess,
  replyQuestionFailed,
  closeQuestionSuccess,
  closeQuestionFailed,
  getServiceConfigSuccess,
  getQuestionsByUserSuccess,
  getQuestionsByUserFailed,
  favorQuestionFailed,
  favorQuestionSuccess,
  addQuestionToBatchSuccess,
  addQuestionToBatchFailed,
  removeQuestionFromBatchSuccess,
  removeQuestionFromBatchFailed,
  addMultipleQuestionsToBatchSuccess,
  addMultipleQuestionsToBatchFailed
} from "./actions";

/**
 * Get Servers list by provided gameid
 * @param {*} condition { allocate_admin_uid: xx, status:2 etc...} -
 */
function* getQuestionsData({ payload: condition }) {
  //console.log("getQuestionsData condition", condition);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/getList`,
    data: condition
  };

  try {
    const response = yield axios(options);
    yield put(getQuestionsSuccess(response.data));
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
    yield put(getQuestionsFailed(message));
  }
}

function* getCurrentQuestionData({ payload: question_id }) {
  //console.log("getCurrentQuestionData question_id", question_id);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/view/${question_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentQuestionSuccess(response.data));
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
    yield put(getCurrentQuestionFailed(message));
  }
}

function* getQuestionsByUserData({ payload: question_id }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/list_by_user/${question_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getQuestionsByUserSuccess(response.data));
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
        message = error.response.msg;
    }
    yield put(getQuestionsByUserFailed(message));
  }
}
function* getTestData({ payload: condition }) {
  //console.log("getQuestionsData condition", condition);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/test`
  };

  try {
    const response = yield axios(options);
    yield put(getTestDataSuccess(response.data));
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
    yield put(getTestDataFailed(message));
  }
}

function* getOverview() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/overview`
  };

  try {
    const response = yield axios(options);
    yield put(getOverviewSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = "內部伺服器發生錯誤";
        break;
      case 401:
        message = "沒有權限";
        break;
      default:
        message = error;
    }
    yield put(getOverviewFailed(message));
  }
}

function* getServiceStat({ payload: { yyyymm } }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/statistics?yyyymm=${yyyymm}`
  };

  try {
    const response = yield axios(options);
    yield put(getServiceStatisticsSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      case 500:
        message = "內部伺服器發生錯誤";
        break;
      case 401:
        message = "沒有權限";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(getServiceStatisticsFailed(message));
  }
}
/**
 * edit question type
 */
function* updateType({ payload }) {
  //const { qId, newType } = payload;
  //e { type: 'UPDATE_TYPE', payload: { qId: 305834, newType: '4' }
  const options = {
    data: payload,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/updateQuestionType`
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(updateQuestionTypeSuccess(response.data));
  } catch (error) {
    //console.log('error editGovRecord', error.response.data);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(updateQuestionTypeFailed(message));
  }
}

/**
 * edit question type
 */
function* allocateQuestion({ payload }) {
  const { aField, allocateStatus } = payload;
  //e { type: 'UPDATE_TYPE', payload: { qId: 305834, newType: '4' }
  const options = {
    data: aField,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/${
      allocateStatus === 2
        ? "finish_allocate_json"
        : allocateStatus === 3
        ? "request_allocate_json"
        : "allocate_json"
    }`
  };

  try {
    const response = yield axios(options);
    yield put(allocateQuestionSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(allocateQuestionFailed(message));
  }
}

/**
 * add question to batch
 */
function* addQuestionToBatch({ payload }) {
  //const { question_id, batch_id } = payload;
  //e { type: 'UPDATE_TYPE', payload: { qId: 305834, newType: '4' }
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/batch/add_to_batch"
  };

  try {
    const response = yield axios(options);
    yield put(addQuestionToBatchSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(addQuestionToBatchFailed(message));
  }
}

/**
 * remove from batch //@route: DELETE /api/batch/remove_from_batch/:question_id
 */
function* removeQuestionFromBatch({ payload }) {
  //question_id = payload;

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/batch/remove_from_batch/${payload}`
  };

  try {
    const response = yield axios(options);
    yield put(removeQuestionFromBatchSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(removeQuestionFromBatchFailed(message));
  }
}

//reply question
function* replyQuestion({ payload }) {
  //console.log("replyQuestion", payload);
  const options = {
    data: payload,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/modify_reply_json`
  };

  try {
    const response = yield axios(options);
    yield put(replyQuestionSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(replyQuestionFailed(message));
  }
}

//close question
function* closeQuestion({ payload }) {
  const { question_id, closeType } = payload;
  const options = {
    data: question_id,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/${
      closeType === 7
        ? "reserved_question"
        : closeType === 4
        ? "close_question"
        : closeType === 1
        ? "restored_question"
        : "cancel_reserved_question"
    }`
  };

  try {
    const response = yield axios(options);
    yield put(closeQuestionSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(closeQuestionFailed(message));
  }
}
/**
 * edit question type
 */
function* updateStatus({ payload }) {
  //const { qId, newStatus } = payload;
  //e { type: 'UPDATE_TYPE', payload: { qId: 305834, newType: '4' }
  const options = {
    data: payload,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/updateQuestionStatus`
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(updateQuestionStatusSuccess(response.data));
  } catch (error) {
    //console.log('error editGovRecord', error.response.data);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(updateQuestionStatusFailed(message));
  }
}

/**
 * add or remove question type
 */
function* updateQuestionFavorite({ payload }) {
  //const { qId, action } = payload;
  //e { type: 'UPDATE_TYPE', payload: { qId: 305834, newType: '4' }
  const options = {
    data: payload,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/updateQuestionFavorite`
  };

  try {
    const response = yield axios(options);

    yield put(favorQuestionSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.response.data.msg;
    }
    yield put(favorQuestionFailed(message));
  }
}

function* getServiceConfig() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/config`
  };

  try {
    const response = yield axios(options);
    yield put(getServiceConfigSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(getOverviewFailed(message));
  }
}

/**
 * add more than one question to a batch
 */
function* addIdsToBatch({ payload: { batch_id, ids } }) {
  const options = {
    data: { batch_id, ids },
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/batch/batch_add_to_batch"
  };
  try {
    const response = yield axios(options);

    yield put(addMultipleQuestionsToBatchSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.status) {
      default:
        message = error.response.data;
    }
    yield put(addMultipleQuestionsToBatchFailed(message));
  }
}

export function* watchGetData(): any {
  yield takeEvery(GET_QUESTIONS, getQuestionsData);
}
export function* watchGetCurrent(): any {
  yield takeEvery(GET_CURRENT_QUESTION, getCurrentQuestionData);
}

export function* watchGetTestData(): any {
  yield takeEvery(GET_TEST_DATA, getTestData);
}
export function* watchOverviewData(): any {
  yield takeEvery(GET_OVERVIEW, getOverview);
}
export function* watchStatData(): any {
  yield takeEvery(GET_SERVICE_STATISTICS, getServiceStat);
}

export function* watchUpdateType(): any {
  yield takeEvery(UPDATE_QUESTION_TYPE, updateType);
}

export function* watchallocateQuestion(): any {
  yield takeEvery(ALLOCATE_QUESTION, allocateQuestion);
}

export function* watchReplyQuestion(): any {
  yield takeEvery(REPLY_QUESTION, replyQuestion);
}
export function* watchCloseQuestion(): any {
  yield takeEvery(CLOSE_QUESTION, closeQuestion);
}

export function* watchUpdateStatus(): any {
  yield takeEvery(UPDATE_QUESTION_STATUS, updateStatus);
}
export function* watchGetServiceConfig(): any {
  yield takeEvery(GET_SERVICE_CONFIG, getServiceConfig);
}

export function* watchGetRelaventUserData(): any {
  yield takeEvery(GET_QUESTIONS_BY_USER, getQuestionsByUserData);
}
export function* watchupdateQuestionFavorite(): any {
  yield takeEvery(FAVORITE_QUESTION_ACTION, updateQuestionFavorite);
}

export function* watchAddQuestionToBatch(): any {
  yield takeEvery(ADD_QUESTION_TO_BATCH, addQuestionToBatch);
}

export function* watchRemoveQuestionFromBatch(): any {
  yield takeEvery(REMOVE_QUESTION_FROM_BATCH, removeQuestionFromBatch);
}
export function* watchAddMultiToBatch(): any {
  yield takeEvery(ADD_MULTIPLE_QUESTIONS_TO_BATCH, addIdsToBatch);
}
function* serviceSaga(): any {
  yield all([
    fork(watchGetData),
    fork(watchGetCurrent),
    fork(watchUpdateType),
    fork(watchUpdateStatus),
    fork(watchGetTestData),
    fork(watchOverviewData),
    fork(watchallocateQuestion),
    fork(watchReplyQuestion),
    fork(watchCloseQuestion),
    fork(watchStatData),
    fork(watchGetServiceConfig),
    fork(watchGetRelaventUserData),
    fork(watchupdateQuestionFavorite),
    fork(watchAddQuestionToBatch),
    fork(watchRemoveQuestionFromBatch),
    fork(watchAddMultiToBatch)
  ]);
}
export default serviceSaga;
