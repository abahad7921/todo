import { createStore } from "vuex";

const store = createStore({
    state(){
        return {
            todos: [{name:"Complete Vue Js course", completionDate: "01/07/2023", description: "vbcwvivervubefvuipubverfivyupbfvuiyb"}]
        }
    },
    mutations: {
        addTodo(state,payload){
            state.todos.push(payload)
        }
    },
    actions: {
        addTodoMutation(context,payload){
            console.log("inside the addtodo mutation")
            context.commit('addTodo',payload)
        }
    }
})

export default store