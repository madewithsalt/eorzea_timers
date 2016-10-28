import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  isActive,
  getTimeDifference ,
  getEarthDurationfromEorzean,
  getDurationStringFromObject
} from '../utils/timeUtils';


class NodeListItem extends Component {
  getNodeEarthTimeRemaining(node) {
    var time = this.props.clock.time,
        diff = getTimeDifference(time, node.time),
        durStr = getDurationStringFromObject(diff);

    return getEarthDurationfromEorzean(durStr);
  }

  render() {
    const { node, clock } = this.props;
    const active = isActive(clock.time, node.time, node.duration);

    var position = '',
        slot = node.slot || '?',
        timeRemaining,
        earthTimeRemaining;

    if(_.isArray(node.pos)) {
      position = node.pos.join(', ').replace(/\:/g, ' ');
    } else if(node.pos) {
      position = node.pos.replace(/\:/g, ' ');
    }

    if(active) {
      earthTimeRemaining = this.getNodeEarthTimeRemaining(node);
    }

    return (
      <div className="col-xs-12">
        <div className="node-list-item clearfix">
          <div className="pull-left node-list-title">
            <span className={`icon icon-${node.type} icon-sm`}></span>
            <span>
              { `${node.time} ${node.name} [ slot ${slot} ]` }
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
    clock: state.clock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // toggleSelect: (id) => dispatch(toggleSelect(id))
  }
};

export default connect(mapStateToProps)(NodeListItem);
