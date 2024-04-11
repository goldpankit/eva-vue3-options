import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/user/create', data, {
    trim: true
  })
}

// 删除
export function deleteById (id) {
  return request.get(`/system/user/delete/${id}`)
}

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/user/delete/batch', {
    params: {
      ids
    }
  })
}

// 修改
export function updateById (data) {
  return request.post('/system/user/updateById', data, {
    trim: true
  })
}

// 配置用户角色
export function createUserRole (data) {
  return request.post('/system/user/createUserRole', data)
}

// 重置密码
export function resetPwd (data) {
  return request.post('/system/user/resetPwd', data)
}

// 查询
export function fetchPage (data) {
  return request.post('/system/user/page', data)
}
