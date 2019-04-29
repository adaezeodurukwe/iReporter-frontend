import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import Reducer
import authReducer from './authReducer';
import records from './recordsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  records,
});

export default rootReducer;
