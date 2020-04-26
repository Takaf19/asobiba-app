import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import newRec from '../newRec.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: newRec },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})