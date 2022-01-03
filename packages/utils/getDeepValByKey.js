/**
 * 遍历对象，获取某个深遍历节点的值
 */

export function getDeepVal (object, path) {
  let result = object;
  const keys = path.split('.');

  keys.forEach((key) => {
    result = result[key] ?? '';
  });

  return result;
};
