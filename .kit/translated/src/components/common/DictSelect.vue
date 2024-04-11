<template>
  <el-select
    class="dict-select"
    :class="{select__block: !inline<#noparse>}</#noparse>"
    :value="value"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  >
    <el-option
      v-for="data in dataList"
      :key="data.value"
      :value="data.value"
      :label="getLabel(data)"
    />
  </el-select>
</template>

<script>
import BaseDict from '@/components/base/BaseDict'

export default {
  name: 'DictSelect',
  extends: BaseDict,
  props: {
    placeholder: {
      default: '请选择'
    <#noparse>}</#noparse>,
    inline: {
      default: true
    <#noparse>}</#noparse>,
    multiple: {
      default: false
    <#noparse>}</#noparse>,
    clearable: {
      default: false
    <#noparse>}</#noparse>,
    // label函数
    getLabel: {
      type: Function,
      default (data) {
        return data.label
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
<style lang="scss" scoped>
.select__block {
  display: block;
<#noparse>}</#noparse>
</style>
