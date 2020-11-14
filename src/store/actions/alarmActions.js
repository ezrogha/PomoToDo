import { WORK_COMPLETION_SOUND, END_BREAK_SOUND } from '../types'

export const setWorkCompletion = (sound) => ({
    type: WORK_COMPLETION_SOUND,
    payload: sound
})

export const setEndBreak = (sound) => ({
    type: END_BREAK_SOUND,
    payload: sound
})
