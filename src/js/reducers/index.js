import { combineReducers } from 'redux';
import CounterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: CounterReducer
});

export default rootReducer;
