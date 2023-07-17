<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" color="white">
            <v-list nav>
                <v-list-item prepend-icon="mdi-home" title="Home" value="Home" to="/"></v-list-item>
                <v-list-item prepend-icon="mdi-checkbox-marked-circle" title="Create todo" value="newTodo"
                    to="/create"></v-list-item>
                <v-list-item prepend-icon="mdi-view-agenda" title="Completed Tasks" value="completedTasks"
                    to="/?status=complete"></v-list-item>
                <v-list-item prepend-icon="mdi-av-timer" title="Incompleted Tasks" value="incompletedTasks"
                    to="/?status=incomplete"></v-list-item>
                <v-list-item prepend-icon="mdi-information-variant" title="About us" value="aboutUs"
                    to="/about"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app image="img.jpg" extended>
            <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
            <v-toolbar-title class="title">Todo App</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <slot></slot>
        </v-main>
    </v-app>
</template>
  
<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>
  
<script>
export default {
    data: () => ({ drawer: null }),
}
</script>

<style scoped>
.title {
    color: white;
}
</style>