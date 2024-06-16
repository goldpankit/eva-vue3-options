<template>
  <el-tree-select
    :class="{inline}"
    :model-value="modelValue"
    :data="data"
    :placeholder="placeholder"
    :render-after-expand="false"
    empty-text="无记录"
    :node-key="nodeKey"
    :multiple="multiple"
    :check-strictly="checkStrictly"
    :show-checkbox="showCheckbox"
    :clearable="clearable"
    :check-on-click-node="true"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script>
export default {
  name: 'TreeSelect',
  emits: ['update:value', 'update:delete'],
  data () {
    return {
    }
  },
  props: {
    modelValue: {},
    nodeKey: {},
    inline: {
      default: false
    },
    multiple: {
      default: false
    },
    showCheckbox: {
      default: true
    },
    placeholder: {
      default: '请选择'
    },
    checkStrictly: {
      default: true
    },
    // 是否可清空
    clearable: {
      default: false,
      type: Boolean
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.inline {
  width: 178px;
}
</style>
