import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import clock from './clockReducer';
import nodelist from './nodeListReducer';
import search from './searchReducer';
import watchlist from './watchListReducer';
import settings from './settingsReducer';
import page from './pageReducer';
import watchgroups from './watchGroupsReducer';
import customlist from './customListReducer';

const version = (state) => "2.1.3";

const rootReducer = combineReducers({
  clock,
  routing,
  nodelist,
  search,
  watchlist,
  settings,
  page,
  watchgroups,
  customlist,
  version
});

export default rootReducer;
