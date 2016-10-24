import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import Clock from './Clock';

const MainNav = ({clock, version}) => {
  const navItems = [
      { url: '/watch', name: 'Watch List' },
      { url: '/about', name: 'About' }
    ];
  return (
    <div className="navbar navbar-dark">
      <div className="navbar-brand website-title">
        <span>Eorzea Timers</span>&nbsp;
        <span className="version">{VERSION}</span>
      </div>
      <ul role="nav" className="nav navbar-nav pull-right">
        <li className='nav-item'><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
        { navItems.map(item => (
          <li key={item.name.toLowerCase()} className="nav-item">
            <Link to={item.url}  activeClassName="active">{item.name}</Link>
          </li>
        ))}
        <li className={`nav-clock nav-item ${clock.meridiem.toLowerCase()}`}><Clock className="inline-block" /></li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return { clock: state.clock };
}

export default connect(mapStateToProps)(MainNav);
