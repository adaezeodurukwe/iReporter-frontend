/* eslint-disable no-unused-vars */
import { authReducer, initialState } from '../redux/reducers/authReducer';
import { recordReducer, initialState as recordInitialState } from '../redux/reducers/recordsReducer';
import { recordsResponse, data } from '../__mocks__/response';
import {
  SIGN_UP,
  SIGN_UP_ERROR,
  LOGIN,
  LOGIN_ERROR,
  GET_RECORD,
  GET_RECORDS,
  GET_USER_RECORDS,
  UPDATE_RECORD,
  UPDATE_RECORD_ERROR,
  DELETE_RECORD,
  DELETE_RECORD_ERROR,
  CLEAR_ERROR,
} from '../redux/actions';


describe('Get test cases', () => {
  it('updates records array after fetching records', () => {
    const state = recordReducer(recordInitialState, {
      type: GET_RECORDS,
      payload: recordsResponse
    });
    expect(state.records).toEqual(data);
  });
  it('Updates record after fetching record', () => {
    const state = recordReducer(recordInitialState, {
      type: GET_RECORD,
      payload: recordsResponse
    });
    expect(state.record).toEqual(recordsResponse);
  });
  it('Updates user records after fetching', () => {
    const state = recordReducer(recordInitialState, {
      type: GET_USER_RECORDS,
      payload: data
    });
    expect(state.records).toEqual(data);
  });
});

describe('Clear Error', () => {
  it('should return clear error', () => {
    const state = recordReducer(recordInitialState, {
      type: CLEAR_ERROR,
    });
    expect(state.error).toEqual({});
  });
});

describe('Update test cases', () => {
  it('sets updated to true after deleting', () => {
    const state = recordReducer(recordInitialState, {
      type: UPDATE_RECORD,
    });
    expect(state.updated).toEqual(true);
  });
  it('sets updated to false when there is an error', () => {
    const state = recordReducer(recordInitialState, {
      type: UPDATE_RECORD_ERROR,
    });
    expect(state.updated).toEqual(false);
  });
});

describe('Delete test cases', () => {
  it('sets deleted to true after deleting', () => {
    const state = recordReducer(recordInitialState, {
      type: DELETE_RECORD,
    });
    expect(state.deleted).toEqual(true);
  });
});


describe('SignUp test cases', () => {
  it('sets signedUp to true after', () => {
    const state = authReducer(initialState, {
      type: SIGN_UP,
    });
    expect(state.signedUp).toEqual(true);
  });
  it('sets signedUp to false when there is an error', () => {
    const state = authReducer(initialState, {
      type: SIGN_UP_ERROR,
    });
    expect(state.signedUp).toEqual(false);
  });
});

describe('Login test cases', () => {
  it('sets loggedIn to true after LOGGING USER IN', () => {
    const state = authReducer(initialState, {
      type: LOGIN,
    });
    expect(state.loggedIn).toEqual(true);
  });
  it('sets loggedIn to false when there is an error', () => {
    const state = authReducer(initialState, {
      type: LOGIN_ERROR,
    });
    expect(state.loggedIn).toEqual(false);
  });
});
