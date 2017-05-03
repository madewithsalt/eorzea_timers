import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Clock from './Clock';
import {omit} from 'lodash';

const Menu = (props) => {
  const navItems = [// { url: '/watch', name: 'Watch List' },
    {
      url: '/about',
      name: 'About'
    }
  ];
  return (
    <ul { ...omit(props, 'clock') }>
      <li className='nav-item'>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
      </li>
      {navItems.map(item => (
        <li key={item.name.toLowerCase()} className="nav-item">
          <NavLink to={item.url} activeClassName="active">{item.name}</NavLink>
        </li>
      ))}
      <li className={`nav-clock nav-item ${props.clock.meridiem.toLowerCase()}`}>
        <Clock className="inline-block"/>
      </li>
    </ul>
  )
}

class MainNav extends Component {
  componentDidMount(nextProps, nextState) {
    $(this.menuToggle).sideNav({
      edge: 'right'
    });
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
            <span className="version">{VERSION}</span>
          </div>
          <a href="#" ref={(button) => { this.menuToggle = button; }}
            data-activates="sidebar"
            className="button-collapse right">
              <i className="material-icons">menu</i>
          </a>
          <Menu className="nav navbar-nav right hide-on-med-and-down" clock={clock} />
          <Menu ref={(sidebar) => { this.sidebarNav = sidebar; }}
            id="sidebar" className="side-nav" clock={clock} />
        </div>
      </nav>
    )
  }
};

const mapStateToProps = state => {
  return {clock: state.clock};
}

export default connect(mapStateToProps)(MainNav);
