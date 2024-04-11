<template>
  <div class="menu" :class="{collapse: menuData.collapse<#noparse>}</#noparse>">
    <div class="logo">
      <div><img src="../../assets/logo.png" alt="logo"></div>
      <h1 :class="{hidden: menuData.collapse<#noparse>}</#noparse>">${menuTitle}</h1>
    </div>
    <Scrollbar>
      <el-menu
        ref="menu"
        :default-active="routeActiveIndex"
        :collapse="menuData.collapse"
        :default-openeds="defaultOpeneds"
        :collapse-transition="false"
        :unique-opened="true"
        @select="handleSelect"
      >
        <MenuItems
          v-for="menu in menuData.list"
          :key="menu.index"
          :menu="menu"
          :is-root-menu="true"
        />
      </el-menu>
    </Scrollbar>
  </div>
</template>

<script>
import { mapState <#noparse>}</#noparse> from 'pinia'
import MenuItems from './MenuItems.vue'
import Scrollbar from '@/components/common/Scrollbar.vue'
import constants from '@/core/plugins/consts'
import { useDefaultStore <#noparse>}</#noparse> from '@/core/store'
export default {
  name: 'AppMenu',
  components: { Scrollbar, MenuItems <#noparse>}</#noparse>,
  computed: {
    ...mapState(useDefaultStore, ['menuData']),
    // 选中的菜单index
    routeActiveIndex () {
      let path = this.$route.path
      if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1)
      <#noparse>}</#noparse>
      const menuConfig = this.__getMenuConfig(path, 'uri', this.menuData.list)
      if (menuConfig == null) {
        return null
      <#noparse>}</#noparse>
      return menuConfig.index
    <#noparse>}</#noparse>,
    // 默认展开的菜单index
    defaultOpeneds () {
      return this.menuData.list.map(menu => menu.index)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 处理菜单选中
     *
     * @param menuIndex 选中的菜单索引
     */
    async handleSelect (menuIndex) {
      const menuConfig = this.__getMenuConfig(menuIndex, 'index', this.menuData.list)
      // 外部链接
      if (menuConfig.type === constants.SYSTEM_MENU.TYPE_EXTERNAL) {
        window.open(menuConfig.uri)
        // 修改选中菜单为当前路由选中菜单
        this.$refs.menu.updateActiveIndex(this.routeActiveIndex)
        return
      <#noparse>}</#noparse>
      // 嵌入链接
      if (menuConfig.type === constants.SYSTEM_MENU.TYPE_IFRAME) {
        this.$router.push({
          name: 'IFrame',
          query: {
            uri: menuConfig.uri
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>)
        return
      <#noparse>}</#noparse>
      // 验证是否能找到页面，只有在测试模式下才验证（开发环境默认为测试模式）
      if (this.$isTesting) {
        if (menuConfig.__exists === false) {
          this.$tip.error('未找到页面文件@/views' + menuConfig.uri + '.vue，请检查菜单路径是否正确')
          return
        <#noparse>}</#noparse>
        // - 添加变量判断，避免重复import
        if (menuConfig.__exists === undefined) {
          try {
            await import(/* @vite-ignore */ `../../views<#noparse>${</#noparse>menuConfig.uri<#noparse>}</#noparse>.vue`)
            menuConfig.__exists = true
          <#noparse>}</#noparse> catch (e) {
            this.$tip.error('未找到页面文件@/views' + menuConfig.uri + '.vue，请检查菜单路径是否正确')
            menuConfig.__exists = false
            return
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      // 点击当前菜单不做处理
      if (menuConfig.uri === this.$route.path) {
        return
      <#noparse>}</#noparse>
      if (menuConfig.uri == null || menuConfig.uri.trim().length === 0) {
        return
      <#noparse>}</#noparse>
      this.$router.push(menuConfig.uri)
    <#noparse>}</#noparse>,
    /**
     * 获取菜单配置
     *
     * @param value 唯一标识值
     * @param key 唯一标识key
     * @param menus 查找菜单范围
     * @returns {null|*|null<#noparse>}</#noparse>
     * @private
     */
    __getMenuConfig (value, key, menus) {
      for (const menu of menus) {
        if (menu[key] === value) {
          return menu
        <#noparse>}</#noparse>
        if (menu.children != null && menu.children.length > 0) {
          const menuConfig = this.__getMenuConfig(value, key, menu.children)
          if (menuConfig != null) {
            return menuConfig
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      return null
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  // LOGO
  .logo {
    height: 75px;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    & > div {
      width: 35px;
      flex-shrink: 0;
      margin-right: 12px;
      transition: all ease .3s;
      img {
        width: 100%;
        flex-shrink: 0;
        vertical-align: middle;
        position: relative;
        top: -2px;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    h1 {
      line-height: initial;
      font-size: 22px;
      font-weight: 300;
      color: #f0f0f0;
      transition: opacity ease 1s;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      &.hidden {
        opacity: 0;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
<style lang="scss">
// 菜单样式
.el-menu {
  border-right: 0 !important;
  user-select: none;
  background: var(--menu-background-color) !important;
  .el-menu-item {
    color: var(--menu-text-color) !important;
    background: var(--menu-background-color);
    transition: none;
    // 圆弧
    .radius-top, .radius-bottom {
      width: var(--menu-active-radius-size);
      height: var(--menu-active-radius-size);
      opacity: 0;
      position: absolute;
      right: 0;
      z-index: 9;
    <#noparse>}</#noparse>
    .radius-top {
      top: calc(-1 * var(--menu-active-radius-size));
    <#noparse>}</#noparse>
    .radius-bottom {
      bottom: calc(-1 * var(--menu-active-radius-size));
    <#noparse>}</#noparse>
    // 选中状态
    &.is-active {
      background: var(--menu-active-background-color) !important;
      color: var(--menu-active-text-color) !important;
      position: relative;
      &:hover {
        color: var(--menu-active-text-hover-color) !important;
      <#noparse>}</#noparse>
      // 圆弧
      .radius-top, .radius-bottom {
        opacity: 1;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    // 悬浮
    &:hover {
      color: var(--menu-text-hover-color) !important;
      background-color: var(--menu-hover-background-color);
    <#noparse>}</#noparse>
    &:focus {
      background: var(--menu-background-color);
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 子菜单
  .el-sub-menu {
    .el-sub-menu__title{
      color: var(--menu-text-color) !important;
      background-color: var(--menu-background-color);
      &:hover {
        color: var(--menu-text-hover-color) !important;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    &.is-active {
      .el-submenu__title{
        background-color: var(--submenu-background-color);
      <#noparse>}</#noparse>
      .el-menu .el-menu-item{
        background-color: var(--submenu-background-color);
        // 悬浮
        &:hover {
          background-color: var(--menu-hover-background-color);
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    // 菜单上下箭头
    .el-submenu__title i {
      color: #f7f7f7;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 菜单图标
  .icon {
    position: relative;
    top: -1px;
    color: inherit !important;
    margin-right: 10px;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
