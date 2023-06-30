<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavigationBar from './components/UI/NavigationBar.vue'
export default {
  name: 'App',

  components: {
    NavigationBar
  },

  data: () => ({
    //
  }),
}
</script>
