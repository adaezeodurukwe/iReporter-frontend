import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import Reducer
import authReducer from './authReducer';
import records from './recordsReducer';
import initialValues from './initialValues';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  recs: records,
  initialValues,
});

export default rootReducer;
