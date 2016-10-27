
export const REQUEST_NODELIST = 'REQUEST_NODELIST';
export const RECEIVE_NODELIST = 'RECEIVE_NODELIST';
export const FILTER_NODELIST = 'FILTER_NODELIST';
export const SEARCH_NODELIST = 'SEARCH_NODELIST';

export function requestNodeList(nodes) {
  return {
    type: REQUEST_NODELIST,
    nodes
  }
}

export function recieveNodeList(nodes) {
  return {
    type: RECEIVE_NODELIST,
    nodes,
    recievedAt: Date.now()
  }
}

export function filterNodeList(filterBy) {
  return {
    type: FILTER_NODELIST,
    filterBy
  }
}

export function searchNodeList(searchQuery) {
  return {
    type: SEARCH_NODELIST,
    searchQuery
  }
}
