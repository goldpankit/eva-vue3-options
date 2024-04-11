import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/role/create', data, {
    trim: true
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/role/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/role/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/role/updateById', data, {
    trim: true
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 分页查询
export function fetchPage (data) {
  return request.post('/system/role/page', data)
<#noparse>}</#noparse>

// 查询所有
export function fetchAll () {
  return request.get('/system/role/all')
<#noparse>}</#noparse>
