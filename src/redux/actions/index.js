import axios from 'axios';
import 'babel-polyfill';

const BASE_URL = 'https://ireporter-endpoints.herokuapp.com/api/v1';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_RECORDS = 'GET_RECORDS';
export const GET_RECORD = 'GET_RECORD';

/**
 * @function signUp
 * @param {*} values
 * @returns {object} response
 */
export async function signUp(values) {
  try {
    const request = await axios.post(`${BASE_URL}/auth/signup`, values);
    if (request) localStorage.setItem('iReporterToken', request.data.data[0].token);
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
 * @function signIn
 * @param {*} values
 *  @param {*} setToken
 * @returns {object} response
 */
export async function signIn(values) {
  try {
    const request = await axios.post(`${BASE_URL}/auth/signin`, values);

    if (request) localStorage.setItem('iReporterToken', request.data.data[0].token);
    return {
      type: LOGIN,
      payload: request,
    };
  } catch (error) {
    return {
      type: LOGIN_ERROR,
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

/**
 * @function getRecords
 * @returns {object} records
 */
export async function getRecords() {
  const request = await axios.get(`${BASE_URL}/records`);

  return {
    type: GET_RECORDS,
    payload: request,
  };
}

/**
 * @function clear
 * @param {string} type
 * @param {uuid} id
 * @returns {object} clear
 */
export async function getRecord(type, id) {
  const request = await axios.get(`${BASE_URL}/${type}/${id}`);

  return {
    type: GET_RECORD,
    payload: request,
  };
}
