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

/**
 * 判断两个数组的是否相等
 */
function isEqual(arr1: any[], arr2: any[]) {
  if (!(arr1 && arr2)) return false;
  if (arr1.length !== arr2.length) return false;
  const len = arr1.length;
  for (let i = 0; i < len; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export const ArrayUtil = {
  updateArray,
  remove,
  isEqual,
};
