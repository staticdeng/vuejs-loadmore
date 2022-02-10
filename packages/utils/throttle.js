/**
 * 节流函数
 */

export function throttle (handle, wait) {
  var now, previous, timer, context, args;

  var execute = function () {
    handle.apply(context, args);
    previous = now;
  };

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (previous) {
      var diff = wait - (now - previous);
      if (diff < 0) {
        // 第一次触发可以立即响应
        execute();
      } else {
        // 结束触发后也能有响应
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};
