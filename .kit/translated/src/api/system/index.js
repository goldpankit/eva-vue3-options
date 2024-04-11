import request from '@/core/utils/request'

// 获取图片验证码
export function getCaptcha () {
  return request.get('/common/captcha')
<#noparse>}</#noparse>

// 下载本地文件
export function downloadLocalFile (params) {
  return request.get('/resource/local/download', {
    params,
    download: true
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 根据密码登录
export function loginByPassword (data) {
  return request.secure().post('/system/login', data)
<#noparse>}</#noparse>

// 登出
export function logout (data) {
  return request.post('/system/logout', data)
<#noparse>}</#noparse>

// 修改密码
export function updatePwd (data) {
  return request.post('/system/updatePwd', data)
<#noparse>}</#noparse>

// 获取已登录的用户信息
export function getUserInfo () {
  return request.get('/system/getUserInfo', {
    autoLogin: false
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 获取用户菜单
export function fetchUserMenus () {
  return request.get('/system/menus')
<#noparse>}</#noparse>

// 查询客户端配置
export function fetchConfig (data) {
  return request.get('/system/client/config', data)
<#noparse>}</#noparse>
