/**
 * event事件绑定和取消
 */

import { on, off } from '../utils/event';

export function BindEventMixin (eventFn) {
  function bind () {
    eventFn.call(this, on);
  }

  function unbind () {
    eventFn.call(this, off);
  }
  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind
  };
}
