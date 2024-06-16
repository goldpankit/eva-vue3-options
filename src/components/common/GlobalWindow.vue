<template>
  <el-drawer
    class="global-window"
    title="title"
    :model-value="visible"
    :with-header="true"
    :size="width"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="wrapperClosable"
    :append-to-body="true"
    @close="close"
  >
    <template #header>
      <div class="window__header">
        <span class="header__btn-back" @click="close">
          <el-icon><ArrowLeft/></el-icon>
        </span>
        {{title}}
      </div>
    </template>
    <div class="window__body">
      <slot></slot>
    </div>
    <div v-if="withFooter" class="window__footer">
      <slot name="footer">
        <el-button @click="confirm" :loading="confirmWorking" type="primary">{{confirmText}}</el-button>
        <el-button @click="close">{{cancelText}}</el-button>
      </slot>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'GlobalWindow',
  props: {
    width: {
      type: String,
      default: '36%'
    },
    // 是否包含底部操作
    withFooter: {
      type: Boolean,
      default: true
    },
    // 确认按钮loading状态
    confirmWorking: {
      type: Boolean,
      default: false
    },
    // 确认按钮文案
    confirmText: {
      default: '确定'
    },
    // 取消按钮文案
    cancelText: {
      default: '取消'
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示
    visible: {
      type: Boolean,
      required: true
    },
    // 按ESC是否关闭
    closeOnPressEscape: {
      default: false
    },
    // 点击遮罩层是否关闭
    wrapperClosable: {
      default: false
    }
  },
  methods: {
    /**
     * 确认
     */
    confirm () {
      this.$emit('confirm')
    },
    /**
     * 关闭
     */
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
// 输入框高度
$input-height: 32px;
.global-window {
  .el-drawer {
    min-width: 400px;
  }
  // 窗口返回按钮
  .header__btn-back {
    display: inline-block;
    width: 30px;
    background: var(--color-primary);
    color: #fff;
    text-align: center;
    margin-right: 12px;
    border-right: 1px solid #eee;
    height: 100%;
    .el-icon {
      position: relative;
      top: 2px;
    }
  }
  // 头部标题
  .el-drawer__header {
    padding: 0 10px 0 0!important;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .window__header {
      font-size: 14px;
    }
    .el-drawer__close-btn:focus {
      outline: none;
    }
  }
  // 主体
  .el-drawer__body {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    padding: 0;
    // 内容
    .window__body {
      height: 100%;
      overflow-y: auto;
      padding: 12px 16px;
      // 表单项
      .el-form-item {
        display: block;
      }
      // 标签
      .el-form-item__label {
        float: none;
      }
      // 元素宽度为100%
      .el-form-item__content{
        & > * {
          width: 100%;
        }
      }
      // 开关表单项
      .form-item-switch {
        .el-form-item__content > * {
          width: auto !important;
        }
        .switch-text {
          color: #999;
          margin-left: 6px;
          font-size: 13px;
          vertical-align: middle;
        }
      }
    }
    // 尾部
    .window__footer {
      user-select: none;
      border-top: 1px solid #eee;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
  }
  // 表单样式
  .window-search-form{
    .el-form-item{
      display: inline-flex!important;
      margin-right: 10px!important;
    }
    .table-search-form {
      padding: 0;
    }
    .window__body {
      background: #f7f7f7;
      .table-content {
        padding: 0;
        .table-wrap {
          padding: 0;
        }
      }
    }
  }
}
</style>
