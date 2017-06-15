import { isArray, filter, isString, trim } from 'lodash';

export function parsePosition(pos) {
  if(isArray(pos)) {
    return pos.join(', ').replace(/\:/g, ' ');
  } else if(pos) {
    return pos.replace(/\:/g, ' ');
  }
}

export function parseAttrs(attr) {
  if(isString(attr)) {
    return filter(attr.split(','), (a) => {
      return a.length > 0;
    })
  }
}

export function parseTimes(times) {
  if(isArray(times)) {
    return times;

  } else {
    var list = times.split(',').map((time) => trim(time));

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
