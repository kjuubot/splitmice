import { RECEIVE_FRIEND, RECEIVE_ALL_FRIENDS, RECEIVE_SEARCHED_FRIENDS, RECEIVE_SEARCHED_USERS, CLEAR_SEARCH, RECEIVE_ERRORS } from '../actions/friendship_actions';
import merge from 'lodash/merge';

const initialState = {
    users: {},
};

const friendshipsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    let keys;
    let tempState;
    let finalState;

    switch(action.type) {
        case RECEIVE_FRIEND:
            nextState.users[action.friend.id] = action.friend;
            return nextState;
        case RECEIVE_ALL_FRIENDS:
            let currState = {};
            keys = Object.keys(action.friends);

            keys.forEach((key) => {
                currState[action.friends[key].id] = action.friends[key];
            });

            nextState.users = currState;

            return nextState;
        case RECEIVE_SEARCHED_FRIENDS:
            keys = Object.keys(action.friends);
            tempState = {};

            keys.forEach( (key) => {
                tempState[action.friends[key].id] = action.friends[key];
            });

            if ('userResult' in nextState) {
                nextState.userResult = tempState;
                finalState = nextState;
            } else {
                const myState = merge({}, { userResult: tempState }, nextState);
                finalState = myState;
            }
            
            return finalState;
        case RECEIVE_SEARCHED_USERS:
            keys = Object.keys(action.users);
            tempState = {};
            keys.forEach((key) => {
                tempState[action.users[key].id] = action.users[key];
            });

            if ('userResult' in nextState) {
                nextState.userResult = tempState;
                finalState = nextState;
            } else {
                const myState = merge({}, { userResult: tempState }, nextState);
                finalState = myState;
            }

            return finalState;
        case CLEAR_SEARCH:
            nextState.userResult = [];
            return nextState;
        default:
            return nextState;
    }
};

export default friendshipsReducer;