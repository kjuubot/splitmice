import { RECEIVE_EXPENSES } from '../actions/expense_actions';

const initialState = {
    expenseList: { "you_owe": {}, "you_are_owed": {} },
};

const expenseReducer = (state = initialState, action) => {
    let nextState = Object.assign({}, state);
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_EXPENSES:
            nextState.expenseList = action.expenses;
            return nextState;
        default:
            return nextState;
    }
};

export default expenseReducer;