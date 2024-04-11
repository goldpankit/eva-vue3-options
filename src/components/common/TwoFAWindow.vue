<template>
  <el-dialog
    :width="width"
    :title="title"
    :model-value="visible"
    append-to-body
    class="eva-dialog two-fa-window"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :show-close="false"
  >
    <slot name="beforeForm"><p class="two-fa-window__message">{{message}}</p></slot>
    <el-form ref="form" :model="form" :rules="rules" inline>
      <el-form-item label="登录密码" prop="password" label-width="85px" required>
        <PasswordInput v-model="form.password" />
      </el-form-item>
    </el-form>
    <slot name="afterForm"></slot>
    <template #footer>
      <div class="two-fa-window__footer">
        <div class="remember-pwd">
          <el-checkbox v-model="form.rememberPwd"/><span>记住密码</span>
        </div>
        <div class="opera">
          <el-button @click="cancel" :disabled="isWorking">{{cancelText}}</el-button>
          <el-button type="primary" @click="confirm" :loading="isWorking">{{confirmText}}</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import PasswordInput from './PasswordInput'
export default {
  name: 'TwoFAWindow',
  emits: ['confirm'],
  components: { PasswordInput },
  props: {
    // 标题
    title: {
      type: String,
      default: '安全验证'
    },
    // 消息内容
    message: {
      type: String,
      required: false
    },
    // 确认按钮文案
    confirmText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文案
    cancelText: {
      type: String,
      default: '取消'
    },
    // 宽度
    width: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      visible: true,
      isWorking: false,
      // 请求对象
      request: null,
      // 请求方式
      method: null,
      // 请求参数
      requestArguments: null,
      // 表单
      form: {
        password: '',
        rememberPwd: false
      },
      // 表单验证规则
      rules: {
        password: { required: true, message: '请输入登录密码' }
      }
    }
  },
  methods: {
    /**
     * 打开窗口（通常情况下由2FA机制自动调用）
     */
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    /**
     * 确定
     */
    confirm () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        // 记住密码，则将密码存放到缓存中（Store缓存）
        if (this.form.rememberPwd) {
          this.$cache.memory.set('2fa-password', this.form.password)
        }
        this.$bus.emit('confirm', this.form)
      })
    },
    /**
     * 取消
     */
    cancel () {
      this.$bus.emit('cancel')
      this.close()
    },
    /**
     * 关闭窗口
     */
    close () {
      this.visible = false
      setTimeout(() => {
        const domWindow = document.querySelector('.two-fa-window')
        if (domWindow != null) {
          const domOverlay = domWindow.parentNode.parentNode
          domOverlay.parentNode.removeChild(domOverlay)
        }
      }, 300)
      // 删除事件
      this.$bus.delete(['confirm', 'cancel'])
    }
  }
}
</script>

<style scoped lang="scss">
.two-fa-window {
  // 提示消息
  .two-fa-window__message {
    margin: 0 0 10px 0;
  }
  // 底部操作
  .two-fa-window__footer {
    display: flex;
    .remember-pwd {
      width: 100px;
      flex-shrink: 0;
      text-align: left;
      font-size: 13px;
      display: flex;
      align-items: center;
      .el-checkbox {
        margin-right: 10px;
      }
      & > * {
        vertical-align: middle;
      }
    }
    .opera {
      flex-grow: 1;
    }
    .el-form--inline,.el-form-item {
      margin-right: 10px;
    }
  }
}

</style>
