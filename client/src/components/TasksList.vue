<template>
    <v-list lines="three">
        <v-list-subheader>
            <slot></slot>
        </v-list-subheader>

        <v-list-item :value="todo._id" v-for="(todo, index) in todos" :key="todo.name">
            <template v-slot:prepend="{ isActive }">

                <v-list-item-action start v-if="!isComplete">
                    <v-checkbox-btn :model-value="isActive" @click="completeTask(index)"></v-checkbox-btn>
                </v-list-item-action>
            </template>

            <div class="flex-container">
                <v-list-item-title>{{ todo.name }}</v-list-item-title>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>

                    <v-list v-if="isComplete">
                        <v-list-item>
                            <v-list-item-title @click="deleteTask(todo._id)">Delete</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title @click="undoTask(index)">Undo</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-list v-else>
                        <v-list-item>
                            <router-link :to="redirectTo">
                                <v-list-item-title @click="editTask(index)">Edit</v-list-item-title>
                            </router-link>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title @click="deleteTask(todo._id)">Delete</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <v-list-item-subtitle>
                <span class="flex-container" style="font-weight: bold;" v-if="!isComplete">
                    <div>Created on : {{ todo.creationDate }}</div>
                    <div>Complete by: {{ todo.completionDate }}</div>

                </span>
                <span class="flex-container" style="font-weight: bold;" v-else>
                    <div>Created on : {{ todo.creationDate }}</div>
                    <div>Completed on: {{ todo.completionDate }}</div>
                </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
                {{ todo.description }}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script>
import { updateTask, getTasks,deleteTask } from './../api/taskServices'
export default {
    props: ['todos', 'isComplete'],
    data() {
        return {
            chosenIndex: 0
        }
    },
    computed:{
        redirectTo() {
            return '/create/' + this.chosenIndex
        }
    },
    methods: {
        temp() {
            console.log('list item clicked')
        },
        editTask(index){
            this.chosenIndex = index
        },
        async deleteTask(id){
            console.log("inside the delete method")
            console.log(id)
            
            this.enabelLoadingWheel()
            try{
                const response = await deleteTask(id)
                console.log(response)

                if (response.status === 200) {
                    const tasks = await getTasks()
                    const completedTasks = tasks.filter(task => task.status === 'complete')
                    const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')

                    this.enabelLoadingWheel()
                    this.$store.commit('setIncompleteTasks', inCompleteTasks)
                    this.$store.commit('setCompleteTasks', completedTasks)
                }
                else
                    this.enabelLoadingWheel()
            }
            catch(error){
                console.warn(error)
            }
        },
        async undoTask(index){
            console.log("inside undotask method")
            const today = new Date();
            const dateString = today.toISOString().slice(0, 10);
            const task = this.$store.state.completedTasks[index]
            console.log(task._id)
            const newTask = {
                name: task.name,
                status: 'incomplete',
                completionDate: dateString.split('-').reverse().join('-'),
                description: task.description
            }
            console.log(task,newTask)
            this.enabelLoadingWheel()
            try {
                const response = await updateTask(newTask, task._id)
                console.log(response)

                if (response.status === 200) {
                    const tasks = await getTasks()
                    const completedTasks = tasks.filter(task => task.status === 'complete')
                    const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')

                    console.log(inCompleteTasks)
                    this.enabelLoadingWheel()
                    this.$store.commit('setIncompleteTasks', inCompleteTasks)
                    this.$store.commit('setCompleteTasks', completedTasks)
                }
                else
                    this.enabelLoadingWheel()
            } catch (error) {
                console.warn(error)
            }
        },
        async completeTask(index) {
            const today = new Date();
            const dateString = today.toISOString().slice(0, 10);
            const task = this.$store.state.incompleteTasks[index]
            console.log(task._id)
            const newTask = {
                name: task.name,
                status: 'complete',
                completionDate: dateString.split('-').reverse().join('-'),
                description: task.description
            }

            this.enabelLoadingWheel()
            try {
                const response = await updateTask(newTask, task._id)
                console.log(response)

                if (response.status === 200) {
                    const tasks = await getTasks()
                    const completedTasks = tasks.filter(task => task.status === 'complete')
                    const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')

                    this.enabelLoadingWheel()
                    this.$store.commit('setIncompleteTasks', inCompleteTasks)
                    this.$store.commit('setCompleteTasks', completedTasks)
                }
                else
                    this.enabelLoadingWheel()
            } catch (error) {
                console.warn(error)
            }
        },
        enabelLoadingWheel() {
            console.log("button clicked")
            this.$emit('toggleLoadingWheel')
        }
    }
}
</script>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
}
</style>

