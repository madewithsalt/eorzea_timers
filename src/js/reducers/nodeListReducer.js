import {
  REQUEST_NODELIST,
  RECEIVE_NODELIST
} from '../actions/nodeListActions';

function nodes(state = {
  isFetching: false,
  nodes: {}
}, action) {
  switch(action.type) {
    case 'REQUEST_NODELIST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_NODELIST':
      const { botany, mining, fishing } = action.nodes;

      return Object.assign({}, state, {
        isFetching: false,
        botany,
        mining,
        fishing,
        lastUpdated: action.recievedAt
      })
    default:
      return state;
  }
}


export default nodes;
