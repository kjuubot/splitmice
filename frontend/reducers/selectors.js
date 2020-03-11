import { values } from 'lodash';

export const selectAllFriends = friends => {
    return (
        values(friends)
    );
};

export const selectAllExpenses = expenses => {
    return (
        values(expenses)
    );
};