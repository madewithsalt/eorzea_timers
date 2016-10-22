import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import clock from './clockReducer';

const rootReducer = combineReducers({
  clock,
  routing
});

export default rootReducer;
