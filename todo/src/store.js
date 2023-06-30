import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            todos: [{ name: "Complete Vue Js course", completionDate: "01/07/2023", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }]
        }
    },
    mutations: {
        addTodo(state, payload) {
            state.todos.push(payload)
        }
    },
    actions: {
        addTodoMutation(context, payload) {
            console.log("inside the addtodo mutation")
            context.commit('addTodo', payload)
        }
    }
})

export default store