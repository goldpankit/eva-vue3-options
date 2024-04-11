import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/dictData/create', data)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/dictData/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/dictData/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/dictData/updateById', data)
<#noparse>}</#noparse>

// 排序
export function sort (data) {
  return request.post('/system/dictData/sort', data)
<#noparse>}</#noparse>

// 查询
export function fetchPage (data) {
  return request.post('/system/dictData/page', data)
<#noparse>}</#noparse>
