import {
  GET_VIP_OFFERS,
  GET_VIP_OFFERS_SUCCESS,
  GET_VIP_OFFERS_FAILED
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
