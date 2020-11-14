import { ADD_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, START_TODO, STOP_TODO } from "../types";

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { ...action.payload, id: new Date().getTime() }]

        case TOGGLE_TODO: {
            const { id, isChecked } = action.payload
            const todoIndex = state.findIndex(obj => obj.id === id)
            const newState = [...state]
            newState[todoIndex].isChecked = isChecked
            return newState
        }

        case EDIT_TODO: {
            const { id, title, detail } = action.payload
            const todoIndex = state.findIndex(obj => obj.id === id)
            const newState = [...state]
            newState[todoIndex].title = title
            newState[todoIndex].detail = detail
            return newState
        }

        case DELETE_TODO: {
            const newState = state.filter(({ id }) => id !== action.payload)
            return newState
        }

        case START_TODO: {
            // Change state of selected todo to running
            const id = action.payload
            const todoIndex = state.findIndex(obj => obj.id === id)
            const newState = [...state]
            newState[todoIndex].isRunning = true
            return newState
        }

        case STOP_TODO: {
            // Turn all running todos to off
            const copiedState = [...state]
            const newState = copiedState.map((todo) => {
                todo.isRunning = false
                return todo
            })
            return newState
        }

        default:
            return state;
    }
}