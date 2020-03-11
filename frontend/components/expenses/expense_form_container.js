import { connect } from 'react-redux';
import ExpenseForm from './expense_form';
import { selectAllFriends } from '../../reducers/selectors';
import { createExpense } from '../../actions/expense_actions';
import { searchFriends, clearSearch } from '../../actions/friendship_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
    return {
        search: selectAllFriends(state.friends.userResult),
        friends: state.friends.users,
        errors: state.friends.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processExpenseForm: expense => dispatch(createExpense(expense)),
        searchFriends: query => dispatch(searchFriends(query)),
        clearSearch: () => dispatch(clearSearch()),
        openModal: () => dispatch(openModal('addExpense')),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);