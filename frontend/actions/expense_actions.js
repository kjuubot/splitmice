import * as APIUtil from '../util/expense_api_util';

export const RECEIVE_EXPENSES = "RECEIVE_EXPENSES";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveExpenses = expenses => ({
    type: RECEIVE_EXPENSES,
    expenses
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const createExpense = expense => dispatch => (
    APIUtil.createExpense(expense).then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const getExpenses = () => dispatch => (
    APIUtil.fetchExpenses().then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const settleUpExpense = expense => dispatch => (
    APIUtil.settleUpExpense(expense).then(expenses => (
        dispatch(receiveExpenses(expenses))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);