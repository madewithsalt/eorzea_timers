import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Clock from './Clock';
import {omit} from 'lodash';


class MainNav extends Component {
  componentDidMount(nextProps, nextState) {
    $(this.menuToggle).sideNav({
      edge: 'right'
    });

    $('#sidebar a').on('click', () => {
      $(this.menuToggle).sideNav('hide');
    })
  }

  renderMenu(className, id) {
    const {
      watchCount,
      customCount,
      clock
    } = this.props;

    const navItems = [
      { url: '/watch', name: 'Watch List', count: watchCount },
      {
        url: '/custom',
        name: 'My Timers',
        count: customCount
      },
      {
        url: '/about',
        name: 'About'
      }

    ];

    return (
      <ul className={className || ''} id={ id || null }>
        <li className='nav-item'>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        { navItems.map(item => {
          return (
            <li key={item.name.toLowerCase()} className="nav-item">
              <NavLink to={item.url} activeClassName="active">
                <span>{ item.name }</span>
                { item.count ? (
                  <span className="label">{item.count}</span>
                ): null }
              </NavLink>
            </li>
          )
        })}
        { id ? (
          <li className={`nav-clock nav-item ${clock.meridiem.toLowerCase()}`}>
            <Clock className="inline-block"/>
          </li>
        ) : null }
      </ul>
    )
  }

  render() {
    const {
            toggleSidebar
          } = this,
          {
            clock
          } = this.props;

    return (
      <nav className="primary-nav">
        <div className="nav-wrapper">
          <div className="brand-logo website-title">
            <span>Eorzea Timers</span>&nbsp;
            <span className="version">{this.props.version.toString()}</span>
          </div>
          <div className={`right nav-clock ${clock.meridiem.toLowerCase()}`}>
            <Clock className="inline-block"/>
          </div>
          <a href="#" ref={(button) => { this.menuToggle = button; }}
            data-activates="sidebar"
            className="button-collapse right">
              <i className="material-icons">menu</i>
          </a>
          <div>{ this.renderMenu("nav navbar-nav right hide-on-med-and-down") }</div>
          <div ref={(sidebar) => { this.sidebarNav = sidebar; }}>
            { this.renderMenu("side-nav", "sidebar") }
          </div>
        </div>
      </nav>
    )
  }
};

const mapStateToProps = state => {
  return {
    clock: state.clock,
    watchCount: state.watchlist.nodes.length,
    customCount: state.customlist.length,
    version: state.version
  };
}

export default connect(mapStateToProps)(MainNav);
