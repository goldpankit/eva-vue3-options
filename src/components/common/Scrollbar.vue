<template>
  <el-scrollbar>
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Scrollbar',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar__thumb{
  background-color: rgba(20,20,20,.3) !important;
}
.el-scrollbar__thumb:hover{
  background-color: rgba(20,20,20,.3) !important;
}
</style>
