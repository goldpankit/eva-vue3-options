import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/menu/func/create', data)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/menu/func/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/menu/func/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/menu/func/updateById', data)
<#noparse>}</#noparse>

// 查询
export function fetchPage (data) {
  return request.post('/system/menu/func/page', data)
<#noparse>}</#noparse>
