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

export default {
  name: 'LoginFormWindow',
  components: { LoginForm },
  computed: {
    visible () {
      return this.$defaultStore.visibleLoginWindow
    }
  },
  methods: {
    /**
     * 关闭窗口
     * 关闭窗口时，移除DOM节点
     */
    close () {
      setTimeout(() => {
        this.$defaultStore.visibleLoginWindow = false
      }, 300)
    },
    /**
     * 登录成功
     * 登录成功后刷新当前登录用户信息
     */
    handleSuccess () {
      this.visible = false
      // 重置状态数据
      this.$defaultStore.$reset()
      // 刷新用户信息
      this.$defaultStore.refreshUserInfo()
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
