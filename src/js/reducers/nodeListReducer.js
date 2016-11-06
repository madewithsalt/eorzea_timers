import _ from 'lodash';

import {
  REQUEST_NODELIST,
  RECEIVE_NODELIST,
  FILTER_TYPE_NODELIST,
  FILTER_FEATURE_TOGGLE_NODELIST
} from '../actions/nodeListActions';

function nodes(state = {
  isFetching: false,
  nodes: [],
  filterByType: 'all',
  featureFilters: []
}, action) {
  switch(action.type) {
    case REQUEST_NODELIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_NODELIST:
      var nodes = [],
          id = 0;

      // merge the lists of nodes to a single array,
      // and create a unique entry for each time per node.
      _.each(action.nodes, (list, key) => {

        _.each(list, function(node) {
          let times = _.isArray(node.times) ? node.times : [node.times];

          _.each(times, (time) => {
            nodes.push(Object.assign({}, node, {
                time,
                type: key,
                id: `${key}-${id++}`
              }))

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
