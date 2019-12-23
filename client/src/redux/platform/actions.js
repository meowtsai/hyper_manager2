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

type PlatformAction = { type: string, payload: {} | string };

export const updatePassword = (
  account: string,
  password: string
): PlatformAction => ({
  type: UPDATE_PASSWORD,
  payload: { account, password }
});

export const updatePasswordSuccess = (): PlatformAction => ({
  type: UPDATE_PASSWORD_SUCCESS
});

export const updatePasswordFailed = (error: string): PlatformAction => ({
  type: UPDATE_PASSWORD_FAILED,
  payload: error
});

export const getPresetMessage = (): OfflineCsAction => ({
  type: GET_PRESET_MESSAGE
});

export const getPresetMessageSuccess = (records: []): OfflineCsAction => ({
  type: GET_PRESET_MESSAGE_SUCCESS,
  payload: records
});

export const getPresetMessageFailed = (error: string): OfflineCsAction => ({
  type: GET_PRESET_MESSAGE_FAILED,
  payload: error
});

export const editPresetMessage = (record: {}): OfflineCsAction => ({
  type: EDIT_PRESET_MESSAGE,
  payload: record
});

export const editPresetMessageSuccess = (result: {}): OfflineCsAction => ({
  type: EDIT_PRESET_MESSAGE_SUCCESS,
  payload: result
});

export const editPresetMessageFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: EDIT_PRESET_MESSAGE_FAILED,
  payload: errors
});

export const deletePresetMessage = (id: string): OfflineCsAction => ({
  type: DELETE_PRESET_MESSAGE,
  payload: id
});

export const deletePresetMessageSuccess = (result: {}): OfflineCsAction => ({
  type: DELETE_PRESET_MESSAGE_SUCCESS,
  payload: result
});

export const deletePresetMessageFailed = (
  errors: {} | string
): OfflineCsAction => ({
  type: DELETE_PRESET_MESSAGE_SUCCESS,
  payload: errors
});

export const clearPresetMessageMessage = (): ServiceAction => ({
  type: CLEAR_MESSAGE
});
