import {
  UPDATE_SETTING
} from '../actions/settingsActions';


const settings = (state = {
}, action) => {

    switch (action.type) {
      case UPDATE_SETTING:
        return Object.assign({}, state, action.setting);

      default:
        return state;
    }

}

export default settings;
