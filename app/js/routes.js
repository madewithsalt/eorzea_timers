import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import WatchList from './containers/WatchList';
import CustomContent from './containers/CustomContent';

import MainNav from './components/MainNav';

export default () => (
  <Router>
    <div>
      <MainNav />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/watch" component={WatchList} />
        <Route path="/custom" component={CustomContent} />
        <Route path="/about" component={About}/>
      </div>
    </div>
  </Router>
);
