export const addZero = (value) => {
    const valueString = value.toString()
    return valueString.length < 2 ? `0${valueString}` : valueString
}

export const getTime = (time) => {
    const minutes = Math.floor(time/60)
    const seconds = time % 60
    return `${addZero(minutes)}:${addZero(seconds)}`
}
