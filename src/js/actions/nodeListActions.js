
export const REQUEST_NODELIST = 'REQUEST_NODELIST';
export const RECEIVE_NODELIST = 'RECEIVE_NODELIST'

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
