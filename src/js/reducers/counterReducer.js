
export default function(state, action) {
  if (typeof state === 'undefined') {
    return {}
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
