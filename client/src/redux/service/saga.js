import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_QUESTIONS,
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_TYPE,
  GET_TEST_DATA,
  GET_OVERVIEW,
  GET_CURRENT_QUESTION,
  ALLOCATE_QUESTION,
  REPLY_QUESTION,
  CLOSE_QUESTION
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
  getCurrentQuestionFailed,
  getCurrentQuestionSuccess,
  allocateQuestionSuccess,
  allocateQuestionFailed,
  replyQuestionSuccess,
  replyQuestionFailed,
  closeQuestionSuccess,
  closeQuestionFailed
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
  console.log("getCurrentQuestionData question_id", question_id);
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
//reply question
function* replyQuestion({ payload }) {
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
    fork(watchCloseQuestion)
  ]);
}

export default serviceSaga;
