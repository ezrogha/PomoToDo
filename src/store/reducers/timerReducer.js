import { WORK_INTERVAL, SHORT_BREAK, LONG_BREAK, LONG_BREAK_AFTER } from '../types'

const INITIAL_STATE = {
    workInterval: 25*60,
    shortBreak: 5*60,
    longBreak: 15*60,
    longBreakAfter: 4
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_INTERVAL:
            return { ...state, workInterval: action.payload }

        case SHORT_BREAK:
            return { ...state, shortBreak: action.payload }

        case LONG_BREAK:
            return { ...state, longBreak: action.payload  }

        case LONG_BREAK_AFTER:
            return { ...state, longBreakAfter: action.payload }

        default:
            return state;
    }
}