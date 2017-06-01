import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import assign from 'lodash/assign';
import IS_DEV from 'isdev';

import App from './App';
import reducers from './reducers';
import { loadState, saveState } from './utils/storageUtils';
import { setTime } from './utils/timeUtils';

const persistedState = loadState() || {};

const store = createStore(
  reducers,
  assign({}, persistedState, {
    clock: setTime()
  }),
  IS_DEV ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {}
);

store.subscribe(throttle(() => {
  saveState({
    watchgroups: store.getState().watchgroups,
    settings: store.getState().settings,
    watchlist: store.getState().watchlist
  });
}, 1000));

const Root = (props) => (<App store={store} />);

export default Root;
