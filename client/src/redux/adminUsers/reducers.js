// @flow
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED } from './constants';

const INIT_STATE = {
    users: [],
    loading: true,
};

type AdminUserAction = { type: string, payload: {} | string };
type State = { user?: [] | null, loading?: boolean, +value?: boolean };

const AdminUsers = (state: State = INIT_STATE, action: AdminUserAction) => {
    switch (action.type) {
        case GET_USERS:
            return { ...state, loading: true };
        case GET_USERS_SUCCESS:
            return { ...state, users: action.payload, loading: false, error: null };
        case GET_USERS_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default AdminUsers;
