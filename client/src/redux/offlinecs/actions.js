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

type OfflineCsAction = { type: string, payload: {} | string };

export const getOfflineCsData = (dataType: string): OfflineCsAction => ({
  type: GET_GOV_DATA,
  payload: dataType
});

export const getOfflineCsDataSuccess = (records: []): OfflineCsAction => ({
  type: GET_GOV_DATA_SUCCESS,
  payload: records
});

export const getOfflineCsDataFailed = (error: string): OfflineCsAction => ({
  type: GET_GOV_DATA_FAILED,
  payload: error
});

export const editRecord = (
  dataType: string,
  record: FormData
): OfflineCsAction => ({
  type: EDIT_RECORD,
  payload: { dataType, record }
});

export const editRecordSuccess = (result: {}): OfflineCsAction => ({
  type: EDIT_RECORD_SUCCESS,
  payload: result.affectedId
});

export const editRecordFailed = (errors: {} | string): OfflineCsAction => ({
  type: EDIT_RECORD_FAILED,
  payload: errors
});
export const getCurrentRecord = (
  dataType: string,
  record_id: int,
  history: {}
): OfflineCsAction => ({
  type: GET_CURRENT,
  payload: { dataType, record_id, history }
});

export const getCurrentRecordSuccess = (record: {}): OfflineCsAction => ({
  type: GET_CURRENT_SUCCESS,
  payload: record
});

export const getCurrentRecordFailed = (error: string): OfflineCsAction => ({
  type: GET_CURRENT_FAILED,
  payload: error
});

export const editCplReply = (record: {}): OfflineCsAction => ({
  type: EDIT_CPL_REPLY,
  payload: record
});

export const editCplReplySuccess = (result: {}): OfflineCsAction => ({
  type: EDIT_CPL_REPLY_SUCCESS,
  payload: result
});

export const editCplReplyFailed = (errors: {} | string): OfflineCsAction => ({
  type: EDIT_CPL_REPLY_FAILED,
  payload: errors
});

export const editCplMediation = (record: {}): OfflineCsAction => ({
  type: EDIT_CPL_MEDIATION,
  payload: record
});

export const editCplMediationSuccess = (result: {}): OfflineCsAction => ({
  type: EDIT_CPL_MEDIATION_SUCCESS,
  payload: result
});

export const editCplMediationFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: EDIT_CPL_MEDIATION_FAILED,
  payload: errors
});

export const deleteCplCase = (id: string, history: {}): OfflineCsAction => ({
  type: DELETE_CPL,
  payload: { id, history }
});

export const deleteCplCaseSuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_CPL_SUCCESS,
  payload: result
});

export const deleteCplCaseFailed = (errors: {} | string): OfflineCsAction => ({
  type: DELETE_CPL_FAILED,
  payload: errors
});

export const deleteCplCaseReply = (id: string): OfflineCsAction => ({
  type: DELETE_CPL_REPLY,
  payload: id
});

export const deleteCplCaseReplySuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_CPL_REPLY_SUCCESS,
  payload: result
});

export const deleteCplCaseReplyFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: DELETE_CPL_REPLY_FAILED,
  payload: errors
});
export const deleteCplMediation = (id: string): OfflineCsAction => ({
  type: DELETE_CPL_MEDIATION,
  payload: id
});

export const deleteCplMediationSuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_CPL_MEDIATION_SUCCESS,
  payload: result
});

export const deleteCplMediationFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: DELETE_CPL_MEDIATION_FAILED,
  payload: errors
});

export const moveCplCase = (id: string, record: {}): OfflineCsAction => ({
  type: MOVE_CPL,
  payload: { id, record }
});

export const moveCplCaseSuccess = (result: {}): OfflineCsAction => ({
  type: MOVE_CPL_SUCCESS,
  payload: result
});

export const moveCplCaseFailed = (errors: {} | string): OfflineCsAction => ({
  type: MOVE_CPL_FAILED,
  payload: errors
});

export const editCplRef = (
  case_id: String,
  ref_id: String
): OfflineCsAction => ({
  type: EDIT_CPL_REF,
  payload: { case_id, ref_id }
});

export const editCplRefSuccess = (result: {}): OfflineCsAction => ({
  type: EDIT_CPL_REF_SUCCESS,
  payload: result
});

export const editCplRefFailed = (errors: {} | string): OfflineCsAction => ({
  type: EDIT_CPL_REF_FAILED,
  payload: errors
});

export const deleteCplRef = (
  case_id: String,
  ref_id: String
): OfflineCsAction => ({
  type: DELETE_CPL_REF,
  payload: { case_id, ref_id }
});

export const deleteCplRefSuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_CPL_REF_SUCCESS,
  payload: result
});

export const deleteCplRefFailed = (errors: {} | string): OfflineCsAction => ({
  type: DELETE_CPL_REF_FAILED,
  payload: errors
});

//add_attachment_json

export const addCplAttachment = (record: FormData): OfflineCsAction => ({
  type: ADD_CPL_ATTACHMENT,
  payload: record
});

export const addCplAttachmentSuccess = (result: {}): OfflineCsAction => ({
  type: ADD_CPL_ATTACHMENT_SUCCESS,
  payload: result
});

export const addCplAttachmentFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: ADD_CPL_ATTACHMENT_FAILED,
  payload: errors
});

export const deleteCplAttachment = (
  attachment_id: String
): OfflineCsAction => ({
  type: DELETE_CPL_ATTACHMENT,
  payload: attachment_id
});

export const deleteCplAttachmentSuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_CPL_ATTACHMENT_SUCCESS,
  payload: result
});

export const deleteCplAttachmentFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: DELETE_CPL_ATTACHMENT_FAILED,
  payload: errors
});
