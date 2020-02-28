import {
  GET_SERIAL_RECORDS,
  GET_SERIAL_RECORDS_SUCCESS,
  GET_SERIAL_RECORDS_FAILED
} from './constants';

const INIT_STATE = {
  serial_list: [],
  loading: true,
  errors: {}
};
type EventAction = { type: string, payload: {} | string };
type State = {
  serial_list?: [] | null,
  loading?: boolean,
  error?: string
};

const Event = (state: State = INIT_STATE, action: EventAction) => {
  switch (action.type) {
    case GET_SERIAL_RECORDS:
      return { ...state, loading: true, error: null };

    case GET_SERIAL_RECORDS_SUCCESS:
      return {
        ...state,
        serial_list: action.payload,
        loading: false,
        error: null
      };

    case GET_SERIAL_RECORDS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return { ...state };
  }
};

export default Event;
