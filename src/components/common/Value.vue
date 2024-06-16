<template>
  <div class="value">
    <el-icon v-if="data == null || data[prop] == null" class="is-loading" :size="iconSize">
      <Loading/>
    </el-icon>
    <slot v-else :value="getValue()" :prefix="prefix" :suffix="suffix">
      <span class="value-prefix">{{ prefix }}</span>
      <span class="value-data">{{ getValue() }}</span>
      <span class="value-suffix">{{ suffix }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Value',
  props: {
    // 图标大小
    iconSize: {
      default: '20px;'
    },
    // 数据所在对象引用
    data: {
      type: Object
    },
    // 数据字段名称
    prop: {
      type: String
    },
    // 前缀
    prefix: {
      type: String
    },
    // 后缀
    suffix: {
      type: String
    },
    // 处理器
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
  .value-prefix, .value-suffix {
    font-size: 12px;
    color: #999;
  }
  .value-prefix {
    margin-right: 3px;
  }
  .value-suffix {
    margin-left: 3px;
  }
}
</style>
