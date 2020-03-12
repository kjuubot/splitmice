import { RECEIVE_FRIEND, RECEIVE_FRIENDSHIP_ERRORS } from '../actions/friendship_actions';

export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_FRIENDSHIP_ERRORS:
            return action.errors;
        case RECEIVE_FRIEND:
            return [];
        default:
            return state;
    }
};