import { setTime } from '../utils/timeUtils';

import {
  INCREMENT_CLOCK,
  UPDATE_LAST_ALARM,
  DISPATCH_NOTIFICATION,
  CLOSE_NOTIFICATION
} from '../actions/clockActions';

const clock = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_CLOCK:
      return Object.assign({}, state, setTime());

    case UPDATE_LAST_ALARM:
      return Object.assign({}, state, { lastAlarm: action.hour });

    case DISPATCH_NOTIFICATION:
      return Object.assign({}, state, { alarm: action.list });

    case CLOSE_NOTIFICATION:
      return Object.assign({}, state, { alarm: [] });

    default:
      return state;
  }
}


export default clock;
