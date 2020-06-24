import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_VIP_OFFERS,
  GET_VIP_ORDERS,
  GET_CURRENT_VIP_REPORT,
  GET_VIP_PRODS_BY_GAMEID,
  EDIT_VIP_WIRE_REPORT,
  DELETE_VIP_WIRE_REPORT,
  GET_CURRENT_VIP_PRODUCT,
  EDIT_VIP_PRODUCT,
} from "./constants";

import {
  getVipOffersFailed,
  getVipOffersSuccess,
  getVipOrdersSuccess,
  getVipOrdersFailed,
  getCurrentVipReportSuccess,
  getCurrentVipReportFailed,
  getVipProductsByGameIdSuccess,
  getVipProductsByGameIdFailed,
  editVipWireReportSuccess,
  editVipWireReportFailed,
  deleteVipWireReportSuccess,
  deleteVipWireReportFailed,
  getCurrentVipProductSuccess,
  getCurrentVipProductFailed,
  editVipProductFailed,
  editVipProductSuccess,
} from "./actions";

function* getVipOffers() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip_offers/offer_list",
  };

  try {
    const response = yield axios(options);
    yield put(getVipOffersSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(getVipOffersFailed(message));
  }
}

function* getVipOrder() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip_offers/order_list",
  };

  try {
    const response = yield axios(options);
    yield put(getVipOrdersSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(getVipOrdersFailed(message));
  }
}

/**
 * Get single record by its id { dataType, record_id },
 * @param {*} payload - dataType and record_id
 */
function* getCurrentRecord({ payload }) {
  //console.log('getCurrentRecord payload ', payload);
  const { report_id } = payload;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip_offers/detail/${report_id}`,
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentVipReportSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(getCurrentVipReportFailed(message));
  }
}

/**
 * Get Servers list by provided gameid
 * @param {*} gameId -
 */
function* getProdsByGameId({ payload: gameId }) {
  //console.log('getServersByGameId', gameId);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip_offers/prods_list/${gameId}`,
  };

  try {
    const response = yield axios(options);
    yield put(getVipProductsByGameIdSuccess(response.data));
  } catch (error) {
    // console.log(' login error ', error);
    // console.log(' error.status ', error.response.status);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(getVipProductsByGameIdFailed(message));
  }
}

function* editRecord({ payload }) {
  //console.log("editGameRecord *****", payload);
  const { record } = payload;

  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip_offers/wire_report/update",
    data: record,
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    yield put(editVipWireReportSuccess(response.data));
  } catch (error) {
    //console.log('error editGovRecord', error.response.data);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(editVipWireReportFailed(message));
  }
}

function* delVIPWReport({ payload: record_id }) {
  //console.log('delVIPWReport', record_id);
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip_offers/delete_wire_report/${record_id}`,
  };

  try {
    const response = yield axios(options);
    yield put(deleteVipWireReportSuccess(response.data));
  } catch (error) {
    let message;
    message = error.response.data.msg;
    yield put(deleteVipWireReportFailed(message));
  }
}

function* getCurrentVipProductRecord({ payload }) {
  //console.log('getCurrentRecord payload ', payload);
  const { product_id } = payload;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip_offers/prods/${product_id}`,
  };

  try {
    const response = yield axios(options);
    yield put(getCurrentVipProductSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data.msg;
    }
    yield put(getCurrentVipProductFailed(message));
  }
}

function* editVipProductRecord({ payload }) {
  //console.log('editVipProductRecord *****', payload);
  const { record, action, history } = payload;

  const options = {
    method: action === "add" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    url: `/api/vip_offers/prods${action === "add" ? "" : "/update"}`,
    data: record,
  };

  try {
    const response = yield axios(options);
    //console.log('editGovRecordSuccess editGovRecord', response);
    history.push(`/vip/offers/form/${record.product_id}`);
    yield put(editVipProductSuccess(response.data));
  } catch (error) {
    //console.log('error editGovRecord', error.response.data);
    let message;
    switch (error.response.status) {
      default:
        message = error.response.data;
    }
    yield put(editVipProductFailed(message));
  }
}

export function* watchGetOffers(): any {
  yield takeEvery(GET_VIP_OFFERS, getVipOffers);
}

export function* watchGetOrders(): any {
  yield takeEvery(GET_VIP_ORDERS, getVipOrder);
}

export function* watchGetCurrentReport(): any {
  yield takeEvery(GET_CURRENT_VIP_REPORT, getCurrentRecord);
}
export function* watchGetProdsByGameId(): any {
  yield takeEvery(GET_VIP_PRODS_BY_GAMEID, getProdsByGameId);
}

export function* watchEditVipWireReport(): any {
  yield takeEvery(EDIT_VIP_WIRE_REPORT, editRecord);
}

export function* watchDeleteVipWireReport(): any {
  yield takeEvery(DELETE_VIP_WIRE_REPORT, delVIPWReport);
}
export function* watchGetCurrentVipProductRecord(): any {
  yield takeEvery(GET_CURRENT_VIP_PRODUCT, getCurrentVipProductRecord);
}
export function* watcheditVipProductRecord(): any {
  yield takeEvery(EDIT_VIP_PRODUCT, editVipProductRecord);
}

function* vipOfferSaga(): any {
  yield all([
    fork(watchGetOffers),
    fork(watchGetOrders),
    fork(watchGetCurrentReport),
    fork(watchGetProdsByGameId),
    fork(watchEditVipWireReport),
    fork(watchDeleteVipWireReport),
    fork(watchGetCurrentVipProductRecord),
    fork(watcheditVipProductRecord),
  ]);
}

export default vipOfferSaga;
