import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Home from './modules/Home';
import About from './modules/About';
import Repos from './modules/Repos';
import Repo from './modules/Repo';

export default(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/repos" component={Repos}>
              <Route path="/repos/:userName/:repoName" component={Repo}/>
          </Route>
      </Route>
      <Route path="/about" component={About}/>
  </Router>
);
