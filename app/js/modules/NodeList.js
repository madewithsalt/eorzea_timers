import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import NodeListItem from './NodeListItem';
import {isActive, getTimeDifference, getEarthDurationfromEorzean, getDurationStringFromObject, getEarthTimeRemaining} from '../utils/timeUtils';
import searchUtil from '../utils/searchUtils';

class NodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanels: ['active'],
      list: [],
      sortedGroups: {},
      groups: {
        'active': 'Active Nodes',
        'one_hour': 'In One Hour',
        'two_hour': 'In Two Hours',
        'the_rest': 'After That'
      }
    }

    this.renderListGroup = this.renderListGroup.bind(this);
  }

  componentDidMount() {
    this.sortAndFilterNodes();
    $(this.collapseList).collapsible();
  }

  componentDidUpdate() {
    if(!this.state.collapsed) {
      $(this.collapseList).collapsible('open', 0);

      this.setState({ collapsed: true });
    }
  }

  groupListByTime(list = []) {
    var time = this.props.clock.time,
      active = [],
      one_hour = [],
      two_hour = [],
      the_rest = [];

    _.each(list, function(node) {
      if (isActive(time, node.time, node.duration)) {
        return active.push(node);
      }

      let timeUntil = getTimeDifference(time, node.time),
        hours = timeUntil.hours,
        minutes = timeUntil.minutes;

      if (hours === 0 && minutes > 0) {
        return one_hour.push(node);
      }

      if (hours === 1 && minutes > 0) {
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
    this.sortAndFilterNodes(nextProps);
  }

  sortAndFilterNodes(props) {
    const {nodelist, search} = props || this.props;
    let list = nodelist.nodes || [];

    if (nodelist.nodes && nodelist.nodes.length && !_.isEmpty(search)) {
      list = searchUtil(nodelist.nodes, search);
    } else {
      list = nodelist.nodes || [];
    }

    if (!_.isEmpty(nodelist.filterByType) && nodelist.filterByType !== 'all') {
      list = _.filter(list, {type: nodelist.filterByType});
    }

    if (!_.isEmpty(nodelist.featureFilters)) {
      list = _.filter(list, function(item) {
        let keep = false;

        _.each(nodelist.featureFilters, function(filter) {
          let value = item[filter];

          // there are a number of values that can be
          // stored in filterFeature keys.
          // we want to show the node if the filter key
          // is non-empty or an explicit boolean of true.
          if (!_.isUndefined(value)) {

            // scrip keys can be an empty string or a min value
            if (_.isString(value) && !_.isEmpty(value) || _.isNumber(value)) {
              keep = true;
            }
            // only explicitly pass true if the filter is true.
            // this way if another filter is true we don't accidently
            // set it to false incorrectly.
            if (_.isBoolean(value) && value === true) {
              keep = true;
              // or fall back to a nonempty value as true
            } else if (!_.isEmpty(value)) {
              keep = true;
            }
          }
        });

        // if the key is undefined, we will default to false (don't show)
        return keep;
      });
    }

    const sortedGroups = this.groupListByTime(list);

    this.setState({'list': list, sortedGroups});
  }

  shouldExpand(activePanels, groupName) {
    return activePanels.indexOf(groupName) >= 0 ? 'active' : '';
  }

  renderListGroup(groupName) {
    const { sortedGroups, groups, activePanels } = this.state;
    return (
      <li className={`${groupName}-list`} key={groupName}>
        <div id={groupName} className={`collapsible-header`}>
          { groups[groupName] }
          <span className="badge">
            { sortedGroups[groupName].length }
          </span>
        </div>
        <div className="collapsible-body">
          <div className={`node-list-group row`}>
            { sortedGroups[groupName].map((node) => {
                return (<NodeListItem node={node} key={node.id}/>)
              }) }
          </div>
        </div>
      </li>
    )
  }

  render() {
    const { nodelist, search } = this.props;
    const { sortedGroups, groups, activePanels } = this.state;
    const { shouldExpand, renderListGroup } = this;

    return (
      <div className="node-list">
        <ul className="collapsible popout" ref={(list) => {
          this.collapseList = list;
        }}>
            { Object.keys(sortedGroups).map((group) => {
                return renderListGroup(group, 'Active')
            })}
        </ul>
      </div>

    );
  }
};

const mapStateToProps = state => {
  return {nodelist: state.nodelist, search: state.search, clock: state.clock};
}

export default connect(mapStateToProps)(NodeList);
