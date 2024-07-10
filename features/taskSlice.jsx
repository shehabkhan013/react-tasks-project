import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    tasks: []
}
const saveTasks = JSON.parse(localStorage.getItem('tasks'))
if (saveTasks) {
    initialState.tasks = saveTasks
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        editTask: (state, action) => {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    }
})


export const { addTask,editTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer