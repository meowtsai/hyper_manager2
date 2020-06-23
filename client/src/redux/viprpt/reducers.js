import {
  GET_VIP_DASHBOARD_DATA,
  GET_VIP_DASHBOARD_DATA_SUCCESS,
  GET_VIP_DASHBOARD_DATA_FAILED,
} from "./constants";

const INIT_STATE = {
  vip_dashboard_data: {},
  loading: true,
  error: {},
};

type VipRptAction = { type: string, payload: {} | string };
type State = {
  vip_dashboard_data?: {} | null,
  loading?: boolean,
  +value?: boolean,
  error?: {},
};

const VipRpt = (state: State = INIT_STATE, action: VipRptAction) => {
  switch (action.type) {
    case GET_VIP_DASHBOARD_DATA:
      return { ...state, loading: true, error: null };

    case GET_VIP_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        vip_dashboard_data: action.payload,
        loading: false,
        error: null,
      };
    case GET_VIP_DASHBOARD_DATA_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default VipRpt;
