// @flow
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_TASKS,
  GET_USER_TASKS_SUCCESS,
  GET_USER_TASKS_FAILED,
  GET_USER_LOGS,
  GET_USER_LOGS_SUCCESS,
  GET_USER_LOGS_FAILED
} from './constants';

type AdminUserAction = { type: string, payload: {} | string };

export const getAdminUsers = (role: string): AdminUserAction => ({
  type: GET_USERS,
  payload: role
});

export const getAdminUsersSuccess = (users: []): AdminUserAction => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getAdminUsersFailed = (error: string): AdminUserAction => ({
  type: GET_USERS_FAILED,
  payload: error
});

export const getUserTasks = (): AdminUserAction => ({
  type: GET_USER_TASKS
});

export const getUserTasksSuccess = (tasks: {}): AdminUserAction => ({
  type: GET_USER_TASKS_SUCCESS,
  payload: tasks
});

export const getUserTasksFailed = (error: string): AdminUserAction => ({
  type: GET_USER_TASKS_FAILED,
  payload: error
});

export const getUserLogs = ({ date_begin, date_end }): AdminUserAction => ({
  type: GET_USER_LOGS,
  payload: { date_begin, date_end }
});
export const getUserLogsSuccess = (logs: []): AdminUserAction => ({
  type: GET_USER_LOGS_SUCCESS,
  payload: logs
});

export const getUserLogsFailed = (error: string): AdminUserAction => ({
  type: GET_USER_LOGS_FAILED,
  payload: error
});
