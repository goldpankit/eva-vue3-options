import { ElMessageBox <#noparse>}</#noparse> from 'element-plus'

export default {
  ...ElMessageBox,
  /**
   * 成功提示
   *
   * @param message 消息
   * @param title 标题
   * @param delay 延迟时间（毫秒）
   * @param extConfig 扩展配置
   */
  success (message, title = '操作成功', delay = 300, extConfig = {<#noparse>}</#noparse>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ElMessageBox.alert(message, title, {
          customClass: 'success-message-box',
          type: 'success',
          ...extConfig
        <#noparse>}</#noparse>)
          .then(() => {
            resolve()
          <#noparse>}</#noparse>)
          .catch(e => {
            reject(e)
          <#noparse>}</#noparse>)
      <#noparse>}</#noparse>, delay)
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>,
  /**
   * 删除二次确认
   *
   * @param message 消息内容
   * @param extConfig 扩展配置
   * @returns {Promise<#noparse>}</#noparse>
   */
  deleteConfirm (message, extConfig = {<#noparse>}</#noparse>) {
    return ElMessageBox.confirm(message, '删除提醒', {
      customClass: 'delete-message-box',
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'warning',
      ...extConfig
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>,
  /**
   * 禁用二次确认
   *
   * @param message 消息内容
   * @param extConfig 扩展配置
   * @returns {Promise<#noparse>}</#noparse>
   */
  disableConfirm (message, extConfig = {<#noparse>}</#noparse>) {
    return ElMessageBox.confirm(message, '禁用提醒', {
      confirmButtonText: '确认禁用',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'warning',
      ...extConfig
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>,
  /**
   * 导出二次确认
   *
   * @param message 消息内容
   * @param extConfig 扩展配置
   * @returns {Promise<#noparse>}</#noparse>
   */
  exportConfirm (message, extConfig = {<#noparse>}</#noparse>) {
    return ElMessageBox.confirm(message, '导出提醒', {
      confirmButtonText: '确认导出',
      cancelButtonText: '取消',
      type: 'warning',
      ...extConfig
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>,
  /**
   * 重要提醒
   *
   * @param message 消息内容
   * @param title 提醒标题
   * @param extConfig 扩展配置
   * @returns {Promise<#noparse>}</#noparse>
   */
  attentionConfirm (message, title = '重要提醒', extConfig = {<#noparse>}</#noparse>) {
    return ElMessageBox.confirm(message, title, {
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'warning',
      ...extConfig
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
