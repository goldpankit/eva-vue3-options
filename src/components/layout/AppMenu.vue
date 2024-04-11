<template>
  <div class="menu" :class="{collapse: menuData.collapse}">
    <div class="logo">
      <div><img src="../../assets/logo.png" alt="logo"></div>
      <h1 :class="{hidden: menuData.collapse}">伊娃权限系统</h1>
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
import { mapState } from 'pinia'
import MenuItems from './MenuItems.vue'
import Scrollbar from '@/components/common/Scrollbar.vue'
import constants from '@/core/plugins/consts'
import { useDefaultStore } from '@/core/store'
export default {
  name: 'AppMenu',
  components: { Scrollbar, MenuItems },
  computed: {
    ...mapState(useDefaultStore, ['menuData']),
    // 选中的菜单index
    routeActiveIndex () {
      let path = this.$route.path
      if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1)
      }
      const menuConfig = this.__getMenuConfig(path, 'uri', this.menuData.list)
      if (menuConfig == null) {
        return null
      }
      return menuConfig.index
    },
    // 默认展开的菜单index
    defaultOpeneds () {
      return this.menuData.list.map(menu => menu.index)
    }
  },
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
      }
      // 嵌入链接
      if (menuConfig.type === constants.SYSTEM_MENU.TYPE_IFRAME) {
        this.$router.push({
          name: 'IFrame',
          query: {
            uri: menuConfig.uri
          }
        })
        return
      }
      // 找不到页面
      try {
        await import(`../../views${menuConfig.uri}.vue`)
      } catch (e) {
        this.$tip.error('未找到页面文件@/views' + menuConfig.uri + '.vue，请检查菜单路径是否正确')
        return
      }
      // 点击当前菜单不做处理
      if (menuConfig.uri === this.$route.path) {
        return
      }
      if (menuConfig.uri == null || menuConfig.uri.trim().length === 0) {
        return
      }
      this.$router.push(menuConfig.uri)
    },
    /**
     * 获取菜单配置
     *
     * @param value 唯一标识值
     * @param key 唯一标识key
     * @param menus 查找菜单范围
     * @returns {null|*|null}
     * @private
     */
    __getMenuConfig (value, key, menus) {
      for (const menu of menus) {
        if (menu[key] === value) {
          return menu
        }
        if (menu.children != null && menu.children.length > 0) {
          const menuConfig = this.__getMenuConfig(value, key, menu.children)
          if (menuConfig != null) {
            return menuConfig
          }
        }
      }
      return null
    }
  }
}
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
      }
    }
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
      }
    }
  }
}
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
    }
    .radius-top {
      top: calc(-1 * var(--menu-active-radius-size));
    }
    .radius-bottom {
      bottom: calc(-1 * var(--menu-active-radius-size));
    }
    // 选中状态
    &.is-active {
      background: var(--menu-active-background-color) !important;
      color: var(--menu-active-text-color) !important;
      position: relative;
      &:hover {
        color: var(--menu-active-text-hover-color) !important;
      }
      // 圆弧
      .radius-top, .radius-bottom {
        opacity: 1;
      }
    }
    // 悬浮
    &:hover {
      color: var(--menu-text-hover-color) !important;
      background-color: var(--menu-hover-background-color);
    }
    &:focus {
      background: var(--menu-background-color);
    }
  }
  // 子菜单
  .el-sub-menu {
    .el-sub-menu__title{
      color: var(--menu-text-color) !important;
      background-color: var(--menu-background-color);
      &:hover {
        color: var(--menu-text-hover-color) !important;
      }
    }
    &.is-active {
      .el-submenu__title{
        background-color: var(--submenu-background-color);
      }
      .el-menu .el-menu-item{
        background-color: var(--submenu-background-color);
        // 悬浮
        &:hover {
          background-color: var(--menu-hover-background-color);
        }
      }
    }
    // 菜单上下箭头
    .el-submenu__title i {
      color: #f7f7f7;
    }
  }
  // 菜单图标
  .icon {
    position: relative;
    top: -1px;
    color: inherit !important;
    margin-right: 10px;
  }
}
</style>
