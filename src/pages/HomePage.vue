<template>
    <v-sheet class="mx-auto">
        <v-container class="pa-10 mx-auto">
            <template v-if="todos.length > 0">
                <tasks-list :todos="todos" :isComplete="false">
                    <template #default>
                        Incomplete tasks
                    </template>
                </tasks-list>
            </template>

            <template v-if="completedTasks.length > 0">
                <tasks-list :todos="completedTasks" :isComplete="true">
                    <template #default>
                        Completed tasks
                    </template>
                </tasks-list>
            </template>
        </v-container>
    </v-sheet>
</template>

<script>
import TasksList from './TasksList.vue'
export default {
    components:{TasksList},
    computed: {
        todos() {
            return this.$store.state.todos
        },
        completedTasks() {
            return this.$store.state.completedTasks
        }
    },
    methods: {
        getText(date, desc) {
            const res = "last date of completion is " + date + "\n description: " + desc
            console.log(res)
            return res
        }
    }
}
</script>