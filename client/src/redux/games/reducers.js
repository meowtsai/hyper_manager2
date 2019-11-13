import {
  GET_GAMES_DATA_SUCCESS,
  GET_GAMES_DATA_FAILED,
  EDIT_GAME,
  EDIT_GAME_SUCCESS,
  EDIT_GAME_FAILED,
  GET_CURRENT_GAME,
  GET_CURRENT_GAME_SUCCESS,
  GET_CURRENT_GAME_FAILED,
  CLEAR_CURRENT_GAME
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  affectedId: null,
  currentRecord: {},
  updateOKMessage: null,
  errors: {}
};

type GamesAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string,
  updateOKMessage?: string
};
const Games = (state: State = INIT_STATE, action: GamesAction) => {
  switch (action.type) {
    case GET_GAMES_DATA_SUCCESS:
      return {
        ...state,
        updateOKMessage: null,
        list: action.payload,
        loading: false,
        errors: null
      };
    case GET_GAMES_DATA_FAILED:
      return { ...state, errors: action.payload, loading: false };
    case EDIT_GAME:
      return { ...state, loading: true };
    case EDIT_GAME_SUCCESS:
      return {
        ...state,
        affectedId: action.payload,
        loading: false,
        error: null,
        updateOKMessage: "新增成功!"
      };
    case GET_CURRENT_GAME:
      return { ...state, loading: true };
    case CLEAR_CURRENT_GAME:
      return { ...state, currentRecord: {} };
    case GET_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        currentRecord: action.payload,
        loading: false,
        error: null
      };
    case GET_CURRENT_GAME_FAILED:
      return { ...state, errors: action.payload, loading: false };
    case EDIT_GAME_FAILED:
      return { ...state, errors: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Games;
