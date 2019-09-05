// @flow
import { UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILED } from './constants';

type PlatformAction = { type: string, payload: {} | string };

export const updatePassword = (account: string, password: string): PlatformAction => ({
    type: UPDATE_PASSWORD,
    payload: { account, password },
});

export const updatePasswordSuccess = (): PlatformAction => ({
    type: UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailed = (error: string): PlatformAction => ({
    type: UPDATE_PASSWORD_FAILED,
    payload: error,
});
