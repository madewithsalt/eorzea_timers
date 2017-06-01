import _ from 'lodash';
import * as utils from '../utils/parseUtils';

import {
  REQUEST_NODELIST,
  RECEIVE_NODELIST,
  FILTER_TYPE_NODELIST,
  FILTER_LEVEL_NODELIST,
  FILTER_FEATURE_TOGGLE_NODELIST
} from '../actions/nodeListActions';

import filters from '../static/filters';

export const defaultState = {
  isFetching: false,
  nodes: [],
  filterByType: 'all',
  filterByLevel: null,
  featureFilters: [],
  filters
}

function nodes(state = defaultState, action) {
  var booleanValues = [
    'is_collectable',
    'is_legendary',
    'is_ephemeral',
    'red_scrip',
    'blue_scrip',
    'yellow_scrip'
  ];

  switch(action.type) {
    case REQUEST_NODELIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_NODELIST:
      var nodes = [];

      // merge the lists of nodes to a single array,
      // and create a unique entry for each time per node.
      _.each(action.nodes, (list, key) => {

        _.each(list, function(node) {
          let result = {},
              times = utils.parseTimes(node.times),
              pos = utils.parsePosition(node.pos),
              level = utils.parseLevel(node.level || 50);

          _.each(booleanValues, (key) => {
            result[key] = utils.parseBooleans(node[key]);
          });

          _.each(times, (time, i) => {
            nodes.push(Object.assign({}, node, {
                time,
                type: key,
                id: `${node.id}-${i}`,
                level,
                pos
              }, result))

            });
          });

        });

      return Object.assign({}, state, {
        isFetching: false,
        nodes: nodes,
        lastUpdated: action.recievedAt
      });

    case FILTER_TYPE_NODELIST:
      return Object.assign({}, state, {
        filterByType: action.filterByType
      });

    case FILTER_LEVEL_NODELIST:
      const filter = action.filterByLevel;
      let newFilter = filter;

      if(newFilter === state.filterByLevel) {
        newFilter = null;
      }

      return Object.assign({}, state, {
        filterByLevel: parseFloat(newFilter)
      });

    case FILTER_FEATURE_TOGGLE_NODELIST:
      let featureFilters = state.featureFilters,
          existsAt = _.indexOf(featureFilters, action.feature);

      if(existsAt !== -1) {
          featureFilters.splice(existsAt, 1);
      } else {
        featureFilters.push(action.feature);
      }

      return Object.assign({}, state, {
        featureFilters: featureFilters
      });

    default:
      return state;
  }
}


export default nodes;
