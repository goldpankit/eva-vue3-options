import { Base64 } from 'js-base64'
/**
 * 为对象、数组、字符串等数据去空
 *
 * @param data 数据
 * @returns {string|null|*}
 */
export function trim (data) {
  if (data == null) {
    return null
  }
  if (typeof data === 'string') {
    return data.trim()
  }
  if (data instanceof Array) {
    for (const item of data) {
      trim(item)
    }
  }
  if (typeof data === 'object') {
    for (const key in data) {
      data[key] = trim(data[key])
    }
  }
  return data
}

/**
 * 转为base64
 *
 * @param string
 * @returns {string}
 */
export function encodeToBase64 (string) {
  return Base64.encode(string)
}

/**
 * 解码Base64
 *
 * @param base64
 * @returns {string}
 */
export function decodeFromBase64 (base64) {
  return Base64.decode(base64)
}
