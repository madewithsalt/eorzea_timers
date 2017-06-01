import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find, sortBy, filter, indexOf } from 'lodash';
import {NavLink} from 'react-router-dom';
import SettingsModal from '../components/SettingsModal';
import WatchGroupSelect from '../components/WatchGroupSelect';

import {
  clearAll
} from '../actions/watchListActions';

import {
  isActive,
  getEarthTimeUntil,
  getEarthTimeRemaining
} from '../utils/timeUtils';

import WatchListItem from '../modules/WatchListItem';

class WatchList extends Component {
  constructor(props) {
    super(props);

    this.sortNodes = this.sortNodes.bind(this);
  }

  sortNodes() {
    const {
      watchlist,
      nodelist,
      clock
    } = this.props;

    if(!nodelist.nodes.length) { return []; }

    const list = filter(nodelist.nodes, (node) => {
      return indexOf(watchlist, node.id) >= 0 ? true : false;
    })

    return sortBy(list, (node) => {
        const active = isActive(clock.time, node.time, node.duration),
              timeUntil = getEarthTimeUntil(node.time, clock.time),
              timeRemaining = getEarthTimeRemaining(node.time, node.duration, clock.time);

        if(active) {
            return ((timeRemaining.hours * 60) + timeRemaining.minutes) - 1000;
        } else {
            return (timeUntil.hours * 60) + timeUntil.minutes;
        }
    });
  }

  render() {
    const {
      watchlist,
      nodelist,
      modal
    } = this.props;

    return (
      <div className="watchlist-container">
        <div className="row">
          <div className="col s9">
            <SettingsModal className="left" />
            <a href="" className="btn btn-flat left">Save List As ...</a>
            <WatchGroupSelect className="left" />
          </div>
          <div className="col s3 right-align">
            <a onClick={this.props.clearAll} className="btn btn-small btn-default">clear all</a>
          </div>
        </div>
        { watchlist.length ? (
          <div className="row">
            { this.sortNodes().map((node, i) => {
              return (
                <WatchListItem key={node.id} className="col s3" node={node} />
              )
            }) }
          </div>
        ) : (
          <div className="row">
            <div className="col s12">
              <h3>Your watch list is empty!</h3>
              <p>Add items from a saved group, or a search on the <NavLink to="/">homepage</NavLink>.</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    watchlist: state.watchlist,
    clock: state.clock
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearAll: () => dispatch(clearAll()),
    toggleModal: () => dispatch(toggleModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
