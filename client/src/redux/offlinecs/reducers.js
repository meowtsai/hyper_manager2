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
} from './constants';

const INIT_STATE = {
    records: [],
    loading: true,
    affectedId: 0,
    error: {},
    currentRecord: {},
};

type OfflineCsAction = { type: string, payload: {} | string };
type State = { records?: [] | null, loading?: boolean, +value?: boolean };

const OfflineCS = (state: State = INIT_STATE, action: OfflineCsAction) => {
    switch (action.type) {
        case GET_GOV_DATA:
            return { ...state, loading: true, affectedId: 0, currentRecord: {} };
        case GET_GOV_DATA_SUCCESS:
            return { ...state, records: action.payload, loading: false, error: null };
        case GET_GOV_DATA_FAILED:
            return { ...state, error: action.payload, loading: false };
        case EDIT_RECORD:
            return { ...state, loading: true };
        case EDIT_RECORD_SUCCESS:
            return { ...state, affectedId: action.payload, loading: false, error: null };
        case EDIT_RECORD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case GET_CURRENT:
            return { ...state, loading: true };
        case GET_CURRENT_SUCCESS:
            return { ...state, currentRecord: action.payload, loading: false, error: null };
        case GET_CURRENT_FAILED:
            return { ...state, error: action.payload, loading: false };

        default:
            return { ...state };
    }
};

export default OfflineCS;
