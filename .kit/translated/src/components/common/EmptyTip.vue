<template>
  <el-empty :image-size="imageSize" :description="description">
    <slot></slot>
  </el-empty>
</template>

<script>
export default {
  name: 'EmptyTip',
  props: {
    // 同el-empty image-size
    imageSize: {
      default: 55
    <#noparse>}</#noparse>,
    // 同el-empty description
    description: {
      default: ''
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
</style>
