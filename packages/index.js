import VueLoadmore from './vuejs-loadmore/index';
import './vuejs-loadmore/index.scss';
import locale from './locale/index';

export default {
  install (Vue, options = {}) {
    Vue.component('vue-loadmore', VueLoadmore);

    locale.use(options.lang);
  }
};

export {
  locale
};
