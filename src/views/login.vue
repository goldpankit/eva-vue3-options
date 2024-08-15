<template>
  <div class="wrap">
    <div class="introduce">
      <h2>伊娃权限基础工程 V4.0</h2>
      <h3>清华海峡研究院高端装备技术研究中心研发，全职团队维护，开源免费，无版权！</h3>
    </div>
    <div class="login">
      <LoginForm @success="handleSuccess"/>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/system/LoginForm'

export default {
  name: 'Login',
  components: { LoginForm },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    /**
     * 登录成功
     */
    handleSuccess () {
      window.location.href = import.meta.env.VITE_APP_CONTEXT_PATH
    }
  },
  created () {
    this.message = import.meta.env.VITE_APP_TEST
  }
}
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  width: 100%;
  height: 100vh;
  background-image: url("../../public/images/login.jpg");
  background-repeat: no-repeat;
  background-size: auto 180%;
  background-clip: content-box;
  background-position: center;
  // 左边介绍
  .introduce {
    padding-left: 10%;
    padding-right: 50px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-size: 45px;
      font-style: italic;
      font-weight: 900;
      margin-top: 50px;
    }
    h3 {
      font-size: 35px;
      font-weight: 300;
      margin: 25px 0;
    }
  }
  // 右边登录
  .login {
    height: 100%;
    width: 45%;
    min-width: 700px;
    max-width: 800px;
    flex-shrink: 0;
    text-align: center;
    background: rgba(255, 255, 255, .99);
    padding: 0 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }
}
</style>
