import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import { GET_ALLOCATE_DATA } from "./constants";

import { getAllocateDataSuccess, getAllocateDataFailed } from "./actions";

/**
 * Get Servers list by provided gameid
 * @param {*} condition { allocate_admin_uid: xx, status:2 etc...} -
 */
function* getAllocateData({ payload: condition }) {
  console.log("getAllocateData condition", condition);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/questions/allocated`
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

export function* watchGetData(): any {
  yield takeEvery(GET_ALLOCATE_DATA, getAllocateData);
}

function* serviceAllocateSaga(): any {
  yield all([fork(watchGetData)]);
}

export default serviceAllocateSaga;
