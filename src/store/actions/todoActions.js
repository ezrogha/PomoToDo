import { ADD_TODO, TOGGLE_TODO } from "../types";

export const addTodo = (todo_data) => ({
    type: ADD_TODO,
    payload: todo_data
})

export const toggleTodo = (id, isChecked) => ({
    type: TOGGLE_TODO,
    payload: { id, isChecked }
})