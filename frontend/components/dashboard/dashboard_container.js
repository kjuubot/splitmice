import Dashboard from './dashboard.jsx';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { getExpenses } from '../../actions/expense_actions';
import { selectAllExpenses } from '../../reducers/selectors';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = state => {
    return {
        currentUser: state.session.currentUser,
        expenses: state.expenses.expenseList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        getExpenses: () => dispatch(getExpenses()),
        openModal: (type) => dispatch(openModal(type))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);