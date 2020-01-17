// @flow
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
  UPDATE_VIP_INFO,
  UPDATE_VIP_INFO_SUCCESS,
  UPDATE_VIP_INFO_FAILED,
  CLEAR_VIP_MESSAGE,
  DELETE_VIP_REQUEST,
  DELETE_VIP_REQUEST_SUCCESS,
  DELETE_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST,
  ADD_VIP_REQUEST_SUCCESS,
  ADD_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST_VALIDATION_FAILED,
  GET_CURRENT_WHALE_USER,
  GET_CURRENT_WHALE_USER_SUCCESS,
  GET_CURRENT_WHALE_USER_FAILED,
  GET_VIP_REQUESTS,
  GET_VIP_REQUESTS_SUCCESS,
  GET_VIP_REQUESTS_FAILED
} from "./constants";

type VipAction = { type: string, payload: {} | string };

export const getVipGames = (): VipAction => ({
  type: GET_VIP_GAMES
});

export const getVipGamesSuccess = (data: []): VipAction => ({
  type: GET_VIP_GAMES_SUCCESS,
  payload: data
});

export const getVipGamesFailed = (error: string): VipAction => ({
  type: GET_VIP_GAMES_FAILED,
  payload: error
});

export const getVip = (game_id: string): VipAction => ({
  type: GET_VIP,
  payload: game_id
});

export const getVipSuccess = (data: []): VipAction => ({
  type: GET_VIP_SUCCESS,
  payload: data
});

export const getVipFailed = (error: string): VipAction => ({
  type: GET_VIP_FAILED,
  payload: error
});

export const putVip = (
  game_id: string,
  uid: String,
  command: string
): VipAction => ({
  type: UPDATE_VIP_STATUS,
  payload: { game_id, uid, command }
});

export const putVipSuccess = (data: {}): VipAction => ({
  type: UPDATE_VIP_STATUS_SUCCESS,
  payload: data
});

export const putVipFailed = (error: string): VipAction => ({
  type: UPDATE_VIP_STATUS_FAILED,
  payload: error
});

export const clearVIPMessage = (): VipAction => ({
  type: CLEAR_VIP_MESSAGE
});

export const deleteVipServiceRequest = (record_id: int): VipAction => ({
  type: DELETE_VIP_REQUEST,
  payload: record_id
});

export const deleteVipServiceRequestSuccess = (data: {}): VipAction => ({
  type: DELETE_VIP_REQUEST_SUCCESS,
  payload: data
});

export const deleteVipServiceRequestFailed = (error: string): VipAction => ({
  type: DELETE_VIP_REQUEST_FAILED,
  payload: error
});

export const addVipServiceRequest = (record): VipAction => ({
  type: ADD_VIP_REQUEST,
  payload: record
});

export const addVipServiceRequestSuccess = (data: {}): VipAction => ({
  type: ADD_VIP_REQUEST_SUCCESS,
  payload: data
});

export const addVipServiceRequestFailed = (error: string | {}): VipAction => ({
  type: ADD_VIP_REQUEST_FAILED,
  payload: error
});

export const addVipServiceRequestValidationFailed = (errors: {}): VipAction => ({
  type: ADD_VIP_REQUEST_VALIDATION_FAILED,
  payload: errors
});

export const getCurrentWhaleUser = (
  game_id: string,
  role_id: string,
  history: {}
): VipAction => ({
  type: GET_CURRENT_WHALE_USER,
  payload: { game_id, role_id, history }
});

export const getCurrentWhaleUserSuccess = (record: {}): VipAction => ({
  type: GET_CURRENT_WHALE_USER_SUCCESS,
  payload: record
});

export const getCurrentWhaleUserFailed = (error: string): VipAction => ({
  type: GET_CURRENT_WHALE_USER_FAILED,
  payload: error
});

export const updateVipInfo = (
  game_id: string,
  role_id: String,
  fields: {}
): VipAction => ({
  type: UPDATE_VIP_INFO,
  payload: { game_id, role_id, fields }
});

export const updateVipInfoSuccess = (data: {}): VipAction => ({
  type: UPDATE_VIP_INFO_SUCCESS,
  payload: data
});

export const updateVipInfoFailed = (error: string): VipAction => ({
  type: UPDATE_VIP_INFO_FAILED,
  payload: error
});

export const getVipRequests = (condition: {}): VipAction => ({
  type: GET_VIP_REQUESTS,
  payload: condition
});

export const getVipRequestsSuccess = (data: []): VipAction => ({
  type: GET_VIP_REQUESTS_SUCCESS,
  payload: data
});

export const getVipRequestsFailed = (error: string): VipAction => ({
  type: GET_VIP_REQUESTS_FAILED,
  payload: error
});
