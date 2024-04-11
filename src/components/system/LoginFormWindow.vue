<template>
  <el-dialog
    width="500px"
    :model-value="visible"
    append-to-body
    class="eva-dialog login-form-window"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :destroy-on-close="false"
    :show-close="false"
    @close="close"
  >
    <LoginForm @success="handleSuccess">
      <template #attention>
        <el-alert type="warning">您的登录信息已过期，请重新登录！</el-alert>
      </template>
    </LoginForm>
  </el-dialog>
</template>

<script>
import LoginForm from '@/components/system/LoginForm'
import { getUserInfo } from '@/api/system'

export default {
  name: 'LoginFormWindow',
  components: { LoginForm },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    /**
     * 打开窗口
     */
    open () {
      this.visible = true
    },
    /**
     * 关闭窗口
     * 关闭窗口时，移除DOM节点
     */
    close () {
      setTimeout(() => {
        const domWindow = document.querySelector('.login-form-window')
        if (domWindow != null) {
          const domOverlay = domWindow.parentNode.parentNode
          domOverlay.parentNode.removeChild(domOverlay)
        }
      }, 300)
    },
    /**
     * 登录成功
     * 登录成功后刷新当前登录用户信息
     */
    handleSuccess () {
      this.visible = false
      getUserInfo()
        .then(data => {
          this.$defaultStore.userInfo = data
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    }
  }
}
</script>

<style lang="scss">
.el-dialog.login-form-window {
  border-radius: 10px;
  overflow: hidden;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 50px;
    .el-alert .el-alert__description {
      margin-top: 0;
    }
    .login-form {
      h1 {
        margin-top: 30px;
        text-align: center;
        margin-bottom: 30px;
        font-size: 25px;
      }
    }
  }
  .el-dialog__footer {
    padding: 0;
  }
}
</style>
