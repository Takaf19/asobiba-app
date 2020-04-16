import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import newRec from '../newRec.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: newRec },
  ],
})

export let tabs = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/newReceations', name:"newReceations", component: newRec },
  ],
})