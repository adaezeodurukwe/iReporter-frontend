import {
  GET_RECORDS,
  GET_RECORD,
} from '../actions';

const initialState = {
  records: [],
  record: {},
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
    default:
      return state;
  }
};

export default recordReducer;
