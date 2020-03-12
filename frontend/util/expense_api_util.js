export const createExpense = expenses => {
    console.log(expenses);
    return $.ajax({
        url: '/api/expenses',
        method: 'POST',
        data: {
            expenses,
            recipients: expenses.recipients
        }
    });
};

export const fetchExpenses = () => {
    return $.ajax({
        url: '/api/expenses/getExpenses',
        method: 'GET'
    });
};

export const settleUpExpense = expenses => {
    return $.ajax({
        url: '/api/expenses',
        method: 'PUT',
        data: { expenses }
    });
};