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
    },
    // 同el-empty description
    description: {
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
