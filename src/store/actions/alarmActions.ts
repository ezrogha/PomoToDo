import { WORK_COMPLETION_SOUND, END_BREAK_SOUND } from '../types'

export const setWorkCompletion = (sound: string) => ({
    type: WORK_COMPLETION_SOUND,
    payload: sound
})

export const setEndBreak = (sound: string) => ({
    type: END_BREAK_SOUND,
    payload: sound
})
