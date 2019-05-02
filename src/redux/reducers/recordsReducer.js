import {
  GET_RECORDS,
  GET_RECORD,
  GET_USER_RECORDS,
  CREATE_RECORD,
  CREATE_RECORD_ERROR,
  CLEAR_ERROR,
  UPDATE_RECORD_ERROR,
  UPDATE_RECORD,
} from '../actions';

const initialState = {
  records: [],
  record: {},
  error: {},
  created: false,
  updated: true,
};

/**
 * @function authReducer
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
const recordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECORDS:
      return {
        ...state,
        records: payload.data.data,
      };
    case GET_RECORD:
      return {
        ...state,
        record: payload,
        records: [],
      };
    case GET_USER_RECORDS:
      return {
        ...state,
        record: {},
        records: payload,
      };
    case CREATE_RECORD:
      return {
        ...state,
        record: payload,
        created: true,
      };
    case UPDATE_RECORD:
      return {
        ...state,
        updated: true,
      };
    case CREATE_RECORD_ERROR:
      return {
        ...state,
        error: payload,
        updated: false,
      };
    case UPDATE_RECORD_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
        created: false,
        updated: false,
      };
    default:
      return state;
  }
};

export default recordReducer;
