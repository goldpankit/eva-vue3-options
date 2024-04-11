import cache from '@/core/plugins/cache'
import constants from '@/core/plugins/consts'
import secure from './request.secure'
import twoFA from './request.2fa'
const requestMethods = ['get', 'post', 'delete', 'put', 'head', 'options', 'patch', 'request']

/**
 * 开启请求缓存
 * 实现逻辑：调用cache后，产生axios实例的代理对象，覆盖requestMethods变量中定义的方法（如get方法）
 *  实现先从缓存中获取数据，如果未能获取到数据，则使用axios实例发起请求，并将请求结果缓存起来。
 *
 * @param key 缓存的key
 * @param config 缓存配置
 * @usage
 *  request
 *    // 开启缓存
 *    .cache(
 *      // 缓存的key
 *      'key',
 *      {
 *        // 缓存类型
 *        type: constants.CACHE_TYPE.SESSION,
 *        // 超时时间，单位毫秒
 *        timeout: 3000
 *      <#noparse>}</#noparse>
 *     )
 *    .[post|get|delete|put|head|options|patch|request]()
 * @returns {{isExtendsAxiosInstance: boolean<#noparse>}</#noparse><#noparse>}</#noparse>
 */
export default function (key, config = { type: constants.CACHE_TYPE.SESSION, timeout: -1 <#noparse>}</#noparse>) {
  if (config.type == null) {
    throw new Error('缺少缓存类型')
  <#noparse>}</#noparse>
  const axiosProxy = {<#noparse>}</#noparse>
  // 覆盖请求方法，实现先从缓存中获取数据
  for (const method of requestMethods) {
    // 获取到axios原本的请求方法
    const originalMethod = this[method]
    // 给代理对象添加请求方法
    axiosProxy[method] = function () {
      // 获取缓存数据
      const data = cache[config.type].get(key)
      // 如果数据不为null，返回resolve promise对象
      if (data != null) {
        return Promise.resolve(data)
      <#noparse>}</#noparse>
      // 如果数据为null，则调用原有请求方法
      return originalMethod.apply(this, arguments)
        .then(data => {
          if (data != null) {
            // 缓存数据
            cache[config.type].set(key, data, config.timeout)
          <#noparse>}</#noparse>
          return Promise.resolve(data)
        <#noparse>}</#noparse>)
        .catch(error => {
          return Promise.reject(error)
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 支持连续调用
  axiosProxy.secure = secure
  axiosProxy.twoFA = twoFA
  return axiosProxy
<#noparse>}</#noparse>
