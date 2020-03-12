import AddFriendsForm from './add_friends_form';
import { getFriends, addFriend, searchFriends, searchUsers, clearSearch } from '../../actions/friendship_actions';
import { selectAllFriends } from '../../reducers/selectors';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        friends: selectAllFriends(state.friends.users),
        search: selectAllFriends(state.friends.userResult),
        errors: state.errors.friendship
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processFriendForm: user => dispatch(addFriend(user)),
        getFriends: () => dispatch(getFriends()),
        searchFriends: query => dispatch(searchFriends(query)),
        searchUsers: query => dispatch(searchUsers(query)),
        clearSearch: () => dispatch(clearSearch()),
        openModal: () => dispatch(openModal('addFriend')),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsForm);