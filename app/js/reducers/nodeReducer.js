import _ from 'lodash';

import {
  TOGGLE_SELECT
} from '../actions/nodeActions';

function node(state = {}, action) {
  switch(action.type) {
    case TOGGLE_SELECT:
      return Object.assign({}, state, {
        selected: !action.selected,
      });

    default:
      return state
  }
}

export default node
