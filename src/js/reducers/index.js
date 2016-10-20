import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import CounterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: CounterReducer,
  routing
});

export default rootReducer;
