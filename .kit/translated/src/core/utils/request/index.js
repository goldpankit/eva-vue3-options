import axios from 'axios'
import Cookies from 'js-cookie'
import pkg from '../../../../package.json'
import cache from './request.cache'
import twoFA from './request.2fa'
import secure from './request.secure'
import constants from '@/core/plugins/consts'
import AES from '../aes'
import LoginFormWindow from '@/components/system/LoginFormWindow'
import { trim <#noparse>}</#noparse> from '@/core/utils/util'
import { createApp <#noparse>}</#noparse> from 'vue'
import { createPinia <#noparse>}</#noparse> from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import directives from '@/core/directives/index'
import plugins from '@/core/plugins'
import components from '@/components'

const isDebug = import.meta.env.VITE_APP_DEBUG === 'on'
// 输出日志
const log = function () {
  if (!isDebug) {
    return
  <#noparse>}</#noparse>
  // eslint-disable-next-line no-useless-call
  console.log.apply(console, [new Date().toLocaleString(), '[REQUEST]', ...arguments])
<#noparse>}</#noparse>

// 默认配置
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_PREFIX,
  // 请求超时时间
  timeout: 60000
<#noparse>}</#noparse>)

/**
 * 创建登录窗口
 */
function createLoginWindow () {
  const loginWindowApp = createApp(LoginFormWindow)
  // - 注入Pinia
  loginWindowApp.use(createPinia())
  // - 注入组件库
  loginWindowApp.use(ElementPlus, { locale: zhCn <#noparse>}</#noparse>)
  // - 注入自定义指令
  loginWindowApp.use(directives)
  // - 注入插件
  loginWindowApp.use(plugins)
  // - 注入自定义全局组件
  loginWindowApp.use(components)
  // - 注入图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    loginWindowApp.component(key, component)
  <#noparse>}</#noparse>
  return loginWindowApp.mount(document.createElement('div'))
<#noparse>}</#noparse>

/**
 * 打开登录窗口
 */
export const openLoginFormWindow = function () {
  // 打开窗口
  setTimeout(() => {
    createLoginWindow().open()
  <#noparse>}</#noparse>, 300)
<#noparse>}</#noparse>

// 新建请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 参数去空格
  if (config.trim === true) {
    if (config.data != null) {
      config.data = trim(config.data)
    <#noparse>}</#noparse>
    if (config.params != null) {
      config.params = trim(config.params)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 参数加密
  if (config.secure === true) {
    if (config.data != null) {
      config.data = {
        _p: AES.encrypt(JSON.stringify(config.data))
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    if (config.params != null) {
      config.params = {
        _p: AES.encrypt(JSON.stringify(config.params))
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 导出处理
  if (config.download === true) {
    config.responseType = 'blob'
  <#noparse>}</#noparse>
  // 设置操作平台
  config.headers[constants.HEADER_PLATFORM] = `pc-<#noparse>${</#noparse>pkg.version<#noparse>}</#noparse>`
  // 设置认证头
  const authToken = Cookies.get(constants.HEADER_TOKEN)
  if (authToken != null) {
    config.headers[constants.HEADER_TOKEN] = authToken
  <#noparse>}</#noparse>
  return config
<#noparse>}</#noparse>, function (error) {
  return Promise.reject(error)
<#noparse>}</#noparse>)
// 新建响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 请求失败
  if (response.status !== 200) {
    return Promise.reject(new Error(constants.DEFAULT_ERROR_MESSAGE))
  <#noparse>}</#noparse>
  // 下载接口处理
  if (response.headers[constants.HEADER_OPERA_TYPE] === 'download') {
    // 正确执行
    if (response.data.type !== 'application/json') {
      return Promise.resolve(response)
    <#noparse>}</#noparse>
    // 未正确执行
    return new Promise((resolve, reject) => {
      const blob = new Blob([response.data])
      const fileReader = new FileReader()
      // 读取Blob内容
      fileReader.readAsText(blob, 'utf-8')
      fileReader.onload = function () {
        const result = JSON.parse(fileReader.result)
        // 未登录
        if (result.code === 401) {
          if (response.config.autoLogin !== false) {
            openLoginFormWindow()
          <#noparse>}</#noparse>
          reject(new Error('#ignore#'))
          return
        <#noparse>}</#noparse>
        // 业务失败
        if (!result.success) {
          reject(result)
          return
        <#noparse>}</#noparse>
        resolve(result)
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
  // 参数解密
  if (response.config.secure === true) {
    if (typeof response.data === 'string') {
      response.data = JSON.parse(AES.decrypt(response.data))
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  log(
    response.config.method.toUpperCase(),
    response.config.secure === true ? '[SECURE]' : '',
    response.config.url,
    response.data
  )
  // 纯字符串
  if (typeof response.data === 'string') {
    return Promise.reject(new Error(`接口<#noparse>${</#noparse>response.config.url<#noparse>}</#noparse>响应格式不正确`))
  <#noparse>}</#noparse>
  // 未登录
  if (response.data.code === 401) {
    if (response.config.autoLogin !== false) {
      openLoginFormWindow()
    <#noparse>}</#noparse>
    return Promise.reject(new Error('#ignore#'))
  <#noparse>}</#noparse>
  // 业务失败
  if (!response.data.success) {
    return Promise.reject(response.data)
  <#noparse>}</#noparse>
  return Promise.resolve(response.data.data)
<#noparse>}</#noparse>, function (error) {
  console.log('error', error)
  if (error.code == null) {
    return Promise.reject(new Error(constants.DEFAULT_ERROR_MESSAGE))
  <#noparse>}</#noparse>
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    return Promise.reject(new Error('服务器响应超时，请稍后再试'))
  <#noparse>}</#noparse>
  return Promise.reject(error)
<#noparse>}</#noparse>)

// 添加缓存方法，实现数据自动读取缓存和写入缓存
axiosInstance.cache = cache
// 添加2FA认证方法，实现自动二次认证
axiosInstance.twoFA = twoFA
// 添加安全方法，实现参数加密和响应的自动解密
axiosInstance.secure = secure

export default axiosInstance
