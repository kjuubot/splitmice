import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import FriendsContainer from '../friends/friends_container';
import ExpenseFormContainer from '../expenses/expense_form_container';
import SettleUpFormContainer from '../settle_up/settle_up_form_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'addFriend':
            component = <FriendsContainer />;
            break;
        case 'addExpense':
            component = <ExpenseFormContainer />;
            break;
        case 'settleUp':
            component = <SettleUpFormContainer />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);