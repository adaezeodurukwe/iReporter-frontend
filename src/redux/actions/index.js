import axios from 'axios';
import 'babel-polyfill';

const BASE_URL = 'https://ireporter-endpoints.herokuapp.com/api/v1';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CREATE_RECORD = 'CREATE_RECORD';
export const CREATE_RECORD_ERROR = 'CREATE_RECORD_ERROR';
export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_RECORDS = 'GET_RECORDS';
export const GET_RECORD = 'GET_RECORD';
export const GET_USER_RECORDS = 'GET_USER_RECORDS';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const UPDATE_RECORD_ERROR = 'UPDATE_RECORD_ERROR';
export const DELETE_RECORD = 'DELETE_RECORD';
export const DELETE_RECORD_ERROR = 'DELETE_RECORD_ERROR';
export const GET_USER = 'GET USER';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_STATUS_ERROR = 'UPDATE_STATUS_ERROR';
export const GET_USER_ERROR = 'GET_USER_ERROR';

/**
 * @function getUser
 * @returns {object} response
 */
export async function getUser() {
  const token = localStorage.getItem('iReporterToken');
  try {
    const request = await axios.get(`${BASE_URL}/auth/user`, { headers: { 'x-access-token': token } });
    const { user } = request.data;
    return {
      type: GET_USER,
      payload: user,
    };
  } catch (error) {
    return {
      type: GET_USER_ERROR,
      payload: error.response.data,
    };
  }
}

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
 * @function createRecord
 * @param {*} values
 * @returns {object} response
 */
export async function createRecord(values) {
  const type = values.type === 'intervention' ? 'interventions' : 'red-flags';
  const token = localStorage.getItem('iReporterToken');

  try {
    const request = await axios.post(`${BASE_URL}/${type}`, values, { headers: { 'x-access-token': token } });

    return {
      type: CREATE_RECORD,
      payload: request,
    };
  } catch (error) {
    return {
      type: CREATE_RECORD_ERROR,
      payload: error.response.data,
    };
  }
}

/**
 * @function deleteRecord
 * @param {*} type
 * @param {*} id
 * @returns {object} response
 */
export async function deleteRecord(type, id) {
  const recordType = type === 'intervention' ? 'interventions' : 'red-flags';
  const token = localStorage.getItem('iReporterToken');

  try {
    const request = await axios.delete(`${BASE_URL}/${recordType}/${id}`, { headers: { 'x-access-token': token } });

    return {
      type: DELETE_RECORD,
      payload: request,
    };
  } catch (error) {
    return {
      type: DELETE_RECORD_ERROR,
      payload: error.response.data,
    };
  }
}

/**
 * @function updateRecord
 * @param {*} type
 * @param {*} id
 * @param {*} values
 * @returns {object} response
 */
export async function updateRecord(type, id, { comment, location }) {
  const recordType = type === 'intervention' ? 'interventions' : 'red-flags';
  const token = localStorage.getItem('iReporterToken');

  try {
    const [updateComment, updateLocation] = await Promise.all([
      axios.patch(`${BASE_URL}/${recordType}/${id}/comment`, { comment, location }, { headers: { 'x-access-token': token } }),
      axios.patch(`${BASE_URL}/${recordType}/${id}/location`, { comment, location }, { headers: { 'x-access-token': token } })
    ]);
    return {
      type: UPDATE_RECORD,
      payload: { ...updateComment.data.data, ...updateLocation.data.data },
    };
  } catch (error) {
    return {
      type: UPDATE_RECORD_ERROR,
      payload: error.response.data,
    };
  }
}

/**
 * @function updateStatus
 * @param {*} type
 * @param {*} id
 * @param {*} values
 * @returns {object} response
 */
export async function updateStatus(type, id, { status }) {
  const recordType = type === 'intervention' ? 'interventions' : 'red-flags';
  const token = localStorage.getItem('iReporterToken');

  try {
    const request = await axios.patch(`${BASE_URL}/${recordType}/${id}/status`, { status }, { headers: { 'x-access-token': token } });

    return {
      type: UPDATE_STATUS,
      payload: request.data.data,
    };
  } catch (error) {
    return {
      type: UPDATE_STATUS_ERROR,
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

/**
 * @function clear
 * @param {string} type
 * @param {uuid} id
 * @returns {object} clear
 */
export async function getUserRecord() {
  const token = localStorage.getItem('iReporterToken');
  const [redFlagsRequest, interventionsRequest] = await Promise.all([
    axios.get(`${BASE_URL}/red-flags`, { headers: { 'x-access-token': token } }),
    axios.get(`${BASE_URL}/interventions`, { headers: { 'x-access-token': token } })
  ]);

  const request = redFlagsRequest.data.data.concat(interventionsRequest.data.data);

  return {
    type: GET_USER_RECORDS,
    payload: request,
  };
}
