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
  CLEAR_VIP_MESSAGE,
  DELETE_VIP_REQUEST,
  DELETE_VIP_REQUEST_SUCCESS,
  DELETE_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST,
  ADD_VIP_REQUEST_SUCCESS,
  ADD_VIP_REQUEST_FAILED,
  ADD_VIP_REQUEST_VALIDATION_FAILED
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
