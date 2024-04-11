import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/menu/func/create', data)
}

// 删除
export function deleteById (id) {
  return request.get(`/system/menu/func/delete/${id}`)
}

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/menu/func/delete/batch', {
    params: {
      ids
    }
  })
}

// 修改
export function updateById (data) {
  return request.post('/system/menu/func/updateById', data)
}

// 查询
export function fetchPage (data) {
  return request.post('/system/menu/func/page', data)
}
