export const ADD_CUSTOM_NODE = 'ADD_CUSTOM_NODE';
export const EDIT_CUSTOM_NODE = 'EDIT_CUSTOM_NODE';
export const REMOVE_CUSTOM_NODE = 'REMOVE_CUSTOM_NODE';


export function addCustomNode(node) {
  return {
    type: ADD_CUSTOM_NODE,
    node
  }
}

export function editCustomNode(node) {
  return {
    type: EDIT_CUSTOM_NODE,
    node
  }
}

export function removeCustomNode(id) {
  return {
    type: REMOVE_CUSTOM_NODE,
    id
  }
}
