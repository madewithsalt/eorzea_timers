import uuid from 'uuid/v1';
import { findIndex, find, indexOf, extend } from 'lodash';

import {
  WATCHGROUP_ADD_ITEM,
  WATCHGROUP_REMOVE_ITEM,
  CREATE_WATCHGROUP,
  REMOVE_WATCHGROUP,
  UPDATE_WATCHGROUP
} from '../actions/watchGroupsActions';

const watchgroups = (state = [], action) => {
    const list = [...state];
    let targetGroup, existsAt, group;

    switch (action.type) {
      case CREATE_WATCHGROUP:
        if(!action.group) { return state; }

        group = Object.assign({}, action.group, {
          id: uuid()
        });

        return [...state, group];

      case UPDATE_WATCHGROUP:
        if(!action.group) { return state; }
        group = find(list, { id: action.group.id });

        extend(group, action.group);

        return list;
      case REMOVE_WATCHGROUP:
        existsAt = findIndex(list, { id: action.id });

        if(existsAt !== -1) {
          list.splice(existsAt, 1);
        }

        return list;

      case WATCHGROUP_ADD_ITEM:
        targetGroup = find(list, { id: action.groupId });

        if(indexOf(targetGroup.nodes, action.nodeId) !== -1) {
          targetGroup.nodes.push(action.nodeId);
        }

        return list;

      case WATCHGROUP_REMOVE_ITEM:
        targetGroup = find(list, { id: action.groupId });
        existsAt = indexOf(targetGroup.nodes, action.nodeId);

        if(existsAt !== -1) {
          targetGroup.nodes.splice(existsAt, 1);
        }

        return list;

      default:
        return state;
    }

}

export default watchgroups;
