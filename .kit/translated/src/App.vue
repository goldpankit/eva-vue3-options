<template>
  <router-view/>
</template>

<script>
import pkg from '../package.json'
import constants from '@/core/plugins/consts'
import router from '@/router'
import { useDefaultStore<#noparse>}</#noparse> from '@/core/store'
import { mapState, mapActions <#noparse>}</#noparse> from 'pinia'
import { fetchUserMenus <#noparse>}</#noparse> from '@/api/system/index'

export default {
  data () {
    return {
      loading: false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    ...mapState(useDefaultStore, ['userInfo', 'menuData', 'homePage'])
  <#noparse>}</#noparse>,
  watch: {
    // 用户信息发生变化时，重新初始化路由
    async userInfo () {
      if (this.userInfo == null) {
        return
      <#noparse>}</#noparse>
      await this.initRoutes()
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    ...mapActions(useDefaultStore, ['switchCollapseMenu']),
    /**
     * 为静态引入添加版本号
     *
     * @param tag 标签
     * @param prop url属性名称
     * @param dataProp 预置的url属性名称
     */
    handleVersion (tag, prop, dataProp) {
      const tags = document.querySelectorAll(tag)
      for (const tag of tags) {
        const uri = tag.getAttribute(dataProp)
        if (uri == null || uri === '') {
          continue
        <#noparse>}</#noparse>
        const prefix = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL
        tag[prop] = `<#noparse>${</#noparse>prefix<#noparse>}</#noparse><#noparse>${</#noparse>uri<#noparse>}</#noparse>?v=<#noparse>${</#noparse>pkg.version<#noparse>}</#noparse>`
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    /**
     * 初始化本地配置
     */
    initLocalConfig () {
      // 菜单状态配置
      const menuStatus = window.localStorage.getItem('MENU_STATUS')
      if (menuStatus != null) {
        this.switchCollapseMenu(menuStatus === 'true')
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    /**
     * 初始化路由
     *
     * @returns {Promise<void><#noparse>}</#noparse>
     */
    async initRoutes () {
      if (this.loading || this.userInfo == null) {
        return
      <#noparse>}</#noparse>
      this.loading = true
      // 重置菜单
      this.$defaultStore.menuData.list = []
      // 获取菜单
      const storeMenus = this.menuData.list
      await fetchUserMenus()
        .then(menus => {
          // 没有菜单，跳转到无权访问提示页
          if (menus.length === 0) {
            this.$router.push({
              name: 'error',
              params: {
                type: 'not-allowed'
              <#noparse>}</#noparse>
            <#noparse>}</#noparse>)
            return
          <#noparse>}</#noparse>
          // 设置首页
          const homePage = this.__getHomePage(menus)
          // - 没有找到合适的首页（非外部链接、IFrame嵌入的菜单），则跳转到无权访问提示页
          if (homePage == null) {
            this.$router.push({
              name: 'error',
              params: {
                type: 'not-allowed'
              <#noparse>}</#noparse>
            <#noparse>}</#noparse>)
            return
          <#noparse>}</#noparse>
          this.$defaultStore.homePage = this.__getHomePage(menus)
          // 添加菜单
          storeMenus.push.apply(storeMenus, menus)
          // 添加路由
          this.__addRouters(storeMenus)
          // 404捕获，需要在路由添加完成后，将其添加到最后，避免刷新时路由还未加载直接出现404
          router.addRoute({
            path: '/:catchAll(.*)',
            redirect: '/error/not-found'
          <#noparse>}</#noparse>)
          // 首页
          router.addRoute({
            name: 'index',
            path: '/',
            redirect: this.homePage.uri
          <#noparse>}</#noparse>)
          // 等待路由跳转
          setTimeout(() => {
            // 路由加载完成后，重新使路由生效
            // - 直接访问域名，跳转至首页
            if (this.$route.path === '/') {
              this.$router.push(this.homePage.uri)
            <#noparse>}</#noparse>
            // - 否则重新push到路由中，否则路由不会生效
            else {
              this.$router.push(this.$route.path)
            <#noparse>}</#noparse>
          <#noparse>}</#noparse>, 101)
        <#noparse>}</#noparse>)
        .catch(e => {
          throw e
        <#noparse>}</#noparse>)
        .finally(() => {
          this.loading = false
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 新建路由
     *
     * @param routes 需添加的路由
     * @param parents 需添加到的目标列表
     * @private
     */
    __addRouters (routes, parents = []) {
      if (routes == null || routes.length === 0) {
        return
      <#noparse>}</#noparse>
      const rs = router.getRoutes()
      for (const route of routes) {
        const parentsDump = JSON.parse(JSON.stringify(parents))
        parentsDump.push(route)
        if (route.type === 'DIR') {
          this.__addRouters(route.children, parentsDump)
          continue
        <#noparse>}</#noparse>
        // 外链和嵌入链，不添加路由
        if (route.type === 'EXTERNAL' || route.type === 'IFRAME') {
          continue
        <#noparse>}</#noparse>
        if (rs.findIndex(r => r.path === route.path) > -1) {
          this.__addRouters(route.children, parentsDump)
          continue
        <#noparse>}</#noparse>
        if (this.homePage == null) {
          this.defaultStore.homePage = route
        <#noparse>}</#noparse>
        router.addRoute('layout', {
          path: route.uri,
          name: route.name,
          meta: {
            title: route.name,
            paths: [...parents.map(p => p.name), route.name]
          <#noparse>}</#noparse>,
          component: () => import(/* @vite-ignore */`./views<#noparse>${</#noparse>route.uri<#noparse>}</#noparse>`)
        <#noparse>}</#noparse>)
        this.__addRouters(route.children, parentsDump)
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    /**
     * 获取首页
     * @private
     */
    __getHomePage (menus) {
      for (const menu of menus) {
        // 目录，继续查找子菜单
        if (menu.type === constants.SYSTEM_MENU.TYPE_DIR) {
          const homePage = this.__getHomePage(menu.children)
          // 在当前目录下未找到合适的菜单作为首页，则继续查找下一级菜单
          if (homePage == null) {
            continue
          <#noparse>}</#noparse>
          return homePage
        <#noparse>}</#noparse>
        // 外部链接，不能作为首页
        if (menu.type === constants.SYSTEM_MENU.TYPE_EXTERNAL) {
          continue
        <#noparse>}</#noparse>
        // IFrame嵌套，不能作为首页
        if (menu.type === constants.SYSTEM_MENU.TYPE_IFRAME) {
          continue
        <#noparse>}</#noparse>
        return menu
      <#noparse>}</#noparse>
      return null
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.handleVersion('link', 'href', 'data-href')
    this.handleVersion('script', 'src', 'data-src')
    // 已登录，则初始化路由
    if (this.userInfo != null) {
      await this.initRoutes()
        .catch(() => {<#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  mounted () {
    this.initLocalConfig()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
