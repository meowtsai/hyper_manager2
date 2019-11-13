// @flow
import {
  GET_GAMES_DATA,
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

type GamesAction = { type: string, payload: {} | string };

export const getGames = (): GamesAction => ({
  type: GET_GAMES_DATA
});

export const getGamesSuccess = (data: []): GamesAction => ({
  type: GET_GAMES_DATA_SUCCESS,
  payload: data
});

export const getGamesFailed = (error: string): GamesAction => ({
  type: GET_GAMES_DATA_FAILED,
  payload: error
});

export const editGame = (record: FormData): GamesAction => ({
  type: EDIT_GAME,
  payload: { record }
});

export const editGameSuccess = (result: {}): GamesAction => ({
  type: EDIT_GAME_SUCCESS,
  payload: result.affectedId
});

export const editGameFailed = (errors: {} | string): GamesAction => ({
  type: EDIT_GAME_FAILED,
  payload: errors
});

export const getCurrentGame = (game_id: string, history: {}): GamesAction => ({
  type: GET_CURRENT_GAME,
  payload: { game_id, history }
});

export const getCurrentGameSuccess = (record: {}): GamesAction => ({
  type: GET_CURRENT_GAME_SUCCESS,
  payload: record
});

export const getCurrentGameFailed = (error: string): GamesAction => ({
  type: GET_CURRENT_GAME_FAILED,
  payload: error
});

export const clearCurrentGame = (): GamesAction => ({
  type: CLEAR_CURRENT_GAME
});
