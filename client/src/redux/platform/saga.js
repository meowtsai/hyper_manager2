// @flow

import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  UPDATE_PASSWORD,
  GET_PRESET_MESSAGE,
  EDIT_PRESET_MESSAGE,
  DELETE_PRESET_MESSAGE
} from "./constants";
import {
  updatePasswordSuccess,
  updatePasswordFailed,
  getPresetMessageSuccess,
  getPresetMessageFailed,
  editPresetMessageSuccess,
  editPresetMessageFailed,
  deletePresetMessageSuccess,
  deletePresetMessageFailed
} from "./actions";

/**
 * Change password
 */
function* updatePassword({ payload: { account, password } }) {
  const options = {
    data: JSON.stringify({ account, password }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/platform/modify_password"
  };

  try {
    const response = yield axios(options);
    yield put(updatePasswordSuccess(response));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(updatePasswordFailed(message));
  }
}

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getPresetMessageData() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/platform/preset_messages/list"
  };

  try {
    const response = yield axios(options);
    yield put(getPresetMessageSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(getPresetMessageFailed(message));
  }
}

/**
 * Get dashboard summary data
 * @param {*} payload - record , update with id, or insert with no id
 */
function* editPresetMessageData({ payload }) {
  const record = payload;

  const options = {
    method: record.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    url: `/api/platform/preset_messages/${record.id ? record.id : ""}`,
    data: record
  };

  try {
    const response = yield axios(options);
    yield put(editPresetMessageSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(editPresetMessageFailed(message));
  }
}

function* deletePresetMessageData({ payload }) {
  const id = payload;

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/platform/preset_messages/${id}`
  };

  try {
    const response = yield axios(options);
    yield put(deletePresetMessageSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(deletePresetMessageFailed(message));
  }
}

export function* watchChangePassword(): any {
  yield takeEvery(UPDATE_PASSWORD, updatePassword);
}

export function* watchgetPresetMessageData(): any {
  yield takeEvery(GET_PRESET_MESSAGE, getPresetMessageData);
}
export function* watchUpdatePresetMessageData(): any {
  yield takeEvery(EDIT_PRESET_MESSAGE, editPresetMessageData);
}

export function* watchDeletePresetMessageData(): any {
  yield takeEvery(DELETE_PRESET_MESSAGE, deletePresetMessageData);
}
function* PlatformSaga(): any {
  yield all([
    fork(watchChangePassword),
    fork(watchgetPresetMessageData),
    fork(watchUpdatePresetMessageData),
    fork(watchDeletePresetMessageData)
  ]);
}

export default PlatformSaga;
