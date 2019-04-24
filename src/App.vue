<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>COGNOS</span>
        <span class="font-weight-light">WORKSPACE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">User</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Tree/>
    </v-content>
  </v-app>
</template>

<script>
import Tree from './components/Tree'

export default {
  name: 'App',
  components: {
    Tree
  },
  data () {
    return {
      //
    }
  }
}
</script>
