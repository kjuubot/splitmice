import { combineReducers } from 'redux';
import entities from './entities_reducer';
import session from './session_reducer';
import friends from './friendships_reducer';
import expenses from './expenses_reducer';
import ui from './ui_reducer';
import errors from './errors_reducer';

const rootReducer = combineReducers({
    entities,
    session,
    friends,
    expenses,
    ui,
    errors
});

export default rootReducer;