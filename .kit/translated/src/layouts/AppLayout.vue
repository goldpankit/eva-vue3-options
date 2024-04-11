<template>
  <el-container class="app-layout">
    <el-aside :class="{ collapse: menuData.collapse <#noparse>}</#noparse>">
      <AppMenu/>
    </el-aside>
    <el-main>
      <header>
        <AppHeader/>
      </header>
      <main>
        <RouterView v-slot="{ Component <#noparse>}</#noparse>">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </el-main>
  </el-container>
</template>

<script>
import { mapState <#noparse>}</#noparse> from 'pinia'
import AppHeader from '@/components/layout/AppHeader'
import AppMenu from '@/components/layout/AppMenu'
import { useDefaultStore <#noparse>}</#noparse> from '@/core/store'
export default {
  name: 'DefaultLayout',
  components: { AppHeader, AppMenu <#noparse>}</#noparse>,
  computed: {
    ...mapState(useDefaultStore, ['menuData'])
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.el-container {
  background: #F7F8F9;
  height: 100vh;
  display: flex;
  overflow: hidden;
  // 左边菜单
  .el-aside {
    width: var(--menu-width) !important;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
    background: var(--menu-background-color);
    color: #fff;
    transition: width ease .3s;
    position: relative;
    z-index: 99;
    &.collapse {
      width: 64px !important;
      :deep(.logo) > div{
        margin-right: 0;
        transition: all ease .3s;
      <#noparse>}</#noparse>
      :deep(h1) {
        opacity: 0;
        transition: none;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  // 右边内容
  .el-main {
    width: 100%;
    height: 100%;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    & > header {
      height: var(--header-height);
      flex-shrink: 0;
    <#noparse>}</#noparse>
    & > main {
      height: 100%;
      overflow-y: auto;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
// 页面过渡动画
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  opacity: 1;
  position: absolute;
  width: 100%;
<#noparse>}</#noparse>
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
  transition: all .5s;
  position: absolute;
<#noparse>}</#noparse>
</style>
