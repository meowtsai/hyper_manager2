// @flow
import {
  GET_GOV_DATA,
  GET_GOV_DATA_SUCCESS,
  GET_GOV_DATA_FAILED,
  EDIT_RECORD,
  EDIT_RECORD_SUCCESS,
  EDIT_RECORD_FAILED,
  GET_CURRENT,
  GET_CURRENT_SUCCESS,
  GET_CURRENT_FAILED,
  EDIT_CPL_REPLY,
  EDIT_CPL_REPLY_SUCCESS,
  EDIT_CPL_REPLY_FAILED,
  DELETE_CPL,
  DELETE_CPL_SUCCESS,
  DELETE_CPL_FAILED,
  MOVE_CPL,
  MOVE_CPL_SUCCESS,
  MOVE_CPL_FAILED,
  EDIT_CPL_MEDIATION,
  EDIT_CPL_MEDIATION_SUCCESS,
  EDIT_CPL_MEDIATION_FAILED,
  DELETE_CPL_REPLY,
  DELETE_CPL_REPLY_SUCCESS,
  DELETE_CPL_REPLY_FAILED,
  DELETE_CPL_MEDIATION,
  DELETE_CPL_MEDIATION_SUCCESS,
  DELETE_CPL_MEDIATION_FAILED,
  EDIT_CPL_REF,
  EDIT_CPL_REF_SUCCESS,
  EDIT_CPL_REF_FAILED,
  DELETE_CPL_REF,
  DELETE_CPL_REF_SUCCESS,
  DELETE_CPL_REF_FAILED,
  ADD_CPL_ATTACHMENT,
  ADD_CPL_ATTACHMENT_SUCCESS,
  ADD_CPL_ATTACHMENT_FAILED,
  DELETE_CPL_ATTACHMENT,
  DELETE_CPL_ATTACHMENT_SUCCESS,
  DELETE_CPL_ATTACHMENT_FAILED
} from "./constants";

const INIT_STATE = {
  records: [],
  loading: true,
  affectedId: 0,
  error: {},
  currentRecord: {}
};

type OfflineCsAction = { type: string, payload: {} | string };
type State = { records?: [] | null, loading?: boolean, +value?: boolean };

const OfflineCS = (state: State = INIT_STATE, action: OfflineCsAction) => {
  switch (action.type) {
    case GET_GOV_DATA:
      return { ...state, loading: true, affectedId: 0, currentRecord: {} };
    case GET_GOV_DATA_SUCCESS:
      return {
        ...state,
        records: action.payload.list,
        config_status: action.payload.config_status,
        loading: false,
        error: null
      };
    case GET_GOV_DATA_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EDIT_RECORD:
    case EDIT_CPL_REPLY:
    case DELETE_CPL_REPLY:
    case DELETE_CPL_MEDIATION:
    case MOVE_CPL:
    case DELETE_CPL:
    case EDIT_CPL_MEDIATION:
    case EDIT_CPL_REF:
    case DELETE_CPL_REF:
    case ADD_CPL_ATTACHMENT:
    case DELETE_CPL_ATTACHMENT:
      return { ...state, loading: true };
    case MOVE_CPL_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          ...action.payload.updField
        },
        loading: false,
        error: null
      };
    case EDIT_RECORD_SUCCESS:
      return {
        ...state,
        affectedId: action.payload,
        loading: false,
        error: null
      };
    case DELETE_CPL_REPLY_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          replies: state.currentRecord.replies.filter(
            re => re.id.toString() !== action.payload.deleted_id
          )
        },
        loading: false,
        error: null
      };
    case DELETE_CPL_MEDIATION_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          mediations: state.currentRecord.mediations.filter(
            re => re.id.toString() !== action.payload.deleted_id
          )
        },
        loading: false,
        error: null
      };
    case DELETE_CPL_ATTACHMENT_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          attachments: state.currentRecord.attachments.filter(
            re => re.id.toString() !== action.payload.deleted_id
          )
        },
        loading: false,
        error: null
      };
    case EDIT_CPL_MEDIATION_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          mediations:
            action.payload.act === "add"
              ? [...state.currentRecord.mediations, action.payload.mediation]
              : [
                  ...state.currentRecord.mediations.filter(
                    re => re.id !== action.payload.mediation.id
                  ),
                  action.payload.mediation
                ]
        },
        loading: false,
        error: null
      };
    case ADD_CPL_ATTACHMENT_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          attachments: action.payload.attachments
        },

        loading: false,
        error: null
      };
    case EDIT_CPL_REF_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          refs: action.payload.refs,
          ref_case_list: action.payload.ref_case_list
        },
        loading: false,
        error: null
      };

    case DELETE_CPL_REF_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          refs: state.currentRecord.refs.filter(
            re => re.ref_id.toString() !== action.payload.deleted_id.toString()
          )
        },
        loading: false,
        error: null
      };
    case EDIT_CPL_REPLY_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          replies:
            action.payload.act === "add"
              ? [...state.currentRecord.replies, action.payload.reply]
              : [
                  ...state.currentRecord.replies.filter(
                    re => re.id !== action.payload.reply.id
                  ),
                  action.payload.reply
                ]
        },
        loading: false,
        error: null
      };

    case EDIT_RECORD_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EDIT_CPL_REPLY_FAILED:
    case DELETE_CPL_REPLY_FAILED:
    case EDIT_CPL_MEDIATION_FAILED:
    case DELETE_CPL_MEDIATION_FAILED:
    case EDIT_CPL_REF_FAILED:
    case DELETE_CPL_REF_FAILED:
    case ADD_CPL_ATTACHMENT_FAILED:
    case DELETE_CPL_ATTACHMENT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case GET_CURRENT:
      return { ...state, loading: true };
    case GET_CURRENT_SUCCESS:
      return {
        ...state,
        currentRecord: action.payload.record,
        config_status: action.payload.config_status,
        loading: false,
        error: null
      };
    case GET_CURRENT_FAILED:
    case MOVE_CPL_FAILED:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
};

export default OfflineCS;
