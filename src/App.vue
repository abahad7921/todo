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
