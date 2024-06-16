<template>
  <el-empty
    :image-size="imageSize"
    :description="description"
    :class="{ 'el-empty__no-text': !description }"
  >
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
      default: '暂无数据'
    }
  }
}
</script>

<style scoped lang="scss">
.el-empty.el-empty__no-text {
  :deep(.el-empty__description) {
    display: none !important;
  }
}
</style>
