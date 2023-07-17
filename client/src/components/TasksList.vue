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
            <v-list-item-title>{{ todo.name }}</v-list-item-title>
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
import { updateTask, getTasks } from './../api/taskServices'
export default {
    props: ['todos', 'isComplete'],
    methods: {
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
        enabelLoadingWheel(){
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

