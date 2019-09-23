import {
  GET_ALLOCATE_DATA_SUCCESS,
  GET_ALLOCATE_DATA_FAILED
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  error: ""
};

type ServiceAllocateAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string
};

const ServiceAllocate = (
  state: State = INIT_STATE,
  action: ServiceAllocateAction
) => {
  switch (action.type) {
    case GET_ALLOCATE_DATA_SUCCESS:
      return { ...state, list: action.payload, loading: false, error: null };
    case GET_ALLOCATE_DATA_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default ServiceAllocate;
