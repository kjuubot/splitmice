import { RECEIVE_EXPENSES, RECEIVE_EXPENSE_ERRORS } from '../actions/expense_actions';

export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_EXPENSE_ERRORS:
            return action.errors;
        case RECEIVE_EXPENSES:
            return [];
        default:
            return state;
    }
};