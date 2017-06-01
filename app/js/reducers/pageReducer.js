import {TOGGLE_MODAL} from '../actions/pageActions';

const page = (state = {
  modal: false
}, action) => {

    switch (action.type) {
      case TOGGLE_MODAL:
        return Object.assign({}, state, {
          modal: !state.modal
        });

      default:
        return state;
    }

}

export default page;
