
export const REQUEST_NODELIST = 'REQUEST_NODELIST';
export const RECEIVE_NODELIST = 'RECEIVE_NODELIST';
export const FILTER_TYPE_NODELIST = 'FILTER_TYPE_NODELIST';
export const FILTER_LEVEL_NODELIST = 'FILTER_LEVEL_NODELIST';
export const FILTER_FEATURE_TOGGLE_NODELIST = 'FILTER_FEATURE_TOGGLE_NODELIST';

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

export function filterTypeNodeList(filterByType) {
  return {
    type: FILTER_TYPE_NODELIST,
    filterByType
  }
}

export function filterLevelNodeList(filterByLevel) {
  return {
    type: FILTER_LEVEL_NODELIST,
    filterByLevel
  }
}

export function toggleFeatureFilter(feature) {
  return {
    type: FILTER_FEATURE_TOGGLE_NODELIST,
    feature
  }
}
