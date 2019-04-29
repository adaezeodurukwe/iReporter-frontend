import axios from 'axios';
import 'babel-polyfill';

const BASE_URL = 'https://ireporter-endpoints.herokuapp.com/api/v1/';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

/**
 * @function signUp
 * @param {*} values
 * @returns {object} response
 */
export async function signUp(values) {
  try {
    const request = await axios.post(`${BASE_URL}/auth/signup`, values);
    if (request) localStorage.set('iReporterToken', request.data.data[0].token);
    return {
      type: SIGN_UP,
      payload: request,
    };
  } catch (error) {
    return {
      type: SIGN_UP_ERROR,
      payload: error.response.data,
    };
  }
}

/**
 * @function clear
 * @returns {object} clear
 */
export function clear() {
  return {
    type: CLEAR_ERROR,
  };
}
