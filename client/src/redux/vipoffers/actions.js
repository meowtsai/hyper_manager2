import {
  GET_VIP_OFFERS,
  GET_VIP_OFFERS_SUCCESS,
  GET_VIP_OFFERS_FAILED,
  GET_VIP_ORDERS,
  GET_VIP_ORDERS_SUCCESS,
  GET_VIP_ORDERS_FAILED,
  GET_CURRENT_VIP_REPORT,
  GET_CURRENT_VIP_REPORT_SUCCESS,
  GET_CURRENT_VIP_REPORT_FAILED,
  GET_VIP_PRODS_BY_GAMEID,
  GET_VIP_PRODS_BY_GAMEID_SUCCESS,
  GET_VIP_PRODS_BY_GAMEID_FAILED,
  EDIT_VIP_WIRE_REPORT,
  EDIT_VIP_WIRE_REPORT_SUCCESS,
  EDIT_VIP_WIRE_REPORT_FAILED,
  DELETE_VIP_WIRE_REPORT,
  DELETE_VIP_WIRE_REPORT_SUCCESS,
  DELETE_VIP_WIRE_REPORT_FAILED
} from "./constants";

type VipOfferAction = { type: string, payload: {} | string };

export const getVipOffers = (): VipOfferAction => ({
  type: GET_VIP_OFFERS
});

export const getVipOffersSuccess = (data: []): VipOfferAction => ({
  type: GET_VIP_OFFERS_SUCCESS,
  payload: data
});

export const getVipOffersFailed = (error: string): VipOfferAction => ({
  type: GET_VIP_OFFERS_FAILED,
  payload: error
});

export const getVipProductsByGameId = (game_id: string): VipOfferAction => ({
  type: GET_VIP_PRODS_BY_GAMEID,
  payload: game_id
});

export const getVipProductsByGameIdSuccess = (data: []): VipOfferAction => ({
  type: GET_VIP_PRODS_BY_GAMEID_SUCCESS,
  payload: data
});

export const getVipProductsByGameIdFailed = (
  error: string
): VipOfferAction => ({
  type: GET_VIP_PRODS_BY_GAMEID_FAILED,
  payload: error
});

export const getVipOrders = (): VipOfferAction => ({
  type: GET_VIP_ORDERS
});

export const getVipOrdersSuccess = (data: []): VipOfferAction => ({
  type: GET_VIP_ORDERS_SUCCESS,
  payload: data
});

export const getVipOrdersFailed = (error: string): VipOfferAction => ({
  type: GET_VIP_ORDERS_FAILED,
  payload: error
});

export const getCurrentVipReport = (
  report_id: string,
  history: {}
): VipOfferAction => ({
  type: GET_CURRENT_VIP_REPORT,
  payload: { report_id, history }
});

export const getCurrentVipReportSuccess = (record: {}): VipOfferAction => ({
  type: GET_CURRENT_VIP_REPORT_SUCCESS,
  payload: record
});

export const getCurrentVipReportFailed = (error: string): VipOfferAction => ({
  type: GET_CURRENT_VIP_REPORT_FAILED,
  payload: error
});

export const editVipWireReport = (record: {}): VipOfferAction => ({
  type: EDIT_VIP_WIRE_REPORT,
  payload: { record }
});

export const editVipWireReportSuccess = (result: {}): VipOfferAction => ({
  type: EDIT_VIP_WIRE_REPORT_SUCCESS,
  payload: result
});

export const editVipWireReportFailed = (
  errors: {} | string
): VipOfferAction => ({
  type: EDIT_VIP_WIRE_REPORT_FAILED,
  payload: errors
});

export const deleteVipWireReport = (record_id: string): VipOfferAction => ({
  type: DELETE_VIP_WIRE_REPORT,
  payload: record_id
});

export const deleteVipWireReportSuccess = (result: {}): VipOfferAction => ({
  type: DELETE_VIP_WIRE_REPORT_SUCCESS,
  payload: result
});

export const deleteVipWireReportFailed = (
  errors: {} | string
): VipOfferAction => ({
  type: DELETE_VIP_WIRE_REPORT_FAILED,
  payload: errors
});
