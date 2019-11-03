import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import VueLodash from 'vue-lodash'
import UtilMixin from './mixins/utilMixin'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.mixin(UtilMixin)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
