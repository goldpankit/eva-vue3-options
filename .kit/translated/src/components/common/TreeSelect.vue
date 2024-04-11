<template>
  <el-tree-select
    :class="{inline<#noparse>}</#noparse>"
    :model-value="value"
    :data="data"
    :placeholder="placeholder"
    :render-after-expand="false"
    no-data-text="无记录"
    no-match-text="未匹配到数据"
    :multiple="multiple"
    check-strictly
    :show-checkbox="!flat"
    :clearable="clearable"
    @change="change"
    @check="checkChange"
    @remove-tag="deleteCheck"
  />
</template>

<script>
export default {
  name: 'TreeSelect',
  emits: ['update:value', 'update:delete'],
  data () {
    return {
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  props: {
    inline: {
      default: false
    <#noparse>}</#noparse>,
    multiple: {
      default: false
    <#noparse>}</#noparse>,
    flat: {
      default: false
    <#noparse>}</#noparse>,
    value: {<#noparse>}</#noparse>,
    placeholder: {
      default: '请选择'
    <#noparse>}</#noparse>,
    // 是否可清空
    clearable: {
      default: false,
      type: Boolean
    <#noparse>}</#noparse>,
    data: {
      type: Array,
      required: true
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    // 复选框勾选
    checkChange (val) {
      if (!this.multiple) return
      this.$emit('update:value', val)
    <#noparse>}</#noparse>,
    change (val) {
      if (this.multiple) return
      this.$emit('update:value', val)
    <#noparse>}</#noparse>,
    // 多选框删除tag
    deleteCheck (val) {
      this.$emit('update:delete', val)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.inline {
  width: 178px;
<#noparse>}</#noparse>
</style>
