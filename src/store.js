import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            todos: [
                {id: 1,name:"temp 1", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
                {id: 2,name:"temp 2", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
                {id: 3,name:"temp 3", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
                {id: 4,name:"temp 4", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
                {id: 5,name:"temp 5", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
            ],
            completedTasks: []
        }
    },
    mutations: {
        addTodo(state, payload) {
            state.todos.push(payload)
        },
        completeTodo(state,payload){
            //mover the task to the completed tasks array
            state.completedTasks.push(state.todos[payload.index])

            //remove the task from todos
            this.commit('deleteTodo',{index: payload.index})
        },
        deleteTodo(state,payload){
            state.todos.splice(payload.index,1)
        }
    },
    actions: {
        addTodoMutation(context, payload) {
            console.log("inside the addtodo mutation")
            context.commit('addTodo', payload)
        },
        deleteTodoMutation(context,payload){
            context.commit('deleteTodo',payload)
        },
        completeTaskMutation(context,payload){
            context.commit('completeTodo',payload)
        }
    }
})

export default store