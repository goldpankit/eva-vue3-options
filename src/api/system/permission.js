import request from '@/core/utils/request'

// 获取权限数据
export function fetchPermissions () {
  return request.get('/system/permission/data')
}

// 配置权限
export function configPermissions (data) {
  return request.post('/system/permission/config', data)
}
