import React from 'react';
import { render } from 'react-dom';
import App from './App';
import reducers from './reducers';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import { setTime } from './utils/timeUtils';

const store = createStore(reducers, {
  clock: setTime()
});

const history = syncHistoryWithStore(browserHistory, store);

render(
    <App store={store} history={history} />,
    document.getElementById('app')
);
