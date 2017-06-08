import uuid from 'uuid/v1';
import _ from 'lodash';

import {
  ADD_CUSTOM_NODE,
  EDIT_CUSTOM_NODE,
  REMOVE_CUSTOM_NODE
} from '../actions/customListActions';

const customlist = (state = [], action) => {
  let list = _.clone(state),
      node, existsAt;

  switch (action.type) {
    case ADD_CUSTOM_NODE:
      node = Object.assign({}, action.node, {
        id: uuid()
      });

      return [...state, node];

    case EDIT_CUSTOM_NODE:
      existsAt = _.indexOf(state, action.node.id);
      node = _.find(list, { id: action.node.id });

      let newNode;
      if(node) {
        list.splice(existsAt, 1);
        newNode = Object.assign({}, node, action.node);
        list.push(newNode);
      }

      return list;

    case REMOVE_CUSTOM_NODE:
      existsAt = _.findIndex(list, {id: action.id});

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
