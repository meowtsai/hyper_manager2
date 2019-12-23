// @flow
import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  GET_PRESET_MESSAGE,
  GET_PRESET_MESSAGE_SUCCESS,
  GET_PRESET_MESSAGE_FAILED,
  EDIT_PRESET_MESSAGE,
  EDIT_PRESET_MESSAGE_SUCCESS,
  EDIT_PRESET_MESSAGE_FAILED,
  DELETE_PRESET_MESSAGE,
  DELETE_PRESET_MESSAGE_SUCCESS,
  DELETE_PRESET_MESSAGE_FAILED,
  CLEAR_MESSAGE
} from "./constants";

const INIT_STATE = {
  updated: null,
  loading: true,
  error: "",
  preset_messages: [],
  updateOKMessage: null
};

type PlatformAction = { type: string, payload: {} | string };
type State = {
  user?: {} | null,
  loading?: boolean,
  +value?: boolean,
  preset_messages?: [] | null,
  updateOKMessage?: string
};

// {
//   "msg": "編輯成功",
//   "affectedId": "3",
//   "updField": {
//       "rank": "1",
//       "message": "first message UPDATED 1223"
//   }
// }
const Platform = (state: State = INIT_STATE, action: PlatformAction) => {
  switch (action.type) {
    case UPDATE_PASSWORD:
    case GET_PRESET_MESSAGE:
      return { ...state, loading: true };
    case CLEAR_MESSAGE:
      return { ...state, updateOKMessage: null };
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, updated: true, loading: false, error: null };
    case EDIT_PRESET_MESSAGE_SUCCESS:
      return {
        ...state,
        updateOKMessage: action.payload.msg,
        preset_messages:
          action.payload.action === "add"
            ? [
                ...state.preset_messages,
                { id: action.payload.affectedId, ...action.payload.updField }
              ]
            : state.preset_messages.map(item =>
                item.id.toString() === action.payload.affectedId
                  ? { ...item, ...action.payload.updField }
                  : item
              ),
        loading: false,
        error: null
      };

    case DELETE_PRESET_MESSAGE_SUCCESS:
      return {
        ...state,
        updateOKMessage: action.payload.msg,
        preset_messages: state.preset_messages.filter(
          item => item.id.toString() !== action.payload.deleted_id
        ),
        loading: false,
        error: null
      };
    case UPDATE_PASSWORD_FAILED:
    case GET_PRESET_MESSAGE_FAILED:
    case EDIT_PRESET_MESSAGE_FAILED:
    case DELETE_PRESET_MESSAGE_FAILED:
      return { ...state, error: action.payload, loading: false };

    case GET_PRESET_MESSAGE_SUCCESS:
      return {
        ...state,
        preset_messages: action.payload,
        loading: false,
        error: null
      };

    default:
      return { ...state };
  }
};

export default Platform;
