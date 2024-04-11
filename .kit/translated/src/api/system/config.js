import request from '@/core/utils/request'

// 创建
export function create (data) {
  return request.post('/system/config/create', data)
<#noparse>}</#noparse>

// 根据ID删除
export function deleteById (id) {
  return request.get(`/system/config/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/config/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 根据ID修改
export function updateById (data) {
  return request.post('/system/config/updateById', data)
<#noparse>}</#noparse>

// 分页查询
export function fetchPage (data) {
  return request.post('/system/config/page', data)
<#noparse>}</#noparse>

// 刷新缓存
export function refreshCache (data) {
  return request.get('/system/config/cache/refresh', data)
<#noparse>}</#noparse>
