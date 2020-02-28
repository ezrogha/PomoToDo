import { WORK_INTERVAL, SHORT_BREAK, LONG_BREAK, LONG_BREAK_AFTER } from '../types'

export const setWorkInterval = (interval) => ({
    type: WORK_INTERVAL,
    payload: interval*60
})

export const setShortBreak = (rest) => ({
    type: SHORT_BREAK,
    payload: rest*60
})

export const setLongBreak = (rest) => ({
    type: LONG_BREAK,
    payload: rest*60
})

export const setLongBreakAfter = (intervals) => ({
    type: LONG_BREAK_AFTER,
    payload: intervals
})
