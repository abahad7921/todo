<template>
    <v-sheet class="mx-auto">
        <v-container>
            <v-layout justify-center>
                <h1>Todo App</h1>
            </v-layout>
            <task></task>
        </v-container>
    </v-sheet>
</template>

<script>
import Task from './TodoTask.vue';
export default {
    components: {
        Task
    },
    data() {
        return {
            name: "Abdul Ahad"
        }
    }
}
</script>