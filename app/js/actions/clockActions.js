import { each, filter, find } from 'lodash';

export const INCREMENT_CLOCK = 'INCREMENT_CLOCK';
export const DISPATCH_NOTIFICATION = 'DISPATCH_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const UPDATE_LAST_ALARM = 'UPDATE_LAST_ALARM';

export function updateClock() {
  return  {
    type: INCREMENT_CLOCK
  }
}

export function dispatchNotification(list) {
  return {
    type: DISPATCH_NOTIFICATION,
    list
  }
}

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION
  }
}

export function updateLastAlarm(hour) {
  return {
    type: UPDATE_LAST_ALARM,
    hour
  }
}

export function changeTime() {
  return function(dispatch, getState) {
    const {
      watchlist,
      nodelist,
      customlist,
      settings,
      clock
    } = getState();

    const lastAlarm = clock.lastAlarm,
          advanceHourNotice = settings.alarm_hour || 0;

    if(watchlist.times.length) {
      const nodes = watchlist.nodes.map((id) => {
              return find([...nodelist.nodes, ...customlist], { id });
            });

      each(watchlist.times, (time) => {
        const alertTime = time.hour - advanceHourNotice;

        if(clock.hour === alertTime && clock.lastAlarm !== clock.hour) {
          const activeNodes = filter(nodes, { time: time.time });

          dispatch(dispatchNotification(activeNodes));
          dispatch(updateLastAlarm(clock.hour));
        }
      });
    }

    dispatch(updateClock());
  }
}
