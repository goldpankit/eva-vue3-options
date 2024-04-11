import request from '@/core/utils/request'

// 创建
export function create (data) {
  return request.post('/system/menu/icon/create', data)
}

// 根据ID删除
export function deleteById (id) {
  return request.get(`/system/menu/icon/delete/${id}`)
}

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/menu/icon/delete/batch', {
    params: {
      ids
    }
  })
}

// 根据ID修改
export function updateById (data) {
  return request.post('/system/menu/icon/updateById', data)
}

// 分页查询
export function fetchPage (data) {
  return request.post('/system/menu/icon/page', data)
}

// 查询所有图标
export function fetchAll (data) {
  return request.get('/system/menu/icon/all', data)
}
