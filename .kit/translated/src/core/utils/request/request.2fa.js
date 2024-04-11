import TwoFAWindow from '@/components/common/TwoFAWindow'
import Cache from '@/core/plugins/cache'
import secure from './request.secure'
import cache from './request.cache'
import AES from '@/core/utils/aes'
import { createApp <#noparse>}</#noparse> from 'vue'
import { createPinia <#noparse>}</#noparse> from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import directives from '@/core/directives/index'
import plugins from '@/core/plugins'
import components from '@/components'

const requestMethods = ['get', 'post', 'delete', 'put', 'head', 'options', 'patch', 'request']

/**
 * 处理请求头，添加2fa密码头
 *
 * @param method 请求方法
 * @param password 密码
 * @param argsArray 请求方法参数数组
 */
function handleHeaders (method, password, argsArray) {
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
  const headers = config.headers || {<#noparse>}</#noparse>
  headers['X-2fa-Password'] = AES.encrypt(password)
  config.headers = headers
<#noparse>}</#noparse>

/**
 * 创建2FA窗口
 * @param props 参数
 */
function createTwoFAWindow (props) {
  const twoFAWindowApp = createApp(TwoFAWindow, {
    ...props
  <#noparse>}</#noparse>)
  // - 注入Pinia
  twoFAWindowApp.use(createPinia())
  // - 注入组件库
  twoFAWindowApp.use(ElementPlus, { locale: zhCn <#noparse>}</#noparse>)
  // - 注入自定义指令
  twoFAWindowApp.use(directives)
  // - 注入插件
  twoFAWindowApp.use(plugins)
  // - 注入自定义全局组件
  twoFAWindowApp.use(components)
  // - 注入图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    twoFAWindowApp.component(key, component)
  <#noparse>}</#noparse>
  return twoFAWindowApp.mount(document.createElement('div'))
<#noparse>}</#noparse>

/**
 * 开启请求缓存
 * 实现逻辑：调用twoFA后，产生axios实例的代理对象，覆盖requestMethods变量中定义的方法（如get方法）
 *  实现先打开2FA认证窗口，在点击认证窗口的【确认】按钮后获取到2FA认证密码，并将密码写入到请求头中后，再发起接口请求。
 *
 * @param props TwoFAWindow组件参数
 * @usage
 *  request
 *    // 开启2FA认证
 *    .twoFA()
 *    .[post|get|delete|put|head|options|patch|request]()
 * @returns {{isExtendsAxiosInstance: boolean<#noparse>}</#noparse><#noparse>}</#noparse>
 */
export default function (props = {<#noparse>}</#noparse>) {
  const axiosProxy = {<#noparse>}</#noparse>
  // 覆盖请求方法，实现2FA自动认证
  for (const method of requestMethods) {
    // 获取到axios原本的请求方法
    const originalMethod = this[method]
    // 给代理对象添加请求方法
    axiosProxy[method] = function () {
      return new Promise((resolve, reject) => {
        // 从缓存中获取2FA密码
        const password = Cache.memory.get('2fa-password')
        // 记住我的情况，直接调用业务接口
        if (password != null) {
          const argsArray = [...arguments]
          handleHeaders(method, password, argsArray)
          // 执行业务接口请求
          originalMethod.apply(this, argsArray)
            .then(data => {
              resolve(data)
            <#noparse>}</#noparse>)
            .catch(error => {
              reject(error)
            <#noparse>}</#noparse>)
          return
        <#noparse>}</#noparse>
        // 未记住，或密码存储已超时
        // 构建2FA认证窗口
        const $twoFaWindow = createTwoFAWindow(props)
        $twoFaWindow.$bus
          // 绑定2FA确认事件
          .on('confirm', (form) => {
            $twoFaWindow.isWorking = true
            // 补充2fa密码请求头
            const argsArray = [...arguments]
            handleHeaders(method, form.password, argsArray)
            // 执行业务接口请求
            originalMethod.apply(this, argsArray)
              .then(data => {
                $twoFaWindow.close()
                resolve(data)
              <#noparse>}</#noparse>)
              .catch(error => {
                reject(error)
              <#noparse>}</#noparse>)
              .finally(() => {
                $twoFaWindow.isWorking = false
              <#noparse>}</#noparse>)
          <#noparse>}</#noparse>)
          // 绑定2FA取消事件
          .on('cancel', () => {
            // 标记为#ignore#不会进行全局提示
            reject(new Error('#ignore#: cancel 2fa'))
          <#noparse>}</#noparse>)
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 支持连续调用
  axiosProxy.secure = secure
  axiosProxy.cache = cache
  return axiosProxy
<#noparse>}</#noparse>
