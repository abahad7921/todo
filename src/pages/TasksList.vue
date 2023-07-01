<template>
    <v-list lines="three">
        <v-list-subheader>
            <slot></slot>
        </v-list-subheader>

        <v-list-item :value="todo.id" v-for="(todo, index) in todos" :key="todo.name">
            <template v-slot:prepend="{ isActive }">

                <v-list-item-action start v-if="!isComplete">
                    <v-checkbox-btn :model-value="isActive" @click="completeTask(index)"></v-checkbox-btn>
                </v-list-item-action>
            </template>

            <v-list-item-title>{{ todo.name }}</v-list-item-title>
            <v-list-item-subtitle>
                <span style="font-weight: bold;">
                    Complete by: {{ todo.completionDate }}
                </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
                {{ todo.description }}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script>
export default{
    props:['todos','isComplete'],
    methods:{
        completeTask(index) {
            console.log("inside complete task method with index val = " + index)
            this.$store.dispatch('completeTaskMutation', { index: index })
        }
    }
}
</script>

