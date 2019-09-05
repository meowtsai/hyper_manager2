// @flow
import { GET_SERVERS, GET_SERVERS_SUCCESS, GET_SERVERS_FAILED } from './constants';

type ServersAction = { type: string, payload: {} | string };

export const getServersByGameId = (game_id: string): ServersAction => ({
    type: GET_SERVERS,
    payload: game_id,
});

export const getServersSuccess = (data: []): ServersAction => ({
    type: GET_SERVERS_SUCCESS,
    payload: data,
});

export const getServersFailed = (error: string): ServersAction => ({
    type: GET_SERVERS_FAILED,
    payload: error,
});
