import Clipboard from 'vue-clipboard3'
const { toClipboard <#noparse>}</#noparse> = Clipboard()

export default {
  mounted (el, binding) {
    // binding.arg 为动态指令参数
    // 将copy的值 成功回调 失败回调 及 click事件都绑定到el上 这样在更新和卸载时方便操作
    switch (binding.arg) {
    case 'copy':
      // copy值
      el.clipValue = binding.value
      // click事件
      el.clipCopy = function () {
        toClipboard(el.clipValue)
          .then(result => {
            el.clipSuccess && el.clipSuccess(result)
          <#noparse>}</#noparse>)
          .catch(err => {
            el.clipError && el.clipError(err)
          <#noparse>}</#noparse>)
      <#noparse>}</#noparse>
      // 绑定click事件
      el.addEventListener('click', el.clipCopy)
      break;
    case 'success':
      // 成功回调
      el.clipSuccess = binding.value
      break;
    case 'error':
      // 失败回调
      el.clipError = binding.value
      break
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  // 相应修改 重置相应的值即可
  updated (el, binding) {
    switch (binding.arg) {
    case 'copy':
      el.clipValue = binding.value
      break
    case 'success':
      el.clipSuccess = binding.value
      break
    case 'error':
      el.clipError = binding.value
      break
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  // 卸载 删除click事件 删除对应的自定义属性
  unmounted (el, binding) {
    switch (binding.arg) {
    case 'copy':
      el.removeEventListener('click', el.clipCopy)
      delete el.clipValue
      delete el.clipCopy
      break
    case 'success':
      delete el.clipSuccess
      break
    case 'error':
      delete el.clipError
      break
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
