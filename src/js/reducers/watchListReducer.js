import _ from 'lodash';

import {
  TOGGLE_SELECT
} from '../actions/watchListActions';

export default function watchlist(state = [], action) {
  switch(action.type) {
    case TOGGLE_SELECT:
      let list = _.clone(state),
          id = action.id,
          existsAt = _.indexOf(list, id);

      // if exists, remove from list
      if (existsAt !== -1) {
          list.splice(existsAt, 1);

      // otherwise we add it
      } else {
        list.push(id);
      }

      return list;
    default:
      return state;
  }
}
