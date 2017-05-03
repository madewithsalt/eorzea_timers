import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import App from './App';
import reducers from './reducers';
import { loadState, saveState } from './utils/storageUtils';
import { setTime } from './utils/timeUtils';

require('./vendor/materialize.js');

import IS_DEV from 'isdev';

require('../style/main.sass')

const store = createStore(reducers, {
  clock: setTime()
}, IS_DEV ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {});

store.subscribe(throttle(() => {
  saveState({
    lists: store.getState().lists,
    settings: store.getState().settings
  });
}, 1000));

render(
    <App store={store} />,
    document.getElementById('app')
);
