import Vue from 'vue'
import Router from 'vue-router'
import CardUsageHistory from './views/CardUsageHistory'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cardUsageHistory',
      component: CardUsageHistory
    }
  ]
})
