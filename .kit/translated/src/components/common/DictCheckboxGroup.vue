<template>
  <el-checkbox-group
    :model-value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <el-checkbox
      v-for="data in dataList"
      :key="data.value"
      :value="data.value"
    >{{ data.label <#noparse>}</#noparse><#noparse>}</#noparse></el-checkbox>
  </el-checkbox-group>
</template>

<script>
import BaseDict from '@/components/base/BaseDict'

export default {
  name: 'DictCheckboxGroup',
  extends: BaseDict,
  props: {
    value: {
      type: Array,
      default: () => []
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
</style>
