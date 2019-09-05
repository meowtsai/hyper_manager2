// @flow
import { GET_GAMES_DATA, GET_GAMES_DATA_SUCCESS, GET_GAMES_DATA_FAILED } from './constants';

type GamesAction = { type: string, payload: {} | string };

export const getGames = (): GamesAction => ({
    type: GET_GAMES_DATA,
});

export const getGamesSuccess = (data: []): GamesAction => ({
    type: GET_GAMES_DATA_SUCCESS,
    payload: data,
});

export const getGamesFailed = (error: string): GamesAction => ({
    type: GET_GAMES_DATA_FAILED,
    payload: error,
});
