<template>
  <el-form
    class="collapse-form"
    :class="{'collapse__hidden': !showMore}"
    :style="{ 'padding-right': !showMore ? buttonsWidth : 0 }"
    ref="form"
    :model="model"
    :label-width="labelWidth"
    inline
    @submit.prevent
  >
    <slot></slot>
    <section>
      <slot name="buttons"></slot>
      <template v-if="collapse">
        <el-button
          v-if="!showMore"
          type="primary"
          @click="showMore = true"
          link
        >展开
          <el-icon><ArrowDown/></el-icon>
        </el-button>
        <el-button
          v-else
          @click="showMore = false"
          link
        >收起
        <el-icon><ArrowUp/></el-icon>
        </el-button>
      </template>
    </section>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    // 表单数据对象
    model: {},
    // 字段长度
    labelWidth: {
      default: '100px'
    },
    // 是否需要展开/收起
    collapse: {
      default: false
    },
    // 按钮占据的宽度
    buttonsWidth: {
      default: '215px'
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  methods: {
    // 重置字段值
    resetFields () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.collapse-form {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  // 操作按钮
  section {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    align-items: center;
    .el-button {
      i {
        margin-left: 3px;
      }
    }
  }
  // 表单样式
  :deep(.el-form-item__content) {
    min-width: 192px!important;
  }
  // 隐藏状态
  &.collapse__hidden {
    height: 50px;
    overflow: hidden;
    section {
      width: 215px;
      position: absolute;
      margin-bottom: 20px;
      top: 0;
      right: 0;
    }
  }
}
</style>
