import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import newRec from '../newRec.vue'
import UserShow from '../userShow.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: newRec },
  { path: '/users/:id', component: UserShow },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})