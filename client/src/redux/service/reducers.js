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
  GET_SERVICE_STATISTICS_BY_HOUR,
  GET_SERVICE_STATISTICS_BY_HOUR_SUCCESS,
  GET_SERVICE_STATISTICS_BY_HOUR_FAILED,
  CLEAR_MESSAGE,
  GET_SERVICE_CONFIG,
  GET_SERVICE_CONFIG_SUCCESS,
  GET_QUESTIONS_BY_USER,
  GET_QUESTIONS_BY_USER_SUCCESS,
  GET_QUESTIONS_BY_USER_FAILED,
  FAVORITE_QUESTION_ACTION,
  FAVORITE_QUESTION_ACTION_SUCCESS,
  FAVORITE_QUESTION_ACTION_FAILED,
  ADD_QUESTION_TO_BATCH,
  ADD_QUESTION_TO_BATCH_SUCCESS,
  ADD_QUESTION_TO_BATCH_FAILED,
  REMOVE_QUESTION_FROM_BATCH,
  REMOVE_QUESTION_FROM_BATCH_SUCCESS,
  REMOVE_QUESTION_FROM_BATCH_FAILED,
  ADD_MULTIPLE_QUESTIONS_TO_BATCH,
  ADD_MULTIPLE_QUESTIONS_TO_BATCH_SUCCESS,
  ADD_MULTIPLE_QUESTIONS_TO_BATCH_FAILED
} from './constants';

const INIT_STATE = {
  list: [],
  current: {},
  loading: true,
  error: '',
  allgames: [],
  antsHandleData: [],
  qCountData: [],
  csHandleData: [],
  csHandleAllocationData: [],
  antsHandleAllocationData: [],
  statReportData: [],
  games_list: [],
  user_history: [],
  vip: null,
  add_favor_ok: false,
  tasks: []
};

type ServiceAction = { type: string, payload: {} | string };
type State = {
  list?: [] | null,
  current?: {} | null,
  test_list?: [] | null,
  loading?: boolean,
  add_favor_ok?: boolean,
  tasks?: [] | null,
  +value?: boolean,
  error?: string,
  question_type?: {} | null,
  question_status?: {} | null,
  games_list?: [] | null,
  reply_query?: [] | null,
  ovToday?: {} | null,
  ovTotal?: {} | null,
  ovAllocate?: [] | null,
  ovAllocateNew?: [] | null,
  user_history?: [] | null,
  updateOKMessage?: string
};

const Service = (state: State = INIT_STATE, action: ServiceAction) => {
  let tmpGameIds = [];
  switch (action.type) {
    case GET_OVERVIEW:
    case GET_CURRENT_QUESTION:
    case ALLOCATE_QUESTION:
    case REPLY_QUESTION:
    case CLOSE_QUESTION:
    case GET_SERVICE_STATISTICS:
    case GET_SERVICE_STATISTICS_BY_HOUR:
    case ADD_MULTIPLE_QUESTIONS_TO_BATCH:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REMOVE_QUESTION_FROM_BATCH:
    case ADD_QUESTION_TO_BATCH:
    case FAVORITE_QUESTION_ACTION:
      return { ...state };
    case GET_QUESTIONS:
      return {
        ...state,
        loading:
          Object.keys(action.payload).length === 1 &&
          action.payload.status === '1'
            ? false
            : true,
        error: null
      };
    case ADD_QUESTION_TO_BATCH_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          q_batch_info: [action.payload.batch_info]
        },
        list: state.list.map(q => {
          if (q.id === action.payload.batch_info.question_id) {
            return { ...q, is_batch: 1 };
          } else {
            return q;
          }
        }),
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };

    case ADD_MULTIPLE_QUESTIONS_TO_BATCH_SUCCESS:
      return {
        ...state,
        list: state.list.map(q => {
          if (action.payload.ids.indexOf(q.id) > -1) {
            return { ...q, is_batch: 1 };
          } else {
            return q;
          }
        }),
        loading: false,
        error: null
      };
    case REMOVE_QUESTION_FROM_BATCH_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          q_batch_info: []
        },
        list: state.list.map(q => {
          if (q.id === Number.parseInt(action.payload.removed_q_id)) {
            return { ...q, is_batch: 0 };
          } else {
            return q;
          }
        }),

        updateOKMessage: action.payload.msg,
        loading: false,
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
    case FAVORITE_QUESTION_ACTION_SUCCESS:
      //res.json({question_id:qId, is_favorite: action === "add" ? 1 : 0});
      return {
        ...state,
        list: state.list.map(q => {
          if (q.id === action.payload.question_id) {
            return { ...q, is_favorite: action.payload.is_favorite };
          } else {
            return q;
          }
        }),
        current: {
          ...state.current,
          question: {
            ...state.current.question,
            is_favorite: action.payload.is_favorite
          }
        },
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

          replies: action.payload.updateQuestionData
            ? [
                ...state.current.replies,
                { id: action.payload.id, ...action.payload.updatedField }
              ]
            : [
                ...state.current.replies.map(reply =>
                  reply.id !== action.payload.id
                    ? reply
                    : { ...reply, ...action.payload.updatedField }
                )
              ]
        },
        updateOKMessage: action.payload.msg,
        loading: false,
        error: null
      };

    case GET_QUESTIONS_BY_USER_SUCCESS:
      return {
        ...state,
        user_history: action.payload.list,
        vip: action.payload.vip
      };
    case GET_QUESTIONS_BY_USER_FAILED:
    case GET_QUESTIONS_BY_USER:
      return {
        ...state,
        user_history: []
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
        loading: false,
        error: null,
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
    case GET_SERVICE_CONFIG_SUCCESS:
      return {
        ...state,
        games_list: action.payload.games_list,
        question_type: action.payload.question_type,
        question_status: action.payload.question_status,
        cs_admins: action.payload.cs_admins,
        ants_admins: action.payload.ants_admins,
        loading: false,
        error: null
      };
    case GET_SERVICE_STATISTICS_BY_HOUR_SUCCESS:
      return {
        ...state,
        question_type: action.payload.question_type,
        allgames: action.payload.statReportData.reduce(function(prev, curr) {
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
        statReplyData: action.payload.statReplyData,
        statReportData: action.payload.statReportData,
        loading: false,
        error: null
      };
    case GET_SERVICE_STATISTICS_SUCCESS:
      const {
        antsHandleData,
        qCountData,
        csHandleData,
        csHandleAllocationData,
        antsHandleAllocationData
      } = action.payload;

      return {
        ...state,
        question_type: action.payload.question_type,
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
        csHandleAllocationData,
        antsHandleAllocationData,
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
        allocation_status,
        add_favor_ok,
        tasks
      } = action.payload;
      return {
        ...state,
        list: query,
        question_type,
        question_status,
        reply_query,
        newAllocationStatus,
        allocation_status,
        add_favor_ok,
        tasks,
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
    case FAVORITE_QUESTION_ACTION_FAILED:
    case ADD_QUESTION_TO_BATCH_FAILED:
    case REMOVE_QUESTION_FROM_BATCH_FAILED:
    case ADD_MULTIPLE_QUESTIONS_TO_BATCH_FAILED:
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
