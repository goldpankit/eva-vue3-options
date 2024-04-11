import { ElMessage <#noparse>}</#noparse> from 'element-plus'
const isDebug = import.meta.env.VITE_APP_DEBUG === 'on'

export default {
  ...ElMessage,
  /**
   * 接口调用成功
   * @param message 提示消息
   */
  apiSuccess (message) {
    ElMessage.success(message)
  <#noparse>}</#noparse>,
  /**
   * 接口调用失败
   * @param err 错误对象
   */
  apiFailed (err) {
    try {
      if (isDebug) {
        console.error(new Date().toLocaleString(), '[REQUEST FAILED]', err)
      <#noparse>}</#noparse>
      // 下载接口返回的是Blob，此时需要解析为JSON并提示错误消息。（下载接口出现业务失败的情况，例如无权限等）
      if (err instanceof Blob) {
        const fileReader = new FileReader()
        fileReader.readAsText(err, 'utf-8')
        fileReader.onload = function () {
          ElMessage.error(JSON.parse(fileReader.result).message)
        <#noparse>}</#noparse>
        return
      <#noparse>}</#noparse>
      if (!err.message.startsWith('#ignore#')) {
        ElMessage.error(err.message)
      <#noparse>}</#noparse>
    <#noparse>}</#noparse> catch (e) {
      console.error('apiFailed error', e)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
