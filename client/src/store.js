import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            incompleteTasks: [],
            completedTasks: []
        }
    },
    getters: {
        incompleteTasks(state) {
            return state.incompleteTasks
        },
        completedTasks(state) {
            return state.completedTasks
        }
    },
    mutations: {
        setIncompleteTasks(state, payload) {
            state.incompleteTasks = payload
        },
        setCompleteTasks(state, payload) {
            state.completedTasks = payload
        },
        addTodo(state, payload) {
            state.todos.push(payload)
        },
        completeTodo(state, payload) {
            //change the date of completion
            const today = new Date();
            const dateString = today.toISOString().slice(0, 10);
            state.incompleteTasks[payload.index].completionDate = dateString.split('-').reverse().join('-')
            state.completedTasks.push(state.incompleteTasks[payload.index])
            this.commit('deleteTodo', { index: payload.index })
        },
        deleteTodo(state, payload) {
            state.incompleteTasks.splice(payload.index, 1)
        }
    },
    actions: {
        addTodoMutation(context, payload) {
            context.commit('addTodo', payload)
        },
        deleteTodoMutation(context, payload) {
            context.commit('deleteTodo', payload)
        },
        completeTaskMutation(context, payload) {
            context.commit('completeTodo', payload)
        }
    }
})

export default store