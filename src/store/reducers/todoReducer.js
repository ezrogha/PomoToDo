import { ADD_TODO, TOGGLE_TODO } from "../types";

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { ...action.payload, id: state.length }]

        case TOGGLE_TODO:
            const { id, isChecked } = action.payload
            const todoIndex = state.findIndex(obj => obj.id === id)
            const newState = [...state]
            newState[todoIndex].isChecked = isChecked
            return newState

        default:
            return state;
    }
}