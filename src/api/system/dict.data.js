import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/dictData/create', data)
}

// 删除
export function deleteById (id) {
  return request.get(`/system/dictData/delete/${id}`)
}

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/dictData/delete/batch', {
    params: {
      ids
    }
  })
}

// 修改
export function updateById (data) {
  return request.post('/system/dictData/updateById', data)
}

// 排序
export function sort (data) {
  return request.post('/system/dictData/sort', data)
}

// 查询
export function fetchPage (data) {
  return request.post('/system/dictData/page', data)
}
