/**
 * 字符串切割驼峰使用空格拼接
 * HelloWord => Hello Word
 */
export function splitCamelCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').trim();
}
