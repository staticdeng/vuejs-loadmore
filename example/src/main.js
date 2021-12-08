import Vue from 'vue'
import VueLoadmore from '../../packages/index'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueLoadmore)

new Vue({
  render: h => h(App),
}).$mount('#app')
