// @flow
import { UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILED } from './constants';

const INIT_STATE = {
    updated: null,
    loading: true,
    error: '',
};

type PlatformAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Platform = (state: State = INIT_STATE, action: PlatformAction) => {
    switch (action.type) {
        case UPDATE_PASSWORD:
            return { ...state, loading: true };
        case UPDATE_PASSWORD_SUCCESS:
            return { ...state, updated: true, loading: false, error: null };
        case UPDATE_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };

        default:
            return { ...state };
    }
};

export default Platform;
