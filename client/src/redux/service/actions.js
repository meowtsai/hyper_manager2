// @flow
import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
  GET_CURRENT_QUESTION,
  GET_CURRENT_QUESTION_SUCCESS,
  GET_CURRENT_QUESTION_FAILED,
  UPDATE_QUESTION_TYPE,
  UPDATE_QUESTION_TYPE_SUCCESS,
  UPDATE_QUESTION_TYPE_FAILED,
  UPDATE_QUESTION_STATUS,
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
  GET_TEST_DATA,
  GET_TEST_DATA_SUCCESS,
  GET_TEST_DATA_FAILED,
  GET_OVERVIEW,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_FAILED,
  CLEAR_MESSAGE
} from "./constants";

type ServiceAction = { type: string, payload: {} | string };

export const getQuestions = (condition: {}): ServiceAction => ({
  type: GET_QUESTIONS,
  payload: condition
});

export const getQuestionsSuccess = (data: []): ServiceAction => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: data
});

export const getQuestionsFailed = (error: string): ServiceAction => ({
  type: GET_QUESTIONS_FAILED,
  payload: error
});

export const getCurrentQuestion = (question_id: string): ServiceAction => ({
  type: GET_CURRENT_QUESTION,
  payload: question_id
});

export const getCurrentQuestionSuccess = (data: {}): ServiceAction => ({
  type: GET_CURRENT_QUESTION_SUCCESS,
  payload: data
});

export const getCurrentQuestionFailed = (error: string): ServiceAction => ({
  type: GET_CURRENT_QUESTION_FAILED,
  payload: error
});

export const updateQuestionType = (
  qId: number,
  newType: string
): ServiceAction => ({
  type: UPDATE_QUESTION_TYPE,
  payload: { qId, newType }
});

export const updateQuestionTypeSuccess = (result: {}): ServiceAction => ({
  type: UPDATE_QUESTION_TYPE_SUCCESS,
  payload: result
});

export const updateQuestionTypeFailed = (error: string): ServiceAction => ({
  type: UPDATE_QUESTION_TYPE_FAILED,
  payload: error
});

export const allocateQuestion = (
  aField: {},
  allocateStatus: number
): ServiceAction => ({
  type: ALLOCATE_QUESTION,
  payload: { aField, allocateStatus }
});

export const allocateQuestionSuccess = (result: {}): ServiceAction => ({
  type: ALLOCATE_QUESTION_SUCCESS,
  payload: result
});

export const allocateQuestionFailed = (error: string): ServiceAction => ({
  type: ALLOCATE_QUESTION_FAILED,
  payload: error
});

export const replyQuestion = (replyContent: {}): ServiceAction => ({
  type: REPLY_QUESTION,
  payload: replyContent
});

export const replyQuestionSuccess = (result: {}): ServiceAction => ({
  type: REPLY_QUESTION_SUCCESS,
  payload: result
});

export const replyQuestionFailed = (error: string): ServiceAction => ({
  type: REPLY_QUESTION_FAILED,
  payload: error
});

export const closeQuestion = (
  question_id: {},
  closeType: number
): ServiceAction => ({
  type: CLOSE_QUESTION,
  payload: { question_id, closeType }
});

export const closeQuestionSuccess = (result: {}): ServiceAction => ({
  type: CLOSE_QUESTION_SUCCESS,
  payload: result
});

export const closeQuestionFailed = (error: string): ServiceAction => ({
  type: CLOSE_QUESTION_FAILED,
  payload: error
});

export const updateQuestionStatus = (
  qId: number,
  newStatus: string
): ServiceAction => ({
  type: UPDATE_QUESTION_STATUS,
  payload: { qId, newStatus }
});

export const updateQuestionStatusSuccess = (result: {}): ServiceAction => ({
  type: UPDATE_QUESTION_STATUS_SUCCESS,
  payload: result
});

export const updateQuestionStatusFailed = (error: string): ServiceAction => ({
  type: UPDATE_QUESTION_STATUS_FAILED,
  payload: error
});

export const getTestData = (condition: {}): ServiceAction => ({
  type: GET_TEST_DATA,
  payload: condition
});

export const getTestDataSuccess = (data: []): ServiceAction => ({
  type: GET_TEST_DATA_SUCCESS,
  payload: data
});

export const getTestDataFailed = (error: string): ServiceAction => ({
  type: GET_TEST_DATA_FAILED,
  payload: error
});
export const getOverview = (): ServiceAction => ({
  type: GET_OVERVIEW
});

export const getOverviewSuccess = (data: []): ServiceAction => ({
  type: GET_OVERVIEW_SUCCESS,
  payload: data
});

export const getOverviewFailed = (error: string): ServiceAction => ({
  type: GET_OVERVIEW_FAILED,
  payload: error
});

export const clearMessage = (): ServiceAction => ({
  type: CLEAR_MESSAGE
});
