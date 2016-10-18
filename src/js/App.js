import React, { Component } from 'react';
import MainNav from './components/Nav/MainNav';

export default React.createClass({
  render() {
    return (
      <div>
        <MainNav />
        { this.props.children}
      </div>
    )
  }
})
