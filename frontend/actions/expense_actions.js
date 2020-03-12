import * as APIUtil from '../util/expense_api_util';

export const RECEIVE_EXPENSES = "RECEIVE_EXPENSES";
export const RECEIVE_EXPENSE_ERRORS = "RECEIVE_EXPENSE_ERRORS";

export const receiveExpenses = expenses => ({
    type: RECEIVE_EXPENSES,
    expenses
});

export const receiveExpenseErrors = errors => ({
    type: RECEIVE_EXPENSE_ERRORS,
    errors
});

export const createExpense = expense => dispatch => (
    APIUtil.createExpense(expense).then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveExpenseErrors(err.responseJSON))
    ))
);

export const getExpenses = () => dispatch => (
    APIUtil.fetchExpenses().then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveExpenseErrors(err.responseJSON))
    ))
);

export const settleUpExpense = expense => dispatch => (
    APIUtil.settleUpExpense(expense).then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveExpenseErrors(err.responseJSON))
    ))
);