<template>
  <div class="value">
    <el-icon v-if="data == null" class="is-loading" size="20">
      <Loading/>
    </el-icon>
    <slot v-else>{{getValue()<#noparse>}</#noparse><#noparse>}</#noparse>{{suffix<#noparse>}</#noparse><#noparse>}</#noparse></slot>
  </div>
</template>

<script>
export default {
  name: 'Value',
  props: {
    data: {
      type: Object
    <#noparse>}</#noparse>,
    prop: {
      type: String
    <#noparse>}</#noparse>,
    suffix: {
      type: String
    <#noparse>}</#noparse>,
    handler: {
      type: Function
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 获取值
     *
     * @returns {string<#noparse>}</#noparse>
     */
    getValue () {
      if (this.data == null) {
        return ''
      <#noparse>}</#noparse>
      if (this.prop == null) {
        return this.data
      <#noparse>}</#noparse>
      const props = this.prop.split('.')
      let i = 0
      let value = this.data
      while (i < props.length) {
        value = value[props[i]]
        i++
      <#noparse>}</#noparse>
      if (this.handler == null) {
        return value
      <#noparse>}</#noparse>
      return this.handler(value)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.value {
  word-break: break-all;
  .el-icon {
    font-size: 16px;
    color: #999;
    position: relative;
    top: 1px;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
