import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Home from './modules/Home';
import About from './modules/About';

import MainNav from './components/MainNav';

export default(
  <Router history={browserHistory}>
      <Route path="/" component={Home}>
          <IndexRoute component={Home}/>
      </Route>
      <Route path="/about" component={About}/>
  </Router>
);
