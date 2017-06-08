import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find, sortBy, filter, indexOf, union } from 'lodash';
import {NavLink} from 'react-router-dom';
import SettingsModal from '../components/SettingsModal';
import WatchGroupSelect from '../components/WatchGroupSelect';
import WatchGroupModal from '../components/WatchGroupModal';

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
      customlist,
      nodelist,
      clock
    } = this.props;

    const fullList = union(nodelist.nodes || [], customlist);
    if(!fullList.length) { return []; }

    const list = filter(fullList, (node) => {
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

  handleCreateWatchgroup() {
    let group = {
      name: '',
      nodes: [... this.props.watchlist]
    };


    this.props.createGroup(group);
  }

  render() {
    const {
      watchlist,
      modal
    } = this.props;

    const flex = watchlist.length >= 2;

    return (
      <div className={`watchlist-container`}>
        <div className="row">
          <div className="col s9">
            <SettingsModal className="left" />
            { watchlist.length ? (
              <WatchGroupModal className="left" />
            ): null}
            <WatchGroupSelect className="left" />
          </div>
          <div className="col s3 right-align">
            <a onClick={this.props.clearAll} className="btn btn-small btn-default">clear all</a>
          </div>
        </div>
        { watchlist.length ? (
          <div className={`row watchlist-list flex`}>
            { this.sortNodes().map((node, i) => {
              return (
                <WatchListItem key={node.id} className={`col`} node={node} />
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
    customlist: state.customlist,
    watchlist: state.watchlist.nodes,
    clock: state.clock
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearAll: () => dispatch(clearAll()),
    toggleModal: () => dispatch(toggleModal()),
    createGroup: (group) => dispatch(createGroup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
