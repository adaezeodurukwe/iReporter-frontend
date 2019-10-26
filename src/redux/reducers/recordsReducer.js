import {
  GET_RECORDS,
  GET_RECORD,
  GET_USER_RECORDS,
  CREATE_RECORD,
  CREATE_RECORD_ERROR,
  CLEAR_ERROR,
  UPDATE_RECORD_ERROR,
  UPDATE_RECORD,
  DELETE_RECORD,
  UPDATE_STATUS,
  UPDATE_STATUS_ERROR,
  CLOSE_NAV,
  OPEN_NAV
} from '../actions';

export const initialState = {
  records: [],
  record: {},
  error: {},
  created: false,
  updated: false,
  deleted: false,
  showNav: false
};

/**
 * @function authReducer
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export const recordReducer = (state = initialState, { type, payload }) => {
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
    case UPDATE_STATUS:
      return {
        ...state,
        record: payload,
        updated: true,
      };
    case UPDATE_STATUS_ERROR:
      return {
        ...state,
        error: payload,
        updated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
        created: false,
        updated: false,
        deleted: false,
      };
    case DELETE_RECORD:
      return {
        ...state,
        error: {},
        deleted: true,
        created: false,
        updated: false,
      };
    case CLOSE_NAV:
      return {
        ...state,
        showNav: payload
      };
    case OPEN_NAV:
      return {
        ...state,
        showNav: payload
      };
    default:
      return state;
  }
};

export default recordReducer;
