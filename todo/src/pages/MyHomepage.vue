<template>
    <v-sheet class="mx-auto">
        <v-sheet width="500px">
            <v-container class="pa-10">
                <v-layout justify-center>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="todo in todos" :key="todo.name">
                            <template v-slot:header>
                                <!-- Custom header -->
                                <v-row>
                                    <v-col cols="6">
                                        <h3>{{ todo.name }}</h3>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:default>
                                <!-- Custom text or description -->
                                <p>{{ todo.completionDate }}</p>
                            </template>

                            <template v-slot:content>
                                <!-- Custom content -->
                                <p>{{ todo.description }}</p>
                            </template>

                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-layout>
            </v-container>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    computed: {
        todos() {
            //console.log(this.$store.state.todos)
            return this.$store.state.todos
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