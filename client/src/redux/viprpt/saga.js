import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import { GET_VIP_DASHBOARD_DATA } from "./constants";

import {
  getVipDashboardDataSuccess,
  getVipDashboardDataFailed,
} from "./actions";

function* getVipDashboard() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip_rpt/home",
  };

  try {
    const response = yield axios(options);
    yield put(getVipDashboardDataSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    //return res.status(403).json({ msg: "你目前沒有瀏覽這個頁面的相關權限" });
    yield put(getVipDashboardDataFailed(message));
  }
}

export function* watchGetVipRptData(): any {
  yield takeEvery(GET_VIP_DASHBOARD_DATA, getVipDashboard);
}

function* vipRptSaga(): any {
  yield all([fork(watchGetVipRptData)]);
}

export default vipRptSaga;
