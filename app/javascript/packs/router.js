import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import newRec from '../newRec.vue'
import UserShow from '../userShow.vue'
import AllNewRec from '../topPage/allRecShow.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: newRec },
  { path: '/recreations/allNewRecreasions', name: "allNewRec", component: AllNewRec },
  { path: '/users/:id', component: UserShow },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})