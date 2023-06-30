<template>
    <v-sheet class="mx-auto" width="700px">
        <v-container class="pa-10">
            <v-layout justify-center>
                <v-expansion-panels>
                    <template v-if="todos.length > 0">
                        <h2>Incomplete tasks</h2>
                        <v-expansion-panel v-for="(todo, index) in todos" :key="todo.name">
                            <template #title>
                                <v-row>
                                    <v-col cols="12" sm="10" lg="10" md="10" xsm="10">
                                        <h3 class="mt-3">{{ todo.name }}</h3>
                                    </v-col>
                                    <v-col cols="12" sm="1" lg="1" md="1" xsm="1">
                                        <v-btn icon="mdi-delete" variant="plain" color="red"
                                            @click="deleteTask(index)"></v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="1" lg="1" md="1" xsm="1">
                                        <v-btn icon="mdi-check" variant="plain" color="green"
                                            @click="completeTask(index)"></v-btn>
                                    </v-col>
                                </v-row>
                            </template>

                            <template #text>
                                <h4>Complete by: {{ todo.completionDate }}</h4>
                                <p>{{ todo.description }}</p>
                            </template>
                        </v-expansion-panel>
                    </template>

                    <template v-if="completedTasks.length > 0">
                        <h2>Completed tasks</h2>
                        <v-expansion-panel v-for="(todo, index) in completedTasks" :key="todo.name">
                            <template #title>
                                <v-row>
                                    <v-col cols="12" sm="10" lg="10" md="10" xsm="10">
                                        <h3 class="mt-3">{{ todo.name }}</h3>
                                    </v-col>
                                    <v-col cols="12" sm="1" lg="1" md="1" xsm="1">
                                        <v-btn icon="mdi-delete" variant="plain" color="red"
                                            @click="deleteTask(index)"></v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="1" lg="1" md="1" xsm="1">
                                        <v-btn icon="mdi-check" variant="plain" color="green"
                                            @click="completeTask(index)"></v-btn>
                                    </v-col>
                                </v-row>
                            </template>

                            <template #text>
                                <h4>Complete by: {{ todo.completionDate }}</h4>
                                <p>{{ todo.description }}</p>
                            </template>
                        </v-expansion-panel>
                    </template>
                </v-expansion-panels>
            </v-layout>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
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
        },
        deleteTask(index) {
            console.log("inside delete task method with index val = " + index)
            this.$store.dispatch('deleteTodoMutation', { index: index })
        },
        completeTask(index) {
            console.log("inside complete task method with index val = " + index)
            this.$store.dispatch('completeTaskMutation', { index: index })
        }
    }
}
</script>