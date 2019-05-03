import {
  SIGN_UP,
  SIGN_UP_ERROR,
  CLEAR_ERROR,
  LOGIN,
  LOGIN_ERROR,
} from '../actions';

export const initialState = {
  signedUp: false,
  loggedIn: false,
  error: {},
};

/**
 * @function authReducer
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
export const authReducer = (state = initialState, { type, payload }) => {
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
    case LOGIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default authReducer;
