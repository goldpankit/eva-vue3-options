<template>
  <el-radio-group
    class="dict-radio-group"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <el-radio
      v-for="data of dataList"
      :key="data.value"
      :value="data.value"
    >{{ data.label }}</el-radio>
  </el-radio-group>
</template>

<script>
import BaseDict from '@/components/base/BaseDict'

export default {
  name: 'DictRadioGroup',
  extends: BaseDict,
  props: {}
}
</script>

<style scoped lang="scss">
</style>
