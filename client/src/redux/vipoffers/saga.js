import axios from "axios";

import { all, fork, put, takeEvery } from "redux-saga/effects";
import { GET_VIP_OFFERS } from "./constants";

import { getVipOffersFailed, getVipOffersSuccess } from "./actions";

function* getVipOffers() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "/api/vip_offers/offer_list"
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

export function* watchGetOffers(): any {
  yield takeEvery(GET_VIP_OFFERS, getVipOffers);
}

function* vipOfferSaga(): any {
  yield all([fork(watchGetOffers)]);
}

export default vipOfferSaga;
