import {
  GET_RECORDS,
} from '../actions';

const initialState = {
  records: [],
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
    default:
      return state;
  }
};

export default recordReducer;
