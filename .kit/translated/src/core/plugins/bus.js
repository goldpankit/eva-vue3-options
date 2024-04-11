/**
 * 事件总线，用于进行全局的事件监听和触发
 * 使用方法：
 * this.$bus
 *    .on('confirm', () => {<#noparse>}</#noparse>)
 *    .on('cancel', () => {<#noparse>}</#noparse>)
 */
class EventBus {
  map = {<#noparse>}</#noparse>

  /**
   * 调用事件
   *
   * @param arguments[0] 事件名称
   * @param arguments[1,N] 事件参数
   */
  emit () {
    const args = [...arguments]
    const eventName = args.shift()
    const eventCallback = this.map[eventName]
    if (eventCallback == null || typeof eventCallback !== 'function') {
      throw new Error(`无法触发<#noparse>${</#noparse>eventName<#noparse>}</#noparse>事件！`)
    <#noparse>}</#noparse>
    eventCallback.apply(null, args)
    return this
  <#noparse>}</#noparse>

  /**
   * 监听事件
   *
   * @param name 事件名称
   * @param callback 事件回调函数
   * @param override 如果已存在事件，是否覆盖
   */
  on (name, callback, override = false) {
    if (typeof callback !== 'function') {
      throw new Error(`<#noparse>${</#noparse>name<#noparse>}</#noparse>事件回调必须为函数！`)
    <#noparse>}</#noparse>
    if (this.map[name] != null) {
      if (!override) {
        throw new Error(`事件总线中已存在<#noparse>${</#noparse>name<#noparse>}</#noparse>事件！`)
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    this.map[name] = callback
    return this
  <#noparse>}</#noparse>

  /**
   * 删除事件
   *
   * @param args 事件名称 | 事件名称数组 | 获取事件名称函数
   */
  delete (args) {
    if (args == null) {
      throw new Error('事件名称不可为空')
    <#noparse>}</#noparse>
    let names = [args]
    if (typeof args === 'function') {
      names = args()
    <#noparse>}</#noparse> else if (args instanceof Array) {
      names = args
    <#noparse>}</#noparse> else if (typeof args !== 'string') {
      throw new Error('事件名称必须为字符串、数组或函数！')
    <#noparse>}</#noparse>
    names.forEach(name => {
      if (this.map[name] != null) {
        delete this.map[name]
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>)
    return this
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
export default new EventBus()
