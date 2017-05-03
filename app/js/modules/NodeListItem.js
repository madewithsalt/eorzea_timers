import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  isActive,
  getTimeDifference ,
  getEarthDurationfromEorzean,
  getDurationStringFromObject,
  getEarthTimeRemaining
} from '../utils/timeUtils';
import {
  toggleSelect
} from '../actions/watchListActions';
import Stars from '../components/NodeStars';

class NodeListItem extends Component {

  render() {
    const { node, clock, watchlist, toggleSelect } = this.props;
    const { stars } = this;
    const active = isActive(clock.time, node.time, node.duration);

    var position = '',
        slot = node.slot || '?',
        timeRemaining,
        earthTimeRemaining,
        selected = _.indexOf(watchlist, node.id) !== -1;

    if(_.isArray(node.pos)) {
      position = node.pos.join(', ').replace(/\:/g, ' ');
    } else if(node.pos) {
      position = node.pos.replace(/\:/g, ' ');
    }

    if(active) {
      earthTimeRemaining = getEarthTimeRemaining(node.time, node.duration, this.props.clock.time);
    }

    return (
      <div className="col-xs-12">
        <div className={`node node-list-item clearfix ${selected ? 'selected' : ''}`} onClick={toggleSelect.bind(this, node.id)}>
          <div className="pull-left node-list-title">
            <span className={`icon icon-${node.type} icon-sm`}></span>
            <span>
              { `${node.time} ${node.name}` }
              <Stars stars={node.stars} />
              { `[ slot ${slot} ]` }
            </span>
            <span className="diff">
              { active ? `${earthTimeRemaining.minutes}m ${earthTimeRemaining.seconds}s` : '' }
            </span>
          </div>
          <div className="pull-right text-right node-list-details">
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
    toggleSelect: (id) => {
      dispatch(toggleSelect(id));
      //dispatch(updateStorage({watchlist: this.props.watchlist}));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeListItem);
