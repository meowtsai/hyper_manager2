// @flow
import {
  GET_BATCH_TASKS,
  GET_BATCH_TASKS_SUCCESS,
  GET_BATCH_TASKS_FAILED,
  EDIT_BATCH_TASK,
  EDIT_BATCH_TASK_SUCCESS,
  EDIT_BATCH_TASK_FAILED,
  DELETE_BATCH_TASK,
  DELETE_BATCH_TASK_SUCCESS,
  DELETE_BATCH_TASK_FAILED,
  CLEAR_BATCH_TASK_MESSAGE,
  GET_CURRENT_BATCH_TASK,
  GET_CURRENT_BATCH_TASK_SUCCESS,
  GET_CURRENT_BATCH_TASK_FAILED,
  REMOVE_BATCH_Q,
  REMOVE_BATCH_Q_SUCCESS,
  REMOVE_BATCH_Q_FAILED,
  REMOVE_Q_FROM_BATCH,
  REMOVE_Q_FROM_BATCH_SUCCESS,
  REMOVE_Q_FROM_BATCH_FAILED,
  BATCH_REPLY_ACTION,
  BATCH_REPLY_ACTION_SUCCESS,
  BATCH_REPLY_ACTION_FAILED
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  affectedId: null,
  currentRecord: {},
  updateOKMessage: null,
  error: {},
  question_type: {}
};

type batchAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  affectedId?: number | null,
  currentRecord?: {} | null,
  question_type?: {} | null,
  updateOKMessage?: string | null,
  error?: {} | null
};

const BatchTasks = (state: State = INIT_STATE, action: batchAction) => {
  switch (action.type) {
    case GET_BATCH_TASKS:
    case EDIT_BATCH_TASK:
    case DELETE_BATCH_TASK:
    case GET_CURRENT_BATCH_TASK:
    case REMOVE_BATCH_Q:
    case REMOVE_Q_FROM_BATCH:
    case BATCH_REPLY_ACTION:
      return { ...state, loading: true };
    case GET_CURRENT_BATCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentRecord: {
          ...action.payload.task,
          q_list: action.payload.q_list
        },
        question_type: action.payload.question_type
      };
    case CLEAR_BATCH_TASK_MESSAGE:
      return {
        ...state,
        error: null,
        updateOKMessage: null
      };
    case REMOVE_BATCH_Q_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentRecord: {
          ...state.currentRecord,
          q_list: []
        }
      };
    case REMOVE_Q_FROM_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentRecord: {
          ...state.currentRecord,
          q_list: [
            ...state.currentRecord.q_list.filter(
              q =>
                q.question_id !== Number.parseInt(action.payload.removed_q_id)
            )
          ]
        }
      };
    case EDIT_BATCH_TASK_SUCCESS:
      //console.log("action.payload.affectedRow", action.payload.action);
      return {
        ...state,
        list:
          action.payload.action === "add"
            ? [
                ...state.list,
                { id: action.payload.affectedId, ...action.payload.affectedRow }
              ]
            : state.list.map(task =>
                task.id === action.payload.affectedId
                  ? action.payload.affectedRow
                  : task
              ),
        loading: false,
        error: null,
        updateOKMessage: action.payload.msg
      };

    case BATCH_REPLY_ACTION_SUCCESS:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          status: action.payload.mode
        },
        loading: false,
        error: null,
        updateOKMessage: action.payload.msg
      };
    case GET_BATCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.batch_tasks,
        games: action.payload.games
      };
    case BATCH_REPLY_ACTION_FAILED:
    case GET_BATCH_TASKS_FAILED:
    case EDIT_BATCH_TASK_FAILED:
    case DELETE_BATCH_TASK_FAILED:
    case GET_CURRENT_BATCH_TASK_FAILED:
    case REMOVE_BATCH_Q_FAILED:
    case REMOVE_Q_FROM_BATCH_FAILED:
      return { ...state, error: action.payload, loading: false };
    case DELETE_BATCH_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter(
          task => task.id !== Number.parseInt(action.payload.deleted_id)
        ),
        loading: false,
        error: null,
        updateOKMessage: action.payload.msg
      };

    default:
      return { ...state };
  }
};

export default BatchTasks;
