<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn icon large target="_blank" slot="activator">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="login" label="username" type="text" v-model="username"></v-text-field>
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="test()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  methods:{
    test(){
      fetch('http://localhost:56665/api/login/login', {
              method: 'POST',
              headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({ username: this.username, password: this.password }) 
          }).then(res => {
            return res.json()
          }).then(res => {
              if (res)
                // this.$router.push(this.$route.query.redirect || '/')
                this.$router.push({name: 'home', params: {loggedIn: res}})
          });
    }
  }
};
</script>

<style>
</style>
