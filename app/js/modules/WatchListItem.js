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

    var position = parsePosition(node.pos),
        slot = node.slot || '?',
        timeRemaining,
        time,
        selected = indexOf(watchlist, node.id) !== -1;

    if(active) {
      time = getEarthTimeRemaining(node.time, node.duration, clock.time);
    } else {
      time = getEarthTimeUntil(node.time, clock.time);
    }

    return (
      <div className={className}>
        <div className={`node watch-list-item clearfix ${active ? 'active' : ''}`} onClick={toggleSelect.bind(this, node.id)}>
          <div className="node-content">

            <div className="node-list-title">
              <span className={`icon icon-${node.type} icon-sm`}></span>
              <span>
                { node.time }
              </span>
            </div>
            <div>
              {`[${node.level}] ${node.name}`}
                <Stars stars={node.stars} />
                { `[ slot ${slot} ]` }
            </div>
            <div className="time-remaining">
              <span className="diff">
                { `${time.minutes}m ${time.seconds}s` }
              </span>
            </div>
            <div className="node-list-details">
              <span className="small location">{ node.location }</span>
              <span className="small coords">{ position }</span>
            </div>
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
