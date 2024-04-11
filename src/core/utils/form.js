/**
 * 验证身份证号码
 *
 * @param rule 规则
 * @param value 值
 * @param callback 回调
 */
export function checkIdNumber (rule, value, callback) {
  if (value == null || value.trim() === '') {
    callback()
    return
  }
  if (!/^\d{16}(\d{2})?$/.test(value)) {
    callback(new Error('身份证号码格式不正确'))
    return
  }
  callback()
}

/**
 * 验证手机号码
 *
 * @param rule 规则
 * @param value 值
 * @param callback 回调
 */
export function checkMobile (rule, value, callback) {
  if (value == null || value.trim() === '') {
    callback()
    return
  }
  if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('手机号码格式不正确'))
    return
  }
  callback()
}

/**
 * 验证邮箱
 *
 * @param rule 规则
 * @param value 值
 * @param callback 回调
 */
export function checkEmail (rule, value, callback) {
  if (value == null || value.trim() === '') {
    callback()
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    callback(new Error('邮箱格式不正确'))
    return
  }
  callback()
}

/**
 * 验证网络路径
 *
 * @param rule 规则
 * @param value 值
 * @param callback 回调
 */
export function checkUrl (rule, value, callback) {
  if (value == null || value.trim() === '') {
    callback()
    return
  }
  if (!/^(http|https):\/\/.+$/.test(value)) {
    callback(new Error('路径格式不正确'))
    return
  }
  callback()
}
