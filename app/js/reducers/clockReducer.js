import { setTime } from '../utils/timeUtils';


const clock = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_CLOCK':
      return setTime();
    default:
      return state;
  }
}


export default clock;
