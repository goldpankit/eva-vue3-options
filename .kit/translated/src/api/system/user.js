import request from '@/core/utils/request'

// 新建
export function create (data) {
  return request.post('/system/user/create', data, {
    trim: true
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 删除
export function deleteById (id) {
  return request.get(`/system/user/delete/<#noparse>${</#noparse>id<#noparse>}</#noparse>`)
<#noparse>}</#noparse>

// 批量删除
export function deleteByIdInBatch (ids) {
  return request.get('/system/user/delete/batch', {
    params: {
      ids
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 修改
export function updateById (data) {
  return request.post('/system/user/updateById', data, {
    trim: true
  <#noparse>}</#noparse>)
<#noparse>}</#noparse>

// 配置用户角色
export function createUserRole (data) {
  return request.post('/system/user/createUserRole', data)
<#noparse>}</#noparse>

// 重置密码
export function resetPwd (data) {
  return request.post('/system/user/resetPwd', data)
<#noparse>}</#noparse>

// 查询
export function fetchPage (data) {
  return request.post('/system/user/page', data)
<#noparse>}</#noparse>
