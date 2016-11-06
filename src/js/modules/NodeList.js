import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import NodeListItem from './NodeListItem';
import {
  isActive,
  getTimeDifference,
  getEarthDurationfromEorzean,
  getDurationStringFromObject,
  getEarthTimeRemaining
} from '../utils/timeUtils';
import searchUtil from '../utils/searchUtils';


class NodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sortedGroups: {}
    }
  }

  groupListByTime(list = []) {
    var time = this.props.clock.time,
        active = [],
        one_hour = [],
        two_hour = [],
        the_rest = [];

    _.each(list, function(node) {
      if(isActive(time, node.time, node.duration)) {
        return active.push(node);
      }

      let timeUntil = getTimeDifference(time, node.time),
          hours = timeUntil.hours,
          minutes = timeUntil.minutes;

      if(hours === 0 && minutes > 0) {
        return one_hour.push(node);
      }

      if(hours === 1 && minutes > 0) {
        return two_hour.push(node);
      }

      return the_rest.push(node);

    });

    return {
      active: active.sort((a, b) => {
        let aDur = getEarthTimeRemaining(a.time, a.duration, this.props.clock.time),
            bDur = getEarthTimeRemaining(b.time, b.duration, this.props.clock.time);

        var aTime = (aDur.hours * 60) + (aDur.minutes * 60) + aDur.seconds,
            bTime = (bDur.hours * 60) + (bDur.minutes * 60) + bDur.seconds;

        if (aTime < bTime) {
          return -1;
        }

        if (aTime > bTime) {
          return 1;
        }

        // a must be equal to b
        return 0;
      }),
      one_hour,
      two_hour,
      the_rest
    }
  }

  componentWillReceiveProps(nextProps) {
    const { nodelist, search } = nextProps;
    let list = nodelist.nodes || [];

    if(nodelist.nodes && nodelist.nodes.length && !_.isEmpty(search)) {
      list = searchUtil(nodelist.nodes, search);
    } else {
      list = nodelist.nodes || [];
    }

    if(!_.isEmpty(nodelist.filterByType) && nodelist.filterByType !== 'all') {
      list = _.filter(list, { type: nodelist.filterByType });
    }

    if(!_.isEmpty(nodelist.featureFilters)) {
      list = _.filter(list, function(item) {
        let keep = false;

        _.each(nodelist.featureFilters, function(filter) {
          let value = item[filter];

          // there are a number of values that can be
          // stored in filterFeature keys.
          // we want to show the node if the filter key
          // is non-empty or an explicit boolean of true.
          if(!_.isUndefined(value)) {

            // scrip keys can be an empty string or a min value
            if(_.isString(value) && !_.isEmpty(value) || _.isNumber(value)) {
              keep = true;
            }
            // only explicitly pass true if the filter is true.
            // this way if another filter is true we don't accidently
            // set it to false incorrectly.
            if(_.isBoolean(value) && value === true) {
              keep = true;
            // or fall back to a nonempty value as true
            } else if(!_.isEmpty(value)) {
              keep = true;
            }
          }
        });

        // if the key is undefined, we will default to false (don't show)
        return keep;
      });
    }

    const sortedGroups = this.groupListByTime(list);

    this.setState({
      'list': list,
      sortedGroups
    });
  }

  render() {
    const { nodelist, search } = this.props;
    const { sortedGroups } = this.state;
    const groups = [
      'active',
      'one_hour',
      'two_hour',
      'the_rest'
    ];

    return(
      <div className="node-list">
          <div className="col-md-12">
              <h2>Active Nodes</h2>
              <div className="row">
                <div className="node-list-group active">
                  { sortedGroups['active'] ? sortedGroups['active'].map((node) => {
                    return (
                      <NodeListItem node={node} key={node.id} />
                    )
                  }) : '' }
                </div>
              </div>
          </div>
          <div className="col-md-12">
            <h3>Next Up</h3>
            <div className="row">
              <div className="node-list-group one_hour">
                  { sortedGroups['one_hour'] ? sortedGroups['one_hour'].map((node) => {
                    return (
                      <NodeListItem node={node} key={node.id} />
                    )
                  }) : '' }
              </div>
            </div>
          </div>
          <div className="col-md-12">
              <h3>In Two Hours</h3>
              <div className="row">
                <div className="node-list-group two_hour">
                    { sortedGroups['two_hour'] ? sortedGroups['two_hour'].map((node) => {
                      return (
                        <NodeListItem node={node} key={node.id} />
                      )
                    }) : '' }
                </div>
              </div>
              <h3>After That</h3>
              <div className="row">
                <div className="node-list-group the_rest">
                    { sortedGroups['the_rest'] ? sortedGroups['the_rest'].map((node) => {
                      return (
                        <NodeListItem node={node} key={node.id} />
                      )
                    }) : '' }
                </div>
              </div>
          </div>
      </div>

    );
  }
};

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    search: state.search,
    clock: state.clock
  };
}

export default connect(mapStateToProps)(NodeList);
