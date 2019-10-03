import {
  GET_ALLOCATE_DATA_SUCCESS,
  GET_ALLOCATE_DATA_FAILED,
  GET_ALLOCATE_BY_ID_SUCCESS,
  GET_ALLOCATE_BY_ID_FAILED,
  POST_ALLOCATION,
  POST_ALLOCATION_SUCCESS,
  POST_ALLOCATION_FAILED,
  PUT_ALLOCATION,
  PUT_ALLOCATION_SUCCESS,
  PUT_ALLOCATION_FAILED,
  TAKE_ALLOCATION_TASKS,
  TAKE_ALLOCATION_TASKS_SUCCESS,
  TAKE_ALLOCATION_TASKS_FAILED,
  CLEAR_ALLOCATION_MESSAGE
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  error: "",
  allocation: null,
  allocation_logs: null,
  allocationStatus: null,
  updateOKMessage: null
};

type ServiceAllocateAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string,
  allocation?: {} | null,
  allocation_logs?: [] | null,
  allocationStatus: {} | null,
  updateOKMessage?: string | null
};

const ServiceAllocate = (
  state: State = INIT_STATE,
  action: ServiceAllocateAction
) => {
  //console.log("ServiceAllocate reducer ", action);
  switch (action.type) {
    case POST_ALLOCATION:
    case PUT_ALLOCATION:
    case TAKE_ALLOCATION_TASKS:
      return {
        ...state,
        error: null,
        loading: true
      };

    case TAKE_ALLOCATION_TASKS_SUCCESS:
      //console.log("TAKE_ALLOCATION_TASKS_SUCCESS", action.payload.logs);

      let newList = [];
      action.payload.logs.forEach(log => {
        let record = state.list.filter(
          item => item.id === log.allocation_id
        )[0];
        record = {
          ...record,
          allocate_status: log.allocate_status,
          assignee_name: log.assignee_name,
          assignee: log.assignee,
          lastestNote: log.allocate_note,
          ins_status: log.ins_status
        };

        newList = (newList.length > 0 ? newList : state.list).map(item => {
          if (item.id !== log.allocation_id) {
            return item;
          } else {
            return record;
          }
        });
      });

      return {
        ...state,
        newTasks: action.payload.tasks,
        updateOKMessage: action.payload.msg,
        list: newList,
        error: null,
        loading: false
      };

    case GET_ALLOCATE_BY_ID_SUCCESS:
      return {
        ...state,
        allocation: action.payload.allocation,
        allocation_logs: action.payload.allocation_logs,
        allocationStatus: action.payload.allocationStatus,
        error: null,
        loading: false
      };
    case PUT_ALLOCATION_SUCCESS:
      return {
        ...state,
        allocation: { ...state.allocation, ...action.payload.updatedField },
        allocation_logs: [...state.allocation_logs, action.payload.newLog],
        updateOKMessage: action.payload.msg,
        error: null,
        loading: false
      };
    case POST_ALLOCATION_SUCCESS:
      return {
        ...state,
        allocation: action.payload.updatedField,
        updateOKMessage: action.payload.msg,
        error: null,
        loading: false
      };
    case GET_ALLOCATE_DATA_SUCCESS:
      return {
        ...state,
        list: action.payload.all_records,
        allocationStatus: action.payload.allocationStatus,
        loading: false,
        error: null
      };
    case CLEAR_ALLOCATION_MESSAGE:
      return {
        ...state,
        updateOKMessage: null,
        error: null,
        loading: false
      };
    case POST_ALLOCATION_FAILED:
    case PUT_ALLOCATION_FAILED:
    case GET_ALLOCATE_DATA_FAILED:
    case GET_ALLOCATE_BY_ID_FAILED:
    case TAKE_ALLOCATION_TASKS_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default ServiceAllocate;
