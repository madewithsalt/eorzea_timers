export const WATCHGROUP_ADD_ITEM = 'WATCHGROUP_ADD_ITEM';
export const WATCHGROUP_REMOVE_ITEM = 'WATCHGROUP_REMOVE_ITEM';
export const CREATE_WATCHGROUP = 'CREATE_WATCHGROUP';
export const REMOVE_WATCHGROUP = 'REMOVE_WATCHGROUP';
export const UPDATE_WATCHGROUP = 'UPDATE_WATCHGROUP';

export function addItem(groupId, nodeId) {
  return {
    type: WATCHGROUP_ADD_ITEM,
    groupId,
    nodeId
  }
}

export function removeItem(groupId, nodeId) {
  return {
    type: WATCHGROUP_REMOVE_ITEM,
    groupId,
    nodeId
  }
}

export function createGroup(group) {
  return {
    type: CREATE_WATCHGROUP,
    group
  }
}

export function updateGroup(group) {
  return {
    type: UPDATE_WATCHGROUP,
    group
  }
}

export function removeGroup(id) {
  return {
    type: REMOVE_WATCHGROUP,
    id
  }
}
