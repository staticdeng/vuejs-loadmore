// get nearest scroll element
const overflowScrollReg = /scroll|auto/i;

// 遍历父级返回最近一个可滚动的父级元素(overflow-y: auto的元素)，找不到则为window(不能为html,body)
export function getScroller (el, root = window) {
  let node = el;

  while (
    node &&
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === 1 &&
    node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }

  return root;
}

export function getScrollTop (el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}
