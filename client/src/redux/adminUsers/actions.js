// @flow
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED } from './constants';

type AdminUserAction = { type: string, payload: {} | string };

export const getAdminUsers = (role: string): AdminUserAction => ({
    type: GET_USERS,
    payload: role,
});

export const getAdminUsersSuccess = (users: []): AdminUserAction => ({
    type: GET_USERS_SUCCESS,
    payload: users,
});

export const getAdminUsersFailed = (error: string): AdminUserAction => ({
    type: GET_USERS_FAILED,
    payload: error,
});
