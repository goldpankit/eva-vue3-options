<template>
  <component
    :is="component"
    :type="type === 'LONG_TEXT' ? 'textarea' : 'text'"
    :rows="type === 'LONG_TEXT' ? 5 : null"
    :model-value="value"
    @input="$emit('update:value', $event)"
  />
</template>

<script>
import { ElInput <#noparse>}</#noparse> from 'element-plus'
export default {
  name: 'ConfigInput',
  props: {
    value: {
      type: String,
      required: true
    <#noparse>}</#noparse>,
    // 组件类型
    type: {
      type: String,
      default: 'TEXT'
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    component () {
      // 默认
      return ElInput
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
