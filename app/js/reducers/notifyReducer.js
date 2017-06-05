import {
  NODE_ACTIVE
} from '../actions/notifyActions';

const notifications = (state = {
  active: []
}, action) => {

    switch (action.type) {
      default:
        return state;
    }

}
export default notifications;
