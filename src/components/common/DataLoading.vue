<template>
  <div class="loading">
    <el-icon class="is-loading" :size="iconSize">
      <Loading/>
    </el-icon>
    <div class="loading-text__wrap"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'DataLoading',
  props: {
    // 图标大小
    iconSize: {
      default: '20px'
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  padding: 40px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .loading-text__wrap {
    color: #999;
    margin: 10px 0 0 0;
    font-size: 13px;
  }
}
</style>
