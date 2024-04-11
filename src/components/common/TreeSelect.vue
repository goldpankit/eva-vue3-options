<template>
  <el-tree-select
    :class="{inline}"
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
    }
  },
  props: {
    inline: {
      default: false
    },
    multiple: {
      default: false
    },
    flat: {
      default: false
    },
    value: {},
    placeholder: {
      default: '请选择'
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
  },
  methods: {
    // 复选框勾选
    checkChange (val) {
      if (!this.multiple) return
      this.$emit('update:value', val)
    },
    change (val) {
      if (this.multiple) return
      this.$emit('update:value', val)
    },
    // 多选框删除tag
    deleteCheck (val) {
      this.$emit('update:delete', val)
    }
  }
}
</script>

<style scoped lang="scss">
.inline {
  width: 178px;
}
</style>
