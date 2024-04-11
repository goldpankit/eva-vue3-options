import { defineStore <#noparse>}</#noparse> from 'pinia'
import { fetchConfig <#noparse>}</#noparse> from '@/api/system'

export const useDefaultStore = defineStore('default', {
  state: () => ({
    // 登录用户信息
    userInfo: null,
    // 首页
    homePage: null,
    // 客户端配置
    clientConfig: null,
    // 菜单
    menuData: {
      // 菜单列表
      list: [],
      // 是否收起
      collapse: false
    <#noparse>}</#noparse>,
    // 缓存内容
    cache: {<#noparse>}</#noparse>
  <#noparse>}</#noparse>),
  actions: {
    // 切换菜单收缩
    switchCollapseMenu (value) {
      if (value != null) {
        this.menuData.collapse = value
      <#noparse>}</#noparse> else {
        this.menuData.collapse = !this.menuData.collapse
      <#noparse>}</#noparse>
      window.localStorage.setItem('MENU_STATUS', this.menuData.collapse)
    <#noparse>}</#noparse>,
    /**
     * 初始化客户端配置
     */
    initClientConfig () {
      return fetchConfig()
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>)
