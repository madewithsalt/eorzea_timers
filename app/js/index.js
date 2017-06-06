import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { throttle, assign } from 'lodash';
import IS_DEV from 'isdev';

import App from './App';
import reducers from './reducers';
import { loadState, saveState, clearState } from './utils/storageUtils';
import { setTime } from './utils/timeUtils';

const persistedState = loadState() || {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(
  reducers,
  assign({}, persistedState, {
    clock: setTime()
  }),
  enhancer
);

store.subscribe(throttle(() => {
  saveState({
    version: store.getState().version,
    watchgroups: store.getState().watchgroups,
    settings: store.getState().settings,
    watchlist: store.getState().watchlist,
    customlist: store.getState().customlist
  });
}, 1000));

const Root = (props) => (<App store={store} />);

export default Root;
