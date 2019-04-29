import { SIGN_UP, SIGN_UP_ERROR, CLEAR_ERROR } from '../actions';

const initialState = {
  signedUp: false,
  error: {},
};

/**
 * @function authReducer
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        signedUp: true,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};

export default authReducer;
