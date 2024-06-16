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
    // 详见el-tree
    nodeKey: {},
    // 是否与同级元素展示在同一行
    inline: {
      default: false
    },
    // 详见el-select
    multiple: {
      default: false
    },
    // 详见el-tree
    showCheckbox: {
      default: true
    },
    // 详见el-select
    placeholder: {
      default: '请选择'
    },
    // 详见el-tree
    checkStrictly: {
      default: true
    },
    // 是否可清空
    clearable: {
      default: false,
      type: Boolean
    },
    // 详见el-tree
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
