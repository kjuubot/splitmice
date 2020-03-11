import SettleUpForm from './settle_up_form.jsx';
import { searchFriends, clearSearch } from '../../actions/friendship_actions.js';
import { settleUpExpense } from '../../actions/expense_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { selectAllFriends } from '../../reducers/selectors.js';

const mapStateToProps = state => {
    return {
        search: selectAllFriends(state.friends.userResult),
        errors: state.friends.errors,
        currentUser: state.session.currentUser,
        friends: state.friends.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        settleUpExpense: (expense) => dispatch(settleUpExpense(expense)),
        searchFriends: (query) => dispatch(searchFriends(query)),
        clearSearch: () => dispatch(clearSearch()),
        openModal: () => dispatch(openModal('settleUp')),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettleUpForm);