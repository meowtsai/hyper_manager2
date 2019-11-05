import {
  GET_VIP_OFFERS,
  GET_VIP_OFFERS_SUCCESS,
  GET_VIP_OFFERS_FAILED,
  CLEAR_VIP_OFFERS_MESSAGE
} from "./constants";

const INIT_STATE = {
  vip_offer_list: [],
  loading: true,
  error: null
};

type VipOfferAction = { type: string, payload: {} | string };
type State = {
  vip_offer_list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string
};

const VipOffers = (state: State = INIT_STATE, action: VipOfferAction) => {
  switch (action.type) {
    case GET_VIP_OFFERS:
      return { ...state, loading: true, error: null };
    case GET_VIP_OFFERS_SUCCESS:
      return {
        ...state,
        vip_offer_list: action.payload,
        loading: false,
        error: null
      };
    case GET_VIP_OFFERS_FAILED:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_VIP_OFFERS_MESSAGE:
      return { ...state, error: null, loading: false };
    default:
      return { ...state };
  }
};

export default VipOffers;
