import constants from './consts'
const isDebug = import.meta.env.VITE_APP_DEBUG === 'on'

/**
 * 缓存值包，缓存存储的最小单位
 * 目的：实现数据的准确存储和超时清理
 */
class ValuePackage {
  // 值类型
  type
  // 值
  value
  // 写入缓存的时间
  birthtime
  // 超时时间
  expiredTime
  constructor ({ type, value, birthtime, expiredTime <#noparse>}</#noparse>) {
    this.type = type
    this.value = value
    this.birthtime = birthtime
    this.expiredTime = expiredTime
  <#noparse>}</#noparse>

  /**
   * 获取值
   */
  getValue () {
    // 日期
    if (this.type === 'date') {
      return new Date(this.value)
    <#noparse>}</#noparse>
    // 对象
    if (this.type === 'object') {
      return JSON.parse(this.value)
    <#noparse>}</#noparse>
    return this.value
  <#noparse>}</#noparse>

  /**
   * 判断值包是否已过期
   */
  expired () {
    if (this.expiredTime == null) {
      return false
    <#noparse>}</#noparse>
    return new Date().getTime() > this.expiredTime
  <#noparse>}</#noparse>

  /**
   * 验证是否为正确的值包
   * @returns {boolean<#noparse>}</#noparse>
   */
  isCorrectPackage () {
    return this.type != null && this.value != null && this.birthtime != null
  <#noparse>}</#noparse>
<#noparse>}</#noparse>

/**
 * 缓存
 */
class Cache {
  // 缓存类型
  #cacheType
  // 缓存策略实例
  #strategyInstance
  // 缓存类型和实例的映射
  static #strategyMap = {
    [constants.CACHE_TYPE.LOCAL]: window.localStorage,
    [constants.CACHE_TYPE.SESSION]: window.sessionStorage,
    [constants.CACHE_TYPE.MEMORY]: {<#noparse>}</#noparse>
  <#noparse>}</#noparse>

  /**
   * 缓存构造器
   * @param cacheType 缓存类型，从plugins/consts.js/CACHE_TYPE中获取
   */
  constructor (cacheType) {
    this.#cacheType = cacheType
    this.#strategyInstance = Cache.#strategyMap[cacheType]
    if (this.#strategyInstance == null) {
      throw new Error(`构建缓存对象失败，未找到缓存类型<#noparse>${</#noparse>cacheType<#noparse>}</#noparse>`)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>

  /**
   * 根据key从缓存中获取值
   *
   * @param key 缓存键
   * @param defaultValue 默认值，如果没有值则返回该值
   * @returns {*<#noparse>}</#noparse>
   */
  get (key, defaultValue = null) {
    if (key == null) {
      return defaultValue
    <#noparse>}</#noparse>
    this.#log('get')
    this.#trace(`key=<#noparse>${</#noparse>key<#noparse>}</#noparse>`)
    this.#trace('default value=', defaultValue)
    // 获取值包
    let valuePackage
    if (this.#cacheType === constants.CACHE_TYPE.MEMORY) {
      valuePackage = this.#strategyInstance[key]
    <#noparse>}</#noparse> else {
      valuePackage = this.#strategyInstance.getItem(key)
    <#noparse>}</#noparse>
    if (valuePackage == null) {
      this.#trace('result=', defaultValue)
      return defaultValue
    <#noparse>}</#noparse>
    // 从storage中获取的值为字符串，需要转换为JSON对象
    if (typeof valuePackage === 'string') {
      try {
        valuePackage = new ValuePackage(JSON.parse(valuePackage))
        // 不是正确的值包（可能是通过缓存对象写入的），直接返回
        if (!valuePackage.isCorrectPackage()) {
          this.#trace('result=', valuePackage)
          return valuePackage
        <#noparse>}</#noparse>
      <#noparse>}</#noparse> catch (e) {
        // 不是JSON字符串（可能是通过缓存对象写入的），直接返回
        this.#trace('result=', valuePackage)
        return valuePackage
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    this.#trace('value package=', valuePackage)
    // 验证缓存是否过期
    if (valuePackage.expired()) {
      this.#trace('value expired!', `birth time=<#noparse>${</#noparse>valuePackage.birthtime<#noparse>}</#noparse>`, `expired time=<#noparse>${</#noparse>valuePackage.expiredTime<#noparse>}</#noparse>`)
      this.remove(key)
      this.#trace('result=', defaultValue)
      return defaultValue
    <#noparse>}</#noparse>
    this.#trace('result=', valuePackage.getValue())
    return valuePackage.getValue()
  <#noparse>}</#noparse>

  /**
   * 添加至缓存
   *
   * @param key 缓存键
   * @param value 缓存值
   * @param timeout 超时时间
   * @returns {Promise<void>|void|void<#noparse>}</#noparse>
   */
  set (key, value, timeout = -1) {
    if (key == null || key === '') {
      return
    <#noparse>}</#noparse>
    const valuePackage = this.#getValuePackage(value, timeout)
    this.#log('set')
    this.#trace(`key=<#noparse>${</#noparse>key<#noparse>}</#noparse>`)
    this.#trace('value=', value)
    this.#trace(`timeout=<#noparse>${</#noparse>timeout<#noparse>}</#noparse>ms`)
    if (this.#cacheType === constants.CACHE_TYPE.MEMORY) {
      this.#strategyInstance[key] = valuePackage
      return
    <#noparse>}</#noparse>
    this.#strategyInstance.setItem(key, JSON.stringify(valuePackage))
  <#noparse>}</#noparse>

  /**
   * 根据key从缓存中删除值
   *
   * @param key
   * @returns {*|void<#noparse>}</#noparse>
   */
  remove (key) {
    this.#log('remove', `key=<#noparse>${</#noparse>key<#noparse>}</#noparse>`)
    this.#trace(`key=<#noparse>${</#noparse>key<#noparse>}</#noparse>`)
    if (this.#cacheType === constants.CACHE_TYPE.MEMORY) {
      delete this.#strategyInstance[key]
      return
    <#noparse>}</#noparse>
    this.#strategyInstance.removeItem(key)
  <#noparse>}</#noparse>

  /**
   * 获取值包对象
   *
   * @param value 值
   * @param timeout 超时时间
   * @returns {*|{birthtime: number, type: *, value: number | string, expiredTime: (null|number)<#noparse>}</#noparse><#noparse>}</#noparse>
   */
  #getValuePackage (value, timeout) {
    let actualValue = value
    let type = typeof value
    // 日期，转换为时间戳
    if (value instanceof Date) {
      type = 'date'
      actualValue = value.getTime()
    <#noparse>}</#noparse>
    // 对象，转换为json字符串
    if (type === 'object') {
      actualValue = JSON.stringify(value)
    <#noparse>}</#noparse>
    // 获取值创建时间
    const birthtime = new Date().getTime()
    const expiredTime = timeout === -1 ? null : (birthtime + timeout)
    // 构建值包对象并返回
    return new ValuePackage({
      type,
      value: actualValue,
      birthtime,
      expiredTime
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>

  /**
   * 日志输出
   */
  // eslint-disable-next-line no-dupe-class-members
  #log () {
    if (!isDebug) {
      return
    <#noparse>}</#noparse>
    const args = [...arguments]
    const directive = args.shift()
    console.log(new Date().toLocaleString(), `[CACHE:<#noparse>${</#noparse>this.#cacheType<#noparse>}</#noparse>:<#noparse>${</#noparse>directive<#noparse>}</#noparse>]`)
  <#noparse>}</#noparse>

  /**
   * 跟踪输出
   */
  // eslint-disable-next-line no-dupe-class-members
  #trace () {
    if (!isDebug) {
      return
    <#noparse>}</#noparse>
    console.log.apply(null, ['  ', ...arguments])
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
const cachePackage = new Cache(constants.CACHE_TYPE.LOCAL)
// 构建基于Vuex的缓存对象
cachePackage[constants.CACHE_TYPE.MEMORY] = new Cache(constants.CACHE_TYPE.MEMORY)
// 构建基于SessionStorage的缓存对象
cachePackage[constants.CACHE_TYPE.SESSION] = new Cache(constants.CACHE_TYPE.SESSION)
// 构建基于LocalStorage的缓存对象
cachePackage[constants.CACHE_TYPE.LOCAL] = new Cache(constants.CACHE_TYPE.LOCAL)
export default cachePackage
