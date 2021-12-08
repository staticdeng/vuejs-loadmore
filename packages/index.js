import VueLoadmore from './vuejs-loadmore/index';
import './vuejs-loadmore/index.scss';

export default {
  install (Vue) {
    Vue.component('vue-loadmore', VueLoadmore);
  }
};
