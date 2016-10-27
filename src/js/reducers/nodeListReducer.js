import _ from 'lodash';
import {
  REQUEST_NODELIST,
  RECEIVE_NODELIST,
  FILTER_NODELIST,
  SEARCH_NODELIST
} from '../actions/nodeListActions';

function nodes(state = {
  isFetching: false,
  nodes: [],
  searchQuery: ''
}, action) {
  switch(action.type) {
    case REQUEST_NODELIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_NODELIST:
      var nodes = [];

      _.each(action.nodes, function(list, key) {
        var id = 1;

        nodes.push(_.map(list, function(item) {
          return Object.assign({}, item, {
            type: key,
            id: key + item.name.replace(/^\\s+$/g, '-').toLowerCase() + '-' + id++
          });
        }))
      });

      return Object.assign({}, state, {
        isFetching: false,
        nodes: _.flatten(nodes),
        lastUpdated: action.recievedAt
      });
    default:
      return state;
  }
}


export default nodes;
