<template>
  <p class="form-item-tip" :style="{ color <#noparse>}</#noparse>">
    <Icon v-if="withIcon" :icon-class="iconClass"/>
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'FormItemTip',
  props: {
    // 是否包含图标
    withIcon: {
      default: true
    <#noparse>}</#noparse>,
    // 字体颜色
    color: {
      default: '#999'
    <#noparse>}</#noparse>,
    // 图标class
    iconClass: {
      default: 'Warning'
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.form-item-tip {
  line-height: 20px;
  font-size: 13px;
  color: #999;
  margin: 6px 0 0 0;
  .icon {
    font-size: 16px;
    margin-right: 5px;
    position: relative;
    top: 2px;
    color: orange;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
