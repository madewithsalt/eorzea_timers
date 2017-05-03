export const SEARCH_QUERY = 'SEARCH_QUERY';

export function search(query) {
  return {
    type: SEARCH_QUERY,
    query
  }
}
