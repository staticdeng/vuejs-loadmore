/**
 * timeout mixin
 */

export const TimeoutMixin = {
  data () {
    return {
      timer: null
    };
  },
  methods: {
    timeout (fn, time) {
      clearTimeout(this.timer);
      setTimeout(() => {
        typeof fn === 'function' && fn();
      }, time);
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
