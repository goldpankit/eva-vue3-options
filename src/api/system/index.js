import request from '@/core/utils/request'

// 获取图片验证码
export function getCaptcha () {
  return request.get('/common/captcha')
}

// 下载本地文件
export function downloadLocalFile (params) {
  return request.get('/resource/local/download', {
    params,
    download: true
  })
}

// 下载OSS文件
export function downloadOSSFile (params) {
  return request.get('/resource/oss/attach', {
    params,
    download: true
  })
}

// 根据密码登录
export function loginByPassword (data) {
  return request.secure().post('/system/login', data)
}

// 登出
export function logout (data) {
  return request.post('/system/logout', data)
}

// 修改密码
export function updatePwd (data) {
  return request.post('/system/updatePwd', data)
}

// 获取已登录的用户信息
export function getUserInfo () {
  return request.get('/system/getUserInfo', {
    autoLogin: false
  })
}

// 获取用户菜单
export function fetchUserMenus () {
  return request.get('/system/menus')
}

// 查询客户端配置
export function fetchConfig (data) {
  return request.get('/system/client/config', data)
}
