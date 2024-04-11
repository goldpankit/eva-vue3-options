import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/dict/create', data)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/dict/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/dict/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/dict/updateById', data)
<#noparse>}</#noparse>

// 查询
export function fetchPage (data) {
  return request.post('/system/dict/page', data)
<#noparse>}</#noparse>

// 刷新缓存
export function refreshCache (data) {
  return request.get('/system/dict/cache/refresh', data)
<#noparse>}</#noparse>
