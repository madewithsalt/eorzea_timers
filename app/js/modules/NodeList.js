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
        'search': 'Search Results',
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
    this.collapseReset();
  }

  collapseReset() {
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

    const currSearch = _.isEmpty(this.props.search);
    const nextSearch = _.isEmpty(nextProps.search);

    if(currSearch !== nextSearch) {
      this.setState({ collapsed: false }, this.collapseReset)
    }
  }

  sortAndFilterNodes(props) {
    const {
      nodelist,
      customlist,
      search
    } = props || this.props;

    let list = _.union(nodelist.nodes || [], customlist);

    if (list.length && !_.isEmpty(search)) {
      list = searchUtil(nodelist.nodes, search);
    }

    if (!_.isEmpty(nodelist.filterByType) && nodelist.filterByType !== 'all') {
      list = _.filter(list, { type: nodelist.filterByType });
    }

    if(nodelist.filterByLevel) {
      if(_.isArray(nodelist.filterByLevel)) {
        let levelRange = nodelist.filterByLevel;
        list = _.filter(list, (item) => {
          return item.level >= levelRange[0] && item.level <= levelRange[1];
        });
      } else {
        list = _.filter(list, { level: nodelist.filterByLevel })
      }
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

    let sortedGroups;
    if(_.isEmpty(search)) {
      sortedGroups = this.groupListByTime(list);
    } else {
      sortedGroups = {
        'search': list
      }
    }

    this.setState({'list': list, sortedGroups});
  }

  shouldExpand(activePanels, groupName) {
    return activePanels.indexOf(groupName) >= 0 ? 'active' : '';
  }

  renderListGroup(groupName, index) {
    const { sortedGroups, groups, activePanels } = this.state;
    const count = sortedGroups[groupName].length;

    const isOpen = groupName === 'search';

    return (
      <li className={`${groupName}-list`} key={groupName}>
        <div id={groupName} className={`collapsible-header`}>
          { groups[groupName] }
          <span className={`badge list-item-count ${ count > 0 ? 'active' : ''}`}>
            { sortedGroups[groupName].length }
          </span>
        </div>
        <div className="collapsible-body">
          <div className={`node-list-group row`}>
            { sortedGroups[groupName].map((node) => {
                return (<NodeListItem node={node} key={node.id} className="col s12" />)
              }) }
          </div>
        </div>
      </li>
    )
  }

  render() {
    const { nodelist, search } = this.props;
    const { sortedGroups, groups, activePanels, list } = this.state;
    const { shouldExpand, renderListGroup } = this;

    const groupKeys = Object.keys(sortedGroups);

    return (
      <div className="node-list">
        <h4 className="list-header">
          <span className="total">{list.length} items</span>
        </h4>
        <h6 className="list-subheader">
          { groupKeys.length > 1 ? groupKeys.map((group) => {
            return (
              <span className="group-total" key={group}>
                {`${groups[group]}: `}
                {`${sortedGroups[group].length}`}
              </span>
            )
          }) : null }
        </h6>
        <ul className="collapsible popout" ref={(list) => {
          this.collapseList = list;
        }}>
            { groupKeys.map((group, i) => {
                return renderListGroup(group, i)
            })}
        </ul>
      </div>

    );
  }
};

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    customlist: state.customlist,
    search: state.search,
    clock: state.clock
  };
}

export default connect(mapStateToProps)(NodeList);
