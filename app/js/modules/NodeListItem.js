import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Node from './Node';

import {
  isActive,
  getTimeDifference,
  getEarthDurationfromEorzean,
  getDurationStringFromObject,
  getEarthTimeRemaining
} from '../utils/timeUtils';
import {
  toggleSelect
} from '../actions/watchListActions';
import Stars from '../components/NodeStars';
import { parsePosition } from '../utils/parseUtils';

class NodeListItem extends Component {

  render() {
    const { node, clock, watchlist, toggleSelect, className } = this.props;
    const active = isActive(clock.time, node.time, node.duration);

    var position = parsePosition(node.pos),
        slot = node.slot || '?',
        earthTimeRemaining,
        selected = _.indexOf(watchlist, node.id) !== -1;

    if(active) {
      earthTimeRemaining = getEarthTimeRemaining(node.time, node.duration, this.props.clock.time);
    }

    return (
      <div className={className}>
        <div className={`node node-list-item clearfix ${selected ? 'selected' : ''}`} onClick={toggleSelect.bind(this, node.id)}>
          <div className="left node-list-title">
            <span className={`icon icon-${node.type} icon-sm`}></span>
            <span>
              { `${node.time} [${node.level}] ${node.name}` }
              <Stars stars={node.stars} />
              { `[ slot ${slot} ]` }
            </span>
            <span className="diff">
              { active ? `${earthTimeRemaining.minutes}m ${earthTimeRemaining.seconds}s` : '' }
            </span>
          </div>
          <div className="right right-align node-list-details">
            <span className="small location">{ node.location }</span>
            <span className="small coords">{ position }</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clock: state.clock,
    watchlist: state.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSelect: (id) => dispatch(toggleSelect(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeListItem);
