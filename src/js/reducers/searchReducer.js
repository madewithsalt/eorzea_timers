import search from '../utils/searchUtils';
import {
  SEARCH_QUERY
} from '../actions/searchActions';

export default function (state = '', action) {
  switch (action.type) {
    case SEARCH_QUERY:
      return action.query
    default:
      return state;
  }
}
