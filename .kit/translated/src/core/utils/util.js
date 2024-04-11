import { Base64 <#noparse>}</#noparse> from 'js-base64'
/**
 * 为对象、数组、字符串等数据去空
 *
 * @param data 数据
 * @returns {string|null|*<#noparse>}</#noparse>
 */
export function trim (data) {
  if (data == null) {
    return null
  <#noparse>}</#noparse>
  if (typeof data === 'string') {
    return data.trim()
  <#noparse>}</#noparse>
  if (data instanceof Array) {
    for (const item of data) {
      trim(item)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  if (typeof data === 'object') {
    for (const key in data) {
      data[key] = trim(data[key])
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  return data
<#noparse>}</#noparse>

/**
 * 转为base64
 *
 * @param string
 * @returns {string<#noparse>}</#noparse>
 */
export function encodeToBase64 (string) {
  return Base64.encode(string)
<#noparse>}</#noparse>

/**
 * 解码Base64
 *
 * @param base64
 * @returns {string<#noparse>}</#noparse>
 */
export function decodeFromBase64 (base64) {
  return Base64.decode(base64)
<#noparse>}</#noparse>
