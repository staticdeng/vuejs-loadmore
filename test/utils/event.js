/**
 * 触发dom事件/自定义事件
 * @param {*} wrapper 
 * @param {*} eventName 
 * @param {*} x 
 * @param {*} y 
 */
export function trigger(wrapper, eventName, x = 0, y = 0) {
  const el = 'element' in wrapper ? wrapper.element : wrapper;
  const touchList = [{
    target: el,
    clientX: x,
    clientY: y
  }];

  // 自定义事件
  const event = customEvent(eventName);

  // 扩展
  Object.assign(event, {
    clientX: x,
    clientY: 100,
    touches: touchList,
    targetTouches: touchList,
    changedTouches: touchList,
  });

  // 触发自定义事件
  el.dispatchEvent(event);
}

/**
 * 自定义事件
 * @param {*} eventName 
 */
function customEvent(eventName) {
  var event;
  if (window.CustomEvent) {
    // 新版自定义事件
    event = new window.CustomEvent(eventName, {
      canBubble: true,
      cancelable: true
    });
  } else {
    // 已被废弃的方法，做兼容
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true);
  }
 
  return event;
 }