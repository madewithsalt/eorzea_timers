import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import bootstrap from 'bootstrap';
import styles from '../style/main.sass';

import routes from './routes';

var store = configureStore();

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('app'));
