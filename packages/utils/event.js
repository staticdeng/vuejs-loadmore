/**
 * dom事件
 */
export function on (target, event, handler, passive = false) {
  target.addEventListener(
    event,
    handler,
    passive ? { capture: false, passive } : false
  );
}

export function off (target, event, handler) {
  target.removeEventListener(event, handler);
}

export function preventDefault (event) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
};
