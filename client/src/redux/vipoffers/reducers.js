import {
  GET_VIP_OFFERS,
  GET_VIP_OFFERS_SUCCESS,
  GET_VIP_OFFERS_FAILED,
  CLEAR_VIP_OFFERS_MESSAGE,
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
  EDIT_VIP_WIRE_REPORT_FAILED
} from "./constants";

const INIT_STATE = {
  vip_offer_list: [],
  vip_orders_list: [],
  vip_prods: [],
  current_report: {},
  loading: true,
  errors: {},
  updateOKMessage: null,
  affectedRecord: null
};

type VipOfferAction = { type: string, payload: {} | string };
type State = {
  vip_offer_list?: [] | null,
  vip_prods?: [] | null,
  vip_orders_list?: [] | null,
  current_report?: {} | null,
  loading?: boolean,
  +value?: boolean,
  error?: string,
  errors?: {},
  updateOKMessage?: string
};

const VipOffers = (state: State = INIT_STATE, action: VipOfferAction) => {
  switch (action.type) {
    case GET_VIP_OFFERS:
    case GET_VIP_ORDERS:
    case GET_CURRENT_VIP_REPORT:
    case GET_VIP_PRODS_BY_GAMEID:
    case EDIT_VIP_WIRE_REPORT:
      return { ...state, loading: true, error: null };
    case GET_VIP_OFFERS_SUCCESS:
      return {
        ...state,
        vip_offer_list: action.payload,
        loading: false,
        error: null
      };
    case GET_VIP_ORDERS_SUCCESS:
      return {
        ...state,
        vip_orders_list: action.payload,
        loading: false,
        error: null
      };
    case GET_CURRENT_VIP_REPORT_SUCCESS:
      return {
        ...state,
        current_report: action.payload,
        loading: false,
        error: null
      };
    case GET_VIP_PRODS_BY_GAMEID_SUCCESS:
      return {
        ...state,
        vip_prods: action.payload
      };
    case EDIT_VIP_WIRE_REPORT_SUCCESS:
      return {
        ...state,
        affectedRecord: action.payload.updatedField,
        loading: false,
        error: null,
        updateOKMessage: "編輯成功!"
      };
    case GET_VIP_OFFERS_FAILED:
    case GET_VIP_ORDERS_FAILED:
    case GET_CURRENT_VIP_REPORT_FAILED:
    case GET_VIP_PRODS_BY_GAMEID_FAILED:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_VIP_OFFERS_MESSAGE:
      return { ...state, error: null, loading: false };
    default:
      return { ...state };
  }
};

export default VipOffers;
