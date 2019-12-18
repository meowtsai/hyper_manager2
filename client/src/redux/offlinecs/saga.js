// @flow

import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_GOV_DATA,
  EDIT_RECORD,
  GET_CURRENT,
  EDIT_CPL_REPLY,
  DELETE_CPL,
  MOVE_CPL,
  EDIT_CPL_MEDIATION,
  DELETE_CPL_REPLY,
  DELETE_CPL_MEDIATION,
  EDIT_CPL_REF,
  DELETE_CPL_REF,
  ADD_CPL_ATTACHMENT,
  DELETE_CPL_ATTACHMENT
} from "./constants";

import {
  getOfflineCsDataSuccess,
  getOfflineCsDataFailed,
  editRecordSuccess,
  editRecordFailed,
  getCurrentRecordSuccess,
  getCurrentRecordFailed,
  editCplReplySuccess,
  editCplReplyFailed,
  deleteCplCaseSuccess,
  deleteCplCaseFailed,
  moveCplCaseSuccess,
  moveCplCaseFailed,
  editCplMediationSuccess,
  editCplMediationFailed,
  deleteCplCaseReplyFailed,
  deleteCplCaseReplySuccess,
  deleteCplMediationSuccess,
  deleteCplMediationFailed,
  editCplRefSuccess,
  editCplRefFailed,
  deleteCplRefSuccess,
  deleteCplRefFailed,
  addCplAttachmentFailed,
  addCplAttachmentSuccess,
  deleteCplAttachmentSuccess,
  deleteCplAttachmentFailed
} from "./actions";

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getData({ payload: type }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/${
      type === "govletter" ? "gov_list" : type === "pv" ? "pv_list" : "cpl_case"
    }`
  };

  try {
    const response = yield axios(options);
    yield put(getOfflineCsDataSuccess(response.data));
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
      case 403:
        message = error.response.data;
        break;
      default:
        message = error;
    }
    yield put(getOfflineCsDataFailed(message));
  }
}

/**
 * edit(add or modify) gov letter record
 */
function* editRecord({ payload }) {
  //console.log('editGovRecord *****', payload);
  const { dataType, record } = payload;

  const options = {
    data: record,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    url: `/api/offline_cs/${
      dataType === "govletter"
        ? "gov_list"
        : dataType === "pv"
        ? "pv_list"
        : "cpl_case"
    }`
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(editRecordSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(editRecordFailed(message));
  }
}

/**
 * edit(add or modify) gov letter record
 */
function* moveCplRecord({ payload }) {
  console.log("moveCplRecord *****", payload);
  const { id, record } = payload;
  //record: { status, close_date }
  const options = {
    data: record,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/move_case/${id}`
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(moveCplCaseSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(moveCplCaseFailed(message));
  }
}

/**
 * add or modify cpl reply
 */
function* editCplReply({ payload }) {
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/reply`
  };

  try {
    const response = yield axios(options);
    yield put(editCplReplySuccess(response.data));
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
        message = error.response.data;
    }
    yield put(editCplReplyFailed(message));
  }
}

/**
 * add or modify cpl mediation
 */
function* editCplMediation({ payload }) {
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/mediation`
  };

  try {
    const response = yield axios(options);
    yield put(editCplMediationSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(editCplMediationFailed(message));
  }
}
/**
 * Get single record by its id { dataType, record_id },
 * @param {*} payload - dataType and record_id
 */
function* getCurrentRecord({ payload }) {
  //console.log('getCurrentRecord payload ', payload);
  const { dataType, record_id } = payload;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },

    url: `/api/offline_cs/${
      dataType === "govletter"
        ? "gov_list"
        : dataType === "pv"
        ? "pv_list"
        : "cpl_case"
    }/detail/${record_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentRecordSuccess(response.data));
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
      case 400:
        message = error.response.data.msg;
        break;
      default:
        message = error.response.data;
    }
    yield put(getCurrentRecordFailed(message));
  }
}

/**
 * add or modify cpl mediation
 */
function* editCplRef({ payload }) {
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/ref`
  };

  try {
    const response = yield axios(options);
    yield put(editCplRefSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(editCplRefFailed(message));
  }
}

/**
 * add or modify cpl mediation
 */
function* addCplAttach({ payload }) {
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    url: `/api/offline_cs/cpl_case/attachment/add`
  };

  try {
    const response = yield axios(options);
    yield put(addCplAttachmentSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(addCplAttachmentFailed(message));
  }
}

function* deleteCplRef({ payload }) {
  const options = {
    data: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/ref/remove`
  };

  try {
    const response = yield axios(options);
    yield put(deleteCplRefSuccess(response.data));
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
        message = error.response.data;
    }
    yield put(deleteCplRefFailed(message));
  }
}

function* delCplCase({ payload: { id, history } }) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/${id}`
  };

  try {
    const response = yield axios(options);
    history.push("/offline/cpl_case/home");
    yield put(deleteCplCaseSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteCplCaseFailed(message));
  }
}

function* delCplCaseReply({ payload: id }) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/reply/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(deleteCplCaseReplySuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteCplCaseReplyFailed(message));
  }
}

function* delCplCaseAttachment({ payload: id }) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/attachment/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(deleteCplAttachmentSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteCplAttachmentFailed(message));
  }
}
function* delCplMd({ payload: id }) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/offline_cs/cpl_case/mediation/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(deleteCplMediationSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteCplMediationFailed(message));
  }
}

export function* watchGetData(): any {
  yield takeEvery(GET_GOV_DATA, getData);
}
export function* watchGetCurrentRecordData(): any {
  yield takeEvery(GET_CURRENT, getCurrentRecord);
}
export function* watchEditRecord(): any {
  yield takeEvery(EDIT_RECORD, editRecord);
}

export function* watchEditCplReply(): any {
  yield takeEvery(EDIT_CPL_REPLY, editCplReply);
}
export function* watchEditCplMediation(): any {
  yield takeEvery(EDIT_CPL_MEDIATION, editCplMediation);
}

export function* watchDeleteCpl(): any {
  yield takeEvery(DELETE_CPL, delCplCase);
}

export function* watchDeleteCplReply(): any {
  yield takeEvery(DELETE_CPL_REPLY, delCplCaseReply);
}
export function* watchDeleteCplMediation(): any {
  yield takeEvery(DELETE_CPL_MEDIATION, delCplMd);
}

export function* watchMoveCplStatus(): any {
  yield takeEvery(MOVE_CPL, moveCplRecord);
}

export function* watchEditCplRef(): any {
  yield takeEvery(EDIT_CPL_REF, editCplRef);
}
export function* watchDeleteCplRef(): any {
  yield takeEvery(DELETE_CPL_REF, deleteCplRef);
}
export function* watchAddCplAttach(): any {
  yield takeEvery(ADD_CPL_ATTACHMENT, addCplAttach);
}

export function* watchDelCplAttach(): any {
  yield takeEvery(DELETE_CPL_ATTACHMENT, delCplCaseAttachment);
}

function* offlineCsSaga(): any {
  yield all([
    fork(watchGetData),
    fork(watchEditRecord),
    fork(watchGetCurrentRecordData),
    fork(watchEditCplReply),
    fork(watchDeleteCpl),
    fork(watchMoveCplStatus),
    fork(watchDeleteCplReply),
    fork(watchEditCplMediation),
    fork(watchDeleteCplMediation),
    fork(watchEditCplRef),
    fork(watchDeleteCplRef),
    fork(watchAddCplAttach),
    fork(watchDelCplAttach)
  ]);
}

export default offlineCsSaga;
