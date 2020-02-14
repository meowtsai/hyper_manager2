import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_VIP_GAMES,
  GET_VIP,
  UPDATE_VIP_STATUS,
  UPDATE_VIP_INFO,
  DELETE_VIP_REQUEST,
  ADD_VIP_REQUEST,
  GET_CURRENT_WHALE_USER,
  GET_VIP_REQUESTS
} from "./constants";

import {
  getVipGamesSuccess,
  getVipGamesFailed,
  getVipFailed,
  getVipSuccess,
  putVipFailed,
  putVipSuccess,
  deleteVipServiceRequestFailed,
  deleteVipServiceRequestSuccess,
  addVipServiceRequestFailed,
  addVipServiceRequestSuccess,
  addVipServiceRequestValidationFailed,
  getCurrentWhaleUserSuccess,
  getCurrentWhaleUserFailed,
  updateVipInfoSuccess,
  updateVipInfoFailed,
  getVipRequestsSuccess,
  getVipRequestsFailed
} from "./actions";

function* getGames() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip/game_list"
  };

  try {
    const response = yield axios(options);
    yield put(getVipGamesSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    //return res.status(403).json({ msg: "你目前沒有瀏覽這個頁面的相關權限" });
    yield put(getVipGamesFailed(message));
  }
}

function* getVipReqData({ payload: { gameId, beginTime, endTime } }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip/request_report?gameId=${gameId}&beginTime=${beginTime}&endTime=${endTime}`
  };

  try {
    const response = yield axios(options);
    yield put(getVipRequestsSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    //return res.status(403).json({ msg: "你目前沒有瀏覽這個頁面的相關權限" });
    yield put(getVipRequestsFailed(message));
  }
}

function* getVIP({ payload: game_id }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip/vip_list/${game_id}`
  };

  try {
    const response = yield axios(options);
    yield put(getVipSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(getVipFailed(message));
  }
}

function* getSingleVip({ payload: { game_id, role_id, history } }) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip/user_dashboard/${game_id}?user=${encodeURIComponent(role_id)}`
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentWhaleUserSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(getCurrentWhaleUserFailed(message));
  }
}

function* putVIP({ payload: { game_id, uid, command } }) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip/update/",
    data: { game_id, uid, command }
  };

  try {
    const response = yield axios(options);
    yield put(putVipSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(putVipFailed(message));
  }
}

function* updateVIPInfo({ payload: { game_id, role_id, fields } }) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip/update_vip_info",
    data: { game_id, role_id, fields }
  };

  try {
    const response = yield axios(options);
    yield put(updateVipInfoSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(updateVipInfoFailed(message));
  }
}

function* delVIPRequest({ payload: record_id }) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip/delete_request/${record_id}`
  };

  try {
    const response = yield axios(options);
    yield put(deleteVipServiceRequestSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteVipServiceRequestFailed(message));
  }
}

function* addVIPRequest({ payload: record }) {
  //console.log("addVIPRequest", record);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip/request/",
    data: record
  };

  try {
    const response = yield axios(options);
    yield put(addVipServiceRequestSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(addVipServiceRequestFailed(message));
  }
}
export function* watchGetGames(): any {
  yield takeEvery(GET_VIP_GAMES, getGames);
}

export function* watchGetVip(): any {
  yield takeEvery(GET_VIP, getVIP);
}

export function* watchPutVip(): any {
  yield takeEvery(UPDATE_VIP_STATUS, putVIP);
}

export function* watchDelVipRequest(): any {
  yield takeEvery(DELETE_VIP_REQUEST, delVIPRequest);
}

export function* watchAddVipRequest(): any {
  yield takeEvery(ADD_VIP_REQUEST, addVIPRequest);
}
export function* watchGetCurrentWhaleUser(): any {
  yield takeEvery(GET_CURRENT_WHALE_USER, getSingleVip);
}
export function* watchUpdateVIPInfo(): any {
  yield takeEvery(UPDATE_VIP_INFO, updateVIPInfo);
}

export function* watchGetVipReqData(): any {
  yield takeEvery(GET_VIP_REQUESTS, getVipReqData);
}

function* vipSaga(): any {
  yield all([
    fork(watchGetGames),
    fork(watchGetVip),
    fork(watchPutVip),
    fork(watchDelVipRequest),
    fork(watchAddVipRequest),
    fork(watchGetCurrentWhaleUser),
    fork(watchUpdateVIPInfo),
    fork(watchGetVipReqData)
  ]);
}

export default vipSaga;
