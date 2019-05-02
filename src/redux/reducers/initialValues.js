import { GET_RECORD } from '../actions';

const initialState = {
  location: '',
  comment: '',
};

/**
 * @function values
 * @param {*} state
 * @param {*} action
 * @returns {object} state
 */
const values = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECORD:
      return {
        ...state,
        location: payload.data.data.location,
        comment: payload.data.data.comment,
      };
    default:
      return state;
  }
};

export default values;
