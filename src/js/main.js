import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import reducers from './reducers';
import { setTime } from './utils/timeUtils';

require('font-awesome/css/font-awesome.css');

injectTapEventPlugin();

const store = createStore(reducers, {
  clock: setTime()
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const history = syncHistoryWithStore(browserHistory, store);

render(
    <App store={store} history={history} />,
    document.getElementById('app')
);
