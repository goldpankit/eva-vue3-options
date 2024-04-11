import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/menu/create', data)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/menu/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/menu/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/menu/updateById', data)
<#noparse>}</#noparse>

// 修改状态
export function updateStatus (data) {
  return request.post('/system/menu/updateStatus', data)
<#noparse>}</#noparse>

// 排序
export function sort (data) {
  return request.post('/system/menu/updateSort', data)
<#noparse>}</#noparse>

// 查询
export function fetchAll (data) {
  return request.post('/system/menu/all', data)
<#noparse>}</#noparse>
