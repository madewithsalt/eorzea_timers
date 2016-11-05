import _ from 'lodash';

import { TOGGLE_SELECT } from '../actions/watchListActions';

export default storage(state = {

}, action) => {

    switch (action.type) {
      case TOGGLE_SELECT:
        break;
      default:
        return state;
    }

}
