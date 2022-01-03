import Vue from 'vue'
import VueLoadmore, { locale } from '../../packages/index'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueLoadmore, {
  lang: 'en-US'
})
// Vue.use(VueLoadmore);
// locale.use('en-US');

new Vue({
  render: h => h(App),
}).$mount('#app')
