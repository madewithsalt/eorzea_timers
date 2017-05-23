import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Clock from './Clock';
import {omit} from 'lodash';

const version = '2.0.0';

const Menu = (props) => {
  const navItems = [
    { url: '/watch', name: 'Watch List' },
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
      { props.clock ? (
        <li className={`nav-clock nav-item ${props.clock.meridiem.toLowerCase()}`}>
          <Clock className="inline-block"/>
        </li>
      ) : null }
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
            <span className="version">{version}</span>
          </div>
          <div className={`right nav-clock ${clock.meridiem.toLowerCase()}`}>
            <Clock className="inline-block"/>
          </div>
          <a href="#" ref={(button) => { this.menuToggle = button; }}
            data-activates="sidebar"
            className="button-collapse right">
              <i className="material-icons">menu</i>
          </a>
          <Menu className="nav navbar-nav right hide-on-med-and-down" />
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
