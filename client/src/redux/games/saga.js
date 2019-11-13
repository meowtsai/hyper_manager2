// @flow

import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { GET_GAMES_DATA, EDIT_GAME, GET_CURRENT_GAME } from "./constants";

import {
  getGamesSuccess,
  getGamesFailed,
  editGameSuccess,
  editGameFailed,
  getCurrentGameSuccess,
  getCurrentGameFailed
} from "./actions";

/**
 * Get dashboard summary data
 * @param {*} payload - begin date and end date
 */
function* getGames() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/games/list"
  };

  try {
    const response = yield axios(options);
    yield put(getGamesSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(getGamesFailed(message));
  }
}

/**
 * edit(add or modify) gov letter record
 */
function* editRecord({ payload }) {
  //console.log("editGameRecord *****", payload);
  const { record } = payload;
  //headers: { "Content-Type": "multipart/form-data" }
  const options = {
    data: record,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    url: `/api/games`
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(editGameSuccess(response.data));
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
    yield put(editGameFailed(message));
  }
}

/**
 * Get single record by its id { dataType, record_id },
 * @param {*} payload - dataType and record_id
 */
function* getCurrentRecord({ payload }) {
  //console.log('getCurrentRecord payload ', payload);
  const { game_id } = payload;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/games/detail/${game_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentGameSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(getCurrentGameFailed(message));
  }
}

export function* watchGetGameData(): any {
  yield takeEvery(GET_GAMES_DATA, getGames);
}

export function* watchGetCurrentGameData(): any {
  yield takeEvery(GET_CURRENT_GAME, getCurrentRecord);
}
export function* watchEditGameRecord(): any {
  yield takeEvery(EDIT_GAME, editRecord);
}

function* gamesSaga(): any {
  yield all([
    fork(watchGetGameData),
    fork(watchGetCurrentGameData),
    fork(watchEditGameRecord)
  ]);
}

export default gamesSaga;
