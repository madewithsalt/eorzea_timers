export const TOGGLE_SELECT = 'TOGGLE_SELECT';

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    id
  }
}
