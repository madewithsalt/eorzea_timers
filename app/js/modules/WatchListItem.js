import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { indexOf } from 'lodash';
import {
  isActive,
  getTimeDifference,
  getEarthDurationfromEorzean,
  getDurationStringFromObject,
  getEarthTimeRemaining,
  getEarthTimeUntil,
  getTimeUntil
} from '../utils/timeUtils';

import {
  toggleSelect
} from '../actions/watchListActions';

import Stars from '../components/NodeStars';
import { parsePosition } from '../utils/parseUtils';

class WatchListItem extends Component {

  render() {
    const { node, clock, watchlist, toggleSelect, className } = this.props;
    const { stars } = this;
    const active = isActive(clock.time, node.time, node.duration);

    var slot = node.slot || '?',
        timeRemaining,
        time,
        status = '',
        selected = indexOf(watchlist, node.id) !== -1;

    if(active) {
      time = getEarthTimeRemaining(node.time, node.duration, clock.time);

      let mins = time.minutes;

      switch (true) {
        case mins <= 2 && mins > 1:
          status = 'warning';
          break;
        case mins <= 1:
          status = 'danger';
          break;
        default:
          status = 'active';
      }

    } else {
      time = getEarthTimeUntil(node.time, clock.time);
    }

    return (
      <div className={`${className}`}>
        <div className={`node watchlist-item clearfix ${active ? 'active' : ''} ${status}`} >
          <div className="node-content">
            <div className="node-list-title">
              <span className={`icon icon-${node.type} icon-sm`}></span>
              <span>
                { node.time }
              </span>
              <div className="close" onClick={toggleSelect.bind(this, node.id)}><i className="material-icons">close</i></div>
            </div>
            <div className="node-list-name">
              <div className="name">
                {`${node.name} [${node.level}]`}
              </div>
              <div className="meta">
                <Stars stars={node.stars} />
              </div>
            </div>
            <div className="time-remaining">
              <div className="small">{active ? 'time remaining' : 'time until'}:</div>
              <div className="diff">
                { `${time.hours > 0 ? time.hours + 'h ' : ''}${time.minutes}m ${time.seconds}s` }
              </div>
            </div>
            <div className="slot">
              { `[ slot ${slot} ]` }
            </div>
            { node.type === 'fishing' && node.bait ? (
              <div className="bait">{ node.bait.join(', ') }</div>
            ) : null }
          </div>
          <div className="node-list-footer">
            <div className="small location">{ node.location }</div>
            <div className="small coords">{ node.pos }</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clock: state.clock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSelect: (id) => dispatch(toggleSelect(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListItem);
