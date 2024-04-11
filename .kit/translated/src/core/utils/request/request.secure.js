import cache from './request.cache'
import twoFA from './request.2fa'
const requestMethods = ['get', 'post', 'delete', 'put', 'head', 'options', 'patch', 'request']

/**
 * 处理请求配置，添加安全请求配置项
 *
 * @param method 请求方法
 * @param argsArray 请求方法参数数组
 */
function handleConfig (method, argsArray) {
  let config
  if (method === 'post' || method === 'put' || method === 'patch') {
    config = argsArray[2]
    if (config == null) {
      config = {<#noparse>}</#noparse>
      argsArray[2] = config
    <#noparse>}</#noparse>
  <#noparse>}</#noparse> else {
    config = argsArray[1]
    if (config == null) {
      config = {<#noparse>}</#noparse>
      argsArray[1] = config
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  config.secure = true
<#noparse>}</#noparse>

/**
 * 开启请求加密
 * 实现逻辑：调用secure后，产生axios实例的代理对象，覆盖requestMethods变量中定义的方法（如get方法）
 *  实现修改config参数，为其添加secure安全标识配置。
 *
 * @usage
 *  request
 *    // 开启安全请求
 *    .secure()
 *    .[post|get|delete|put|head|options|patch|request]()
 * @returns {{isExtendsAxiosInstance: boolean<#noparse>}</#noparse><#noparse>}</#noparse>
 */
export default function () {
  const axiosProxy = {<#noparse>}</#noparse>
  // 覆盖请求方法，实现增加加密标识
  for (const method of requestMethods) {
    // 获取到axios原本的请求方法
    const originalMethod = this[method]
    // 给代理对象添加请求方法
    axiosProxy[method] = function () {
      return new Promise((resolve, reject) => {
        const argsArray = [...arguments]
        // 增加加密标识
        handleConfig(method, argsArray)
        // 执行业务接口请求
        originalMethod.apply(this, argsArray)
          .then(data => {
            resolve(data)
          <#noparse>}</#noparse>)
          .catch(error => {
            reject(error)
          <#noparse>}</#noparse>)
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 支持连续调用
  axiosProxy.cache = cache
  axiosProxy.twoFA = twoFA
  return axiosProxy
<#noparse>}</#noparse>
