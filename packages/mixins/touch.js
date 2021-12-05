/**
 * touch相关
 */

import { on } from '../utils/event';

function getDirection (deltaX, deltaY) {
  const MIN_DISTANCE = 10;
  const x = Math.abs(deltaX);
  const y = Math.abs(deltaY);
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

export const TouchMixin = {
  data () {
    return { direction: '' };
  },
  methods: {
    // 绑定touch事件
    bindTouchEvent (el) {
      const { onTouchStart, onTouchMove, onTouchEnd } = this;

      on(el, 'touchstart', onTouchStart);
      on(el, 'touchmove', onTouchMove);

      if (onTouchEnd) {
        on(el, 'touchend', onTouchEnd);
        on(el, 'touchcancel', onTouchEnd);
      }
    },
    // touchStart
    touchStart (event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    // touchmove
    touchMove (event) {
      const touch = event.touches[0];
      // Fix: Safari back will set clientX to negative number
      this.deltaX = touch.clientX < 0 ? 0 : touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.direction = this.direction || getDirection(this.deltaX, this.deltaY);
    },
    // reset touch
    resetTouchStatus () {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
    }
  }
};
