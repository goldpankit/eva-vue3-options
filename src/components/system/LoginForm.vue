<template>
  <div class="login-form">
    <slot name="attention"></slot>
    <h1>系统登录&nbsp;/&nbsp;LOGIN IN</h1>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="username" required>
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          prefix-icon="UserFilled"
          maxlength="50"
          v-trim
        />
      </el-form-item>
      <el-form-item prop="password" required>
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          prefix-icon="Lock"
          maxlength="30"
          show-password
        />
      </el-form-item>
      <el-form-item prop="code" required>
        <div class="captcha-input">
          <el-input
            v-model="form.code"
            placeholder="图片验证码"
            maxlength="4"
            @keypress.enter="login"
          />
          <img
            v-if="!captcha.loading"
            :src="captcha.uri"
            alt="验证码"
            @click="refreshCaptcha"
          >
          <span v-else>
            <el-icon class="is-loading">
              <Loading />
            </el-icon>
          </span>
        </div>
      </el-form-item>
    </el-form>
    <div class="opera">
      <el-button :loading="loading" @click="login">登&nbsp;&nbsp;录</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getCaptcha, loginByPassword } from '@/api/system'

export default defineComponent({
  name: 'LoginForm',
  data () {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: '123123',
        code: 'any',
        uuid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        code: [
          { required: true, message: '请输入验证码' }
        ]
      },
      // 验证码
      captcha: {
        loading: false,
        uri: ''
      }
    }
  },
  methods: {
    /**
     * 登录
     */
    login () {
      if (this.loading) {
        return
      }
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.loading = true
        loginByPassword(this.form)
          .then(() => {
            this.$emit('success')
          })
          .catch(e => {
            this.refreshCaptcha()
            this.$tip.apiFailed(e)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha () {
      this.captcha.loading = true
      getCaptcha()
        .then(data => {
          this.captcha.uri = data.image
          this.form.uuid = data.uuid
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
        .finally(() => {
          setTimeout(() => {
            this.captcha.loading = false
          }, 150)
        })
    }
  },
  created () {
    this.refreshCaptcha()
  }
})
</script>

<style scoped lang="scss">
$input-gap: 30px;
.login-form {
  h1 {
    font-size: 35px;
    font-weight: 500;
    margin-bottom: 120px;
  }
  .el-form {
    margin-bottom: 60px;
    :deep(.el-form-item) {
      margin-bottom: $input-gap;
    }
    :deep(.el-input) {
      .el-input__wrapper {
        height: 46px;
        background: #F9F9F9;
        border: 1px solid transparent;
        box-shadow: 0 0 0 0;
        padding: 0;
        &.is-focus {
          border: 1px solid var(--color-primary) !important;
        }
        .el-input__inner {
          width: 100%;
          line-height: 46px;
          height: 46px;
          border-radius: 4px;
          padding: 0 15px;
        }
        // 输入框左侧图标样式
        .el-input__prefix {
          position: absolute;
          left: 6px;
          top: 0;
          color: #c0c4cc;
          .el-icon {
            margin: 0 5px;
          }
        }
        // 输入框右侧图标样式
        .el-input__suffix {
          position: absolute;
          height: 100%;
          right: 5px;
          top: 0;
          text-align: center;
          color: #c0c4cc;
          transition: all .3s;
          pointer-events: none;
          .el-icon {
            margin: 0 5px;
          }
        }
      }
    }
    :deep(.el-input--prefix) .el-input__inner{
      padding-left: 30px!important;
    }
    :deep(.el-input--suffix) .el-input__inner {
      padding-right: 30px!important;
    }
    // 验证码输入
    :deep(.captcha-input) {
      width: 100%;
      display: flex;
      height: 50px;
      .el-input {
        width: 100%;
      }
      & > span, & > img {
        width: 45%;
        height: 100%;
        flex-shrink: 0;
        margin-left: 16px;
      }
      & > span {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f7f7f7;
        border-radius: 8px;
      }
    }
  }
  .opera {
    .el-button {
      height: 50px;
      width: 100%;
      color: #fff;
      font-size: 16px;
      background: var(--login-button-background-color);
    }
  }
}
</style>
