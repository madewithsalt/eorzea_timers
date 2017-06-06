import _ from 'lodash';

import {
  ADD_WATCHLIST,
  REMOVE_WATCHLIST,
  UPDATE_TIMES,
  CLEAR_ALL
} from '../actions/watchListActions';

export default function watchlist(state = {nodes: [], times: []}, action) {
  let list = _.clone(state.nodes),
      id = action.id,
      existsAt = _.indexOf(list, id);

  switch(action.type) {
    case ADD_WATCHLIST:
      if (existsAt === -1) {
        list.push(id);
      }
      return Object.assign({}, state, { nodes: list });

    case REMOVE_WATCHLIST:
      if (existsAt !== -1) {
          list.splice(existsAt, 1);
      }
      return Object.assign({}, state, { nodes: list });

    case UPDATE_TIMES:
      return Object.assign({}, state, { times: action.times })

    case CLEAR_ALL:
    return Object.assign({}, state, { nodes: [] })

    default:
      return state;
  }
}
