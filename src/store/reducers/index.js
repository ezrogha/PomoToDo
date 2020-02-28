import { combineReducers } from 'redux';

import todoReducer from './todoReducer'
import alarmReducer from './alarmReducer'
import timerReducer from './timerReducer'

export default combineReducers({
    todos: todoReducer,
    alarm: alarmReducer,
    timer: timerReducer
});
