export default {
  // 性别
  sex (value) {
    if (value === '1') {
      return '男'
    <#noparse>}</#noparse>
    if (value === '0') {
      return '女'
    <#noparse>}</#noparse>
    return '未知'
  <#noparse>}</#noparse>,
  // 是否文案（Yes Or No）
  yONText(value) {
    return value ? '是' : '否'
  <#noparse>}</#noparse>,
  // 是否启用文案
  enableText (value) {
    return value ? '启用' : '禁用'
  <#noparse>}</#noparse>,
  // 是否禁用文案
  disabledText (value) {
    return value ? '禁用' : '启用'
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
