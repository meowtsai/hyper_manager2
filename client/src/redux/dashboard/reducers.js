// @flow
import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from './constants';

const INIT_STATE = {
    stat: {},
    loading: true,
};

type DashboardAction = { type: string, payload: {} | string };
type State = { stat?: {} | null, loading?: boolean, +value?: boolean };

const Dashboard = (state: State = INIT_STATE, action: DashboardAction) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, loading: true };
        case GET_DATA_SUCCESS:
            return { ...state, stat: action.payload, loading: false, error: null };
        case GET_DATA_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Dashboard;
