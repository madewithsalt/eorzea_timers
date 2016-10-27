import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import clock from './clockReducer';
import nodelist from './nodeListReducer';

const rootReducer = combineReducers({
  clock,
  routing,
  nodelist
});

export default rootReducer;
