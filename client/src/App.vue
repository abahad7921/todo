<template>
  <v-app>
    <navigation-bar>
      <template #default>
        <router-view></router-view>
      </template>
    </navigation-bar>
  </v-app>
</template>

<script>
import { getTasks } from './api/taskServices'
import NavigationBar from './components/UI/NavigationBar.vue'
export default {
  name: 'App',

  components: {
    NavigationBar
  },

  data: () => ({
    //
  }),
  async created() {
    const tasks = await getTasks()
    console.log(tasks)

    const completedTasks = tasks.filter(task => task.status === 'complete')
    const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')
    
    this.$store.commit('setIncompleteTasks', inCompleteTasks)
    this.$store.commit('setCompleteTasks', completedTasks)
  }
}
</script>
