import { WORK_COMPLETION_SOUND, END_BREAK_SOUND } from '../types'

const INITIAL_STATE = { work_completion_sound: "Analog", end_break_sound: "Bomb Siren" }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_COMPLETION_SOUND:
            return { ...state, work_completion_sound: action.payload }

        case END_BREAK_SOUND:
            return { ...state, end_break_sound: action.payload }

        default:
            return state;
    }
}
