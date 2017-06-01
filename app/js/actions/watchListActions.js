export const TOGGLE_SELECT = 'TOGGLE_SELECT';
export const CLEAR_ALL = 'CLEAR_ALL';

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    id
  }
}

export function clearAll() {
  return {
    type: CLEAR_ALL
  }
}
