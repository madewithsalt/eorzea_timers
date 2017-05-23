import { isArray } from 'lodash';

export function parsePosition(pos) {
  if(isArray(pos)) {
    return pos.join(', ').replace(/\:/g, ' ');
  } else if(pos) {
    return pos.replace(/\:/g, ' ');
  }
}
