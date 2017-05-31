import { isArray, filter } from 'lodash';

export function parsePosition(pos) {
  if(isArray(pos)) {
    return pos.join(', ').replace(/\:/g, ' ');
  } else if(pos) {
    return pos.replace(/\:/g, ' ');
  }
}

export function parseTimes(times) {
  if(isArray(times)) {
    return times;

  } else {
    var list = times.split(',');

    return filter(list, (time) => {
      return time.length > 0;
    });
  }
}

export function parseLevel(value) {
  return parseFloat(value);
}

export function parseBooleans(value) {
  if(!value || value.length === 0 || value.toLowerCase() === 'false') {
    return false;
  } else if(value.toLowerCase() === 'true') {
    return true;
  } else {
    return value;
  }
}
