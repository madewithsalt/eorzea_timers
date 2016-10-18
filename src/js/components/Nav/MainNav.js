import React, { Component } from 'react';
import { IndexLink } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    var navItems = [
      { url: '/about', name: 'About' },
      { url: '/repos', name: 'Repos' }
    ];

    return (
      <div className="navbar navbar-dark bg-faded">
        <ul role="nav" className="nav navbar-nav">
          <li className='nav-item'><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          { navItems.map(function(item) {
              return (
                <li className="nav-item" key={item.name.toLowerCase()}>
                  <NavLink to={item.url} activeClassName="active">{item.name}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
})
