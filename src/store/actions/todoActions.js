import { ADD_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, START_TODO, STOP_TODO } from "../types";

export const addTodo = (todo_data) => ({
    type: ADD_TODO,
    payload: todo_data
})

export const toggleTodo = (id, isChecked) => ({
    type: TOGGLE_TODO,
    payload: { id, isChecked }
})

export const editTodo = (todoData) => ({
    type: EDIT_TODO,
    payload: todoData
})

export const deleteTodo = (todoId) => ({
    type: DELETE_TODO,
    payload: todoId
})

export const startTodo = (todoId) => ({
    type: START_TODO,
    payload: todoId
})

export const stopTodo = () => ({
    type: STOP_TODO
})
