import * as APIUtil from '../util/friendship_api_util';

export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const RECEIVE_ALL_FRIENDS = 'RECEIVE_ALL_FRIENDS';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const RECEIVE_SEARCHED_FRIENDS = 'RECEIVE_SEARCHED_FRIENDS';
export const RECEIVE_SEARCHED_USERS = 'RECEIVE_SEARCHED_USERS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const RECEIVE_FRIENDSHIP_ERRORS = 'RECEIVE_FRIENDSHIP_ERRORS';

export const receiveFriend = friend => ({
    type: RECEIVE_FRIEND,
    friend
});

export const receiveAllFriends = friends => ({
    type: RECEIVE_ALL_FRIENDS,
    friends
});

export const receiveSearchedFriends = friends => ({
    type: RECEIVE_SEARCHED_FRIENDS,
    friends
});

export const receiveSearchedUsers = users => ({
    type: RECEIVE_SEARCHED_USERS,
    users
});

export const clearSearch = () => ({
    type: CLEAR_SEARCH
});

export const receiveFriendshipErrors = errors => ({
    type: RECEIVE_FRIENDSHIP_ERRORS,
    errors
});

export const getFriends = () => dispatch => (
    APIUtil.getFriends().then(friends => (
        dispatch(receiveAllFriends(friends))
    ))
);

export const addFriend = user => dispatch => (
    APIUtil.addFriend(user).then(friend => (
        dispatch(receiveFriend(friend))
    ), err => (
        dispatch(receiveFriendshipErrors(err.responseJSON))
    ))
);

export const searchFriends = query => dispatch => (
    APIUtil.searchFriends(query).then(friends => (
        dispatch(receiveSearchedFriends(friends))
    ))
);

export const searchUsers = query => dispatch => (
    APIUtil.searchUsers(query).then(users => (
        dispatch(receiveSearchedUsers(users))
    ))
);