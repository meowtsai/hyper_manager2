import { GET_GAMES_DATA_SUCCESS, GET_GAMES_DATA_FAILED } from './constants';

const INIT_STATE = {
    list: [],
    loading: true,
    error: '',
};

type GamesAction = { type: string, payload: {} | string };
type State = { list?: [] | null, loading?: boolean, +value?: boolean, error?: string };
const Games = (state: State = INIT_STATE, action: GamesAction) => {
    switch (action.type) {
        case GET_GAMES_DATA_SUCCESS:
            return { ...state, list: action.payload, loading: false, error: null };
        case GET_GAMES_DATA_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Games;
