<template>
  <div class="loading">
    <el-icon class="is-loading" size="20">
      <Loading/>
    </el-icon>
    <slot><p>加载中...</p></slot>
  </div>
</template>

<script>
export default {
  name: 'AppLoading'
}
</script>

<style scoped lang="scss">
.loading {
  padding: 40px 0;
  text-align: center;
  p {
    color: #999;
    margin: 0;
    font-size: 13px;
  }
}
</style>
