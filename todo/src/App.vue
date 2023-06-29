<template>
  <v-app>
     <my-homepage></my-homepage>
  </v-app>
</template>

<script>
import MyHomepage from './pages/MyHomepage.vue';

export default {
  name: 'App',

  components: {
    MyHomepage,
  },

  data: () => ({
    //
  }),
}
</script>
