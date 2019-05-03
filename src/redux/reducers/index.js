import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import Reducer
import authenticationReducer from './authReducer';
import records from './recordsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authenticationReducer,
  recs: records,
});

export default rootReducer;
