import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Clock from './Clock';
import {omit} from 'lodash';

const version = '2.0.0';

const Menu = (props) => {
  const navItems = [
    { url: '/watch', name: 'Watch List', count: props.watchCount },
    {
      url: '/about',
      name: 'About'
    }
  ];
  return (
    <ul { ...omit(props, ['clock', 'watchCount']) }>
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
            clock,
            watchListCount
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
          <Menu className="nav navbar-nav right hide-on-med-and-down" watchCount={watchListCount} />
          <Menu ref={(sidebar) => { this.sidebarNav = sidebar; }} watchCount={watchListCount}
            id="sidebar" className="side-nav" clock={clock} />
        </div>
      </nav>
    )
  }
};

const mapStateToProps = state => {
  return {
    clock: state.clock,
    watchListCount: state.watchlist.nodes.length
  };
}

export default connect(mapStateToProps)(MainNav);
