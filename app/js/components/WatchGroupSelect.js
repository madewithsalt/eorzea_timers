import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isObject } from 'lodash';

import {
  replaceList
} from '../actions/watchListActions';

class WatchGroupSelect extends Component {
  componentDidMount() {
    $(this.dropdown).dropdown({
      constrainWidth: false,
      belowOrigin: true
    });
  }

  handleDropdown() {
    $(this.dropdown).dropdown('open');
  }

  handleGroupSelect(list) {
    this.props.replaceList(list);

    $(this.dropdown).dropdown('close');
  }

  render() {
    const {
      watchgroups,
      className
    } = this.props;

    return (
      <div className={`${className || ''} watchgroup-select-container`}>
        <a className="btn btn-flat" ref={(a) => {this.dropdown = a;}}
          onClick={this.handleDropdown.bind(this)}
          data-activates="load-list">Load List</a>
        <ul name="load-list" id="load-list" className="dropdown-content">
          {watchgroups.map((group) => {
            return (
              <li key={group.id}><a onClick={this.handleGroupSelect.bind(this, group.nodes)}>{group.name}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    watchgroups: state.watchgroups
  };
}

const mapDispatchToProps = dispatch => {
  return {
    replaceList: (list) => dispatch(replaceList(list))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchGroupSelect);
