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

const INIT_STATE = {
  users: [],
  loading: true,
  user_tasks: {},
  logs: []
};

type AdminUserAction = { type: string, payload: {} | string };
type State = {
  user?: [] | null,
  loading?: boolean,
  +value?: boolean,
  user_tasks?: {} | null
};

const AdminUsers = (state: State = INIT_STATE, action: AdminUserAction) => {
  switch (action.type) {
    case GET_USERS:
    case GET_USER_LOGS:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false, error: null };
    case GET_USER_LOGS_SUCCESS:
      return { ...state, logs: action.payload, loading: false, error: null };
    case GET_USERS_FAILED:
    case GET_USER_TASKS_FAILED:
    case GET_USER_LOGS_FAILED:
      return { ...state, error: action.payload, loading: false };
    case GET_USER_TASKS:
      return { ...state };
    case GET_USER_TASKS_SUCCESS:
      //console.log("GET_USER_TASKS_SUCCESS action.payload", action.payload);
      return { ...state, user_tasks: action.payload };

    default:
      return { ...state };
  }
};

export default AdminUsers;
