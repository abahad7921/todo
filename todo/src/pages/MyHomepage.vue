<template>
    <v-sheet class="mx-auto">
        <v-container class="pa-10">
            <v-layout justify-center>
                <div v-for="todo in todos" :key="todo.name">
                    <h1>Name: {{ todo.name }}</h1>
                    <h3>Expected completion date: {{ todo.completionDate }}</h3>
                    <p>Desc: {{ todo.description }}</p>
                    <br>
                </div>
            </v-layout>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
    computed: {
        todos(){
            //console.log(this.$store.state.todos)
            return this.$store.state.todos
        }
    }
}
</script>