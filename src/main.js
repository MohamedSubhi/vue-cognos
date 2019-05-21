import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/Store'
import VueRouter from 'vue-router'
import Routes from './Routes'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes
})

new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
