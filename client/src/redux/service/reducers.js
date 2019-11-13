import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
  GET_CURRENT_QUESTION,
  GET_CURRENT_QUESTION_SUCCESS,
  GET_CURRENT_QUESTION_FAILED,
  UPDATE_QUESTION_TYPE_SUCCESS,
  UPDATE_QUESTION_TYPE_FAILED,
  UPDATE_QUESTION_STATUS_SUCCESS,
  UPDATE_QUESTION_STATUS_FAILED,
  ALLOCATE_QUESTION,
  ALLOCATE_QUESTION_SUCCESS,
  ALLOCATE_QUESTION_FAILED,
  REPLY_QUESTION,
  REPLY_QUESTION_SUCCESS,
  REPLY_QUESTION_FAILED,
  CLOSE_QUESTION,
  CLOSE_QUESTION_SUCCESS,
  CLOSE_QUESTION_FAILED,
  GET_TEST_DATA_SUCCESS,
  GET_OVERVIEW,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_FAILED,
  GET_SERVICE_STATISTICS,
  GET_SERVICE_STATISTICS_SUCCESS,
  GET_SERVICE_STATISTICS_FAILED,
  CLEAR_MESSAGE
} from "./constants";

const INIT_STATE = {
  list: [],
  current: {},
  loading: true,
  error: "",
  allgames: [],
  antsHandleData: [],
  qCountData: [],
  csHandleData: []
};

type ServiceAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  current?: {} | null,
  test_list?: [] | null,
  loading?: boolean,
  +value?: boolean,
  error?: string,
  question_type?: {} | null,
  question_status?: {} | null,
  reply_query?: [] | null,
  ovToday?: {} | null,
  ovTotal?: {} | null,
  ovAllocate?: [] | null,
  ovAllocateNew?: [] | null,
  updateOKMessage?: string
};

const Service = (state: State = INIT_STATE, action: ServiceAction) => {
  switch (action.type) {
    case GET_OVERVIEW:
    case GET_CURRENT_QUESTION:
    case ALLOCATE_QUESTION:
    case REPLY_QUESTION:
    case CLOSE_QUESTION:
    case GET_SERVICE_STATISTICS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_QUESTIONS:
      return {
        ...state,
        error: null
      };
    case ALLOCATE_QUESTION_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          question: {
            ...state.current.question,
            ...action.payload.updatedField
          }
        },
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };
    case REPLY_QUESTION_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          question: {
            ...state.current.question,
            ...action.payload.updateQuestionData
          },

          replies: [
            ...state.current.replies.filter(
              reply => reply.id !== action.payload.id
            ),
            action.payload.updatedField
          ]
        },
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };
    case CLOSE_QUESTION_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          question: {
            ...state.current.question,
            ...action.payload.updatedField
          }
        },
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        updateOKMessage: null
      };
    case GET_CURRENT_QUESTION_SUCCESS:
      return {
        ...state,
        current: action.payload.stat,
        question_type: action.payload.question_type,
        question_status: action.payload.question_status,
        loading: false,
        error: null
      };
    case GET_SERVICE_STATISTICS_SUCCESS:
      const { antsHandleData, qCountData, csHandleData } = action.payload;
      var tmpGameIds = [];
      return {
        ...state,
        allgames: qCountData.reduce(function(prev, curr) {
          if (tmpGameIds.indexOf(curr.game_id) < 0) {
            tmpGameIds.push(curr.game_id);
            return [
              ...prev,
              { game_id: curr.game_id, game_name: curr.game_name }
            ];
          } else {
            return prev;
          }
        }, []),
        antsHandleData,
        qCountData,
        csHandleData,
        loading: false,
        error: null
      };

    case GET_OVERVIEW_SUCCESS:
      const { ovToday, ovTotal, ovAllocate, ovAllocateNew } = action.payload;
      return {
        ...state,
        ovToday,
        ovTotal,
        ovAllocate,
        ovAllocateNew,
        loading: false,
        error: null
      };

    case GET_QUESTIONS_SUCCESS:
      const {
        query,
        question_type,
        question_status,
        reply_query,
        newAllocationStatus,
        allocation_status
      } = action.payload;
      return {
        ...state,
        list: query,
        question_type,
        question_status,
        reply_query,
        newAllocationStatus,
        allocation_status,
        loading: false,
        error: null
      };
    case ALLOCATE_QUESTION_FAILED:
    case GET_SERVICE_STATISTICS_FAILED:
    case GET_QUESTIONS_FAILED:
    case UPDATE_QUESTION_TYPE_FAILED:
    case UPDATE_QUESTION_STATUS_FAILED:
    case GET_OVERVIEW_FAILED:
    case GET_CURRENT_QUESTION_FAILED:
    case REPLY_QUESTION_FAILED:
    case CLOSE_QUESTION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_QUESTION_TYPE_SUCCESS:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id
            ? { ...item, type: action.payload.type }
            : item
        ),
        current: {
          ...state.current,
          question: {
            ...state.current.question,
            type: action.payload.type
          }
        },
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };
    case UPDATE_QUESTION_STATUS_SUCCESS:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };

    case GET_TEST_DATA_SUCCESS:
      return {
        ...state,
        test_list: action.payload
      };

    default:
      return { ...state };
  }
};

export default Service;
