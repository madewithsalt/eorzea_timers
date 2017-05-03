import { TOGGLE_SELECT } from '../actions/watchListActions';

const settings = (state = {}, action) => {

    switch (action.type) {
      case TOGGLE_SELECT:
        break;
      default:
        return state;
    }

}

export default settings;
