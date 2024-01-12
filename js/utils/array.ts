/**
 * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
 */
function updateArray<T>(array: T[], item: T) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const temp = array[i];
    if (temp === item) {
      array.splice(i, 1);
      return;
    }
  }
  array.push(item);
}

/**
 * 将数组中指定元素移除
 */
function remove<T extends object>(array: T[], item: T, key?: keyof T) {
  if (!array) return;
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const val = array[i];
    if (item === val || (key && val && val[key] && val[key] === item[key])) {
      array.splice(i, 1);
    }
  }
}

export const ArrayUtil = {
  updateArray,
  remove,
};
