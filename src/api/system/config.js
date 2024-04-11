import request from '@/core/utils/request'

// 创建
export function create (data) {
  return request.post('/system/config/create', data)
}

// 根据ID删除
export function deleteById (id) {
  return request.get(`/system/config/delete/${id}`)
}

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/config/delete/batch', {
    params: {
      ids
    }
  })
}

// 根据ID修改
export function updateById (data) {
  return request.post('/system/config/updateById', data)
}

// 分页查询
export function fetchPage (data) {
  return request.post('/system/config/page', data)
}

// 刷新缓存
export function refreshCache (data) {
  return request.get('/system/config/cache/refresh', data)
}
