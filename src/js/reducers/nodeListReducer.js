import _ from 'lodash';

import {
  REQUEST_NODELIST,
  RECEIVE_NODELIST,
  FILTER_NODELIST
} from '../actions/nodeListActions';

function nodes(state = {
  isFetching: false,
  nodes: [],
  filterBy: 'all'
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

    case FILTER_NODELIST:
      return Object.assign({}, state, {
        filterBy: action.filterBy
      });

    default:
      return state;
  }
}


export default nodes;
