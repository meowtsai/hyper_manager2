import {
  GET_VIP_GAMES,
  GET_VIP_GAMES_SUCCESS,
  GET_VIP_GAMES_FAILED,
  GET_VIP,
  GET_VIP_SUCCESS,
  GET_VIP_FAILED,
  UPDATE_VIP_STATUS,
  UPDATE_VIP_STATUS_SUCCESS,
  UPDATE_VIP_STATUS_FAILED,
  CLEAR_VIP_MESSAGE,
  DELETE_VIP_REQUEST,
  DELETE_VIP_REQUEST_SUCCESS,
  DELETE_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST,
  ADD_VIP_REQUEST_SUCCESS,
  ADD_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST_VALIDATION_FAILED
} from "./constants";

const INIT_STATE = {
  game_list: [],
  vip_list: [],
  requestData: [],
  loading: true,
  error: null,
  errors: {},
  updateOKMessage: null
};

type VipAction = { type: string, payload: {} | string };
type State = {
  game_list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string,
  errors?: {} | null,
  updateOKMessage?: string | null
};

const VIP = (state: State = INIT_STATE, action: VipAction) => {
  switch (action.type) {
    case GET_VIP_GAMES:
    case GET_VIP:
    case UPDATE_VIP_STATUS:
      return { ...state, loading: true, error: null };
    case GET_VIP_GAMES_SUCCESS:
      return {
        ...state,
        game_list: action.payload,
        loading: false,
        error: null
      };
    case GET_VIP_SUCCESS:
      return {
        ...state,
        vip_list: action.payload.vip_list,
        requestData: action.payload.requestData,
        loading: false,
        error: null
      };
    case UPDATE_VIP_STATUS_SUCCESS:
      const newList = state.vip_list.map(vip =>
        vip.uid === action.payload.uid
          ? { ...vip, ...action.payload.updatedField }
          : vip
      );
      return {
        ...state,
        updateOKMessage: action.payload.msg,
        vip_list: newList,
        loading: false,
        error: null
      };
    case DELETE_VIP_REQUEST_SUCCESS:
      return {
        ...state,
        updateOKMessage: action.payload.msg,
        requestData: state.requestData.filter(
          s => s.id.toString() !== action.payload.updatedField
        ),
        loading: false,
        error: null
      };

    case ADD_VIP_REQUEST_SUCCESS:
      const newRecord = {
        id: action.payload.id,
        ...action.payload.updatedField
      };
      const newReqData = [...state.requestData, newRecord];
      return {
        ...state,
        updateOKMessage: action.payload.msg,
        requestData: newReqData,
        // requestData: state.requestData.push({
        //   id: action.payload.id,
        //   ...action.payload.updatedField
        // }),
        loading: false,
        error: null
      };
    case ADD_VIP_REQUEST_VALIDATION_FAILED:
      return { ...state, errors: action.payload, loading: false };
    case ADD_VIP_REQUEST_FAILED:
    case UPDATE_VIP_STATUS_FAILED:
    case GET_VIP_GAMES_FAILED:
    case GET_VIP_FAILED:
    case DELETE_VIP_REQUEST_FAILED:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_VIP_MESSAGE:
      return { ...state, error: null, updateOKMessage: null, loading: false };
    default:
      return { ...state };
  }
};

export default VIP;
