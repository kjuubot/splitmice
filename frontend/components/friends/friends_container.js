import Friends from './friends';
import { getFriends, addFriend, searchFriends, searchUsers, clearSearch } from '../../actions/friendship_actions';
import { selectAllFriends } from '../../reducers/selectors';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        friends: selectAllFriends(state.friends.users),
        search: selectAllFriends(state.friends.userResult),
        errors: state.friends.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processFriendForm: user => dispatch(addFriend(user)),
        getFriends: () => dispatch(getFriends()),
        searchFriends: query => dispatch(searchFriends(query)),
        clearSearch: () => dispatch(clearSearch()),
        searchUsers: query => dispatch(searchUsers(query)),
        openModal: () => dispatch(openModal('addFriend')),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);