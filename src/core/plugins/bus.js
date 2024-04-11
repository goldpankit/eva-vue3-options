/**
 * 事件总线，用于进行全局的事件监听和触发
 * 使用方法：
 * this.$bus
 *    .on('confirm', () => {})
 *    .on('cancel', () => {})
 */
class EventBus {
  map = {}

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
      throw new Error(`无法触发${eventName}事件！`)
    }
    eventCallback.apply(null, args)
    return this
  }

  /**
   * 监听事件
   *
   * @param name 事件名称
   * @param callback 事件回调函数
   * @param override 如果已存在事件，是否覆盖
   */
  on (name, callback, override = false) {
    if (typeof callback !== 'function') {
      throw new Error(`${name}事件回调必须为函数！`)
    }
    if (this.map[name] != null) {
      if (!override) {
        throw new Error(`事件总线中已存在${name}事件！`)
      }
    }
    this.map[name] = callback
    return this
  }

  /**
   * 删除事件
   *
   * @param args 事件名称 | 事件名称数组 | 获取事件名称函数
   */
  delete (args) {
    if (args == null) {
      throw new Error('事件名称不可为空')
    }
    let names = [args]
    if (typeof args === 'function') {
      names = args()
    } else if (args instanceof Array) {
      names = args
    } else if (typeof args !== 'string') {
      throw new Error('事件名称必须为字符串、数组或函数！')
    }
    names.forEach(name => {
      if (this.map[name] != null) {
        delete this.map[name]
      }
    })
    return this
  }
}
export default new EventBus()
