<template>
  <div class="value">
    <el-icon v-if="data == null" class="is-loading" size="20">
      <Loading/>
    </el-icon>
    <slot v-else>{{getValue()}}{{suffix}}</slot>
  </div>
</template>

<script>
export default {
  name: 'Value',
  props: {
    data: {
      type: Object
    },
    prop: {
      type: String
    },
    suffix: {
      type: String
    },
    handler: {
      type: Function
    }
  },
  methods: {
    /**
     * 获取值
     *
     * @returns {string}
     */
    getValue () {
      if (this.data == null) {
        return ''
      }
      if (this.prop == null) {
        return this.data
      }
      const props = this.prop.split('.')
      let i = 0
      let value = this.data
      while (i < props.length) {
        value = value[props[i]]
        i++
      }
      if (this.handler == null) {
        return value
      }
      return this.handler(value)
    }
  }
}
</script>

<style scoped lang="scss">
.value {
  word-break: break-all;
  .el-icon {
    font-size: 16px;
    color: #999;
    position: relative;
    top: 1px;
  }
}
</style>
