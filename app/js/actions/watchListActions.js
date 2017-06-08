import { indexOf, find, each } from 'lodash';
import {
  getTimeObjFromString
} from '../utils/timeUtils';

export const ADD_WATCHLIST = 'ADD_WATCHLIST';
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';
export const UPDATE_TIMES = 'UPDATE_TIMES';
export const CLEAR_ALL = 'CLEAR_ALL';

function addToList(id) {
  return {
    type: ADD_WATCHLIST,
    id
  }
}

function removeFromList(id) {
  return {
    type: REMOVE_WATCHLIST,
    id
  }
}

function updateNotifications() {

  return function(dispatch, getState) {
    const {
      watchlist,
      nodelist,
      customlist
    } = getState();

    const times = watchlist.nodes.map((id) => {
      const node = find([...nodelist.nodes, ...customlist], {id});
      const timeObj = getTimeObjFromString(node.time);

      return Object.assign({}, timeObj, { time: node.time });
    });

    dispatch({
      type: UPDATE_TIMES,
      times
    });
  }
}


export function toggleSelect(id) {

  return function(dispatch, getState) {
    const { watchlist } = getState(),
          existsAt = indexOf(watchlist.nodes, id);

    if(existsAt >= 0) {
      dispatch(removeFromList(id))
    } else {
      dispatch(addToList(id))
    }

    dispatch(updateNotifications());
  }
}

export function clearAll() {
  return {
    type: CLEAR_ALL
  }
}

export function replaceList(list) {
  return function(dispatch) {
    dispatch(clearAll());

    each(list, (id) => {
      dispatch(toggleSelect(id))
    });
  }
}
