<template>
  <el-select
    class="dict-select"
    :class="{select__block: !inline}"
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
    },
    inline: {
      default: true
    },
    multiple: {
      default: false
    },
    clearable: {
      default: false
    },
    // label函数
    getLabel: {
      type: Function,
      default (data) {
        return data.label
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select__block {
  display: block;
}
</style>
