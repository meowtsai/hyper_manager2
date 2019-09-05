import { GET_SERVERS_SUCCESS, GET_SERVERS_FAILED } from './constants';

const INIT_STATE = {
    list: [],
    loading: true,
    error: '',
};

type ServersAction = { type: string, payload: {} | string };
type State = { list?: [] | null, loading?: boolean, +value?: boolean, error?: string };

const Servers = (state: State = INIT_STATE, action: ServersAction) => {
    switch (action.type) {
        case GET_SERVERS_SUCCESS:
            return { ...state, list: action.payload, loading: false, error: null };
        case GET_SERVERS_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Servers;
