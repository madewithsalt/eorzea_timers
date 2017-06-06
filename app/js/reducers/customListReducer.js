import uuid from 'uuid/v1';

import {
  ADD_CUSTOM_NODE,
  REMOVE_CUSTOM_NODE
} from '../actions/customListActions';

const customlist = (state = [], action) => {
  switch (action.type) {
    case ADD_CUSTOM_NODE:
      let node = Object.assign({}, action.node, {
        id: uuid()
      });

      return [...state, node];

    case REMOVE_CUSTOM_NODE:
      let list = _.clone(state),
          id = action.id,
          existsAt = _.indexOf(list, id);

      // if exists, remove from list
      if (existsAt !== -1) {
        list.splice(existsAt, 1);
      }

      return list;
      
    default:
      return state;
  }
}

export default customlist;
