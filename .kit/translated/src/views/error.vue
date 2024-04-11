<template>
  <div class="error-page">
    <div>
      <!-- 无权访问 -->
      <template v-if="errorType === 'not-allowed'">
        <div class="message not-allowed">
          <img alt="无权访问" src="../../public/images/system/not-allowed.png">
          <h1>无权访问</h1>
          <p>您的账号尚未配置访问菜单或访问权限，请联系系统管理员！</p>
          <el-button @click="logout" type="primary">退出系统</el-button>
        </div>
      </template>
      <!-- 找不到网页 -->
      <template v-else-if="errorType === 'not-found'">
        <div class="message">
          <img alt="找不到网页" src="../../public/images/system/404.png">
          <h1>找不到网页</h1>
          <div class="opera">
            <el-button @click="$router.back()">返回</el-button>
            <el-button type="primary" @click="$router.push({ name: 'index' <#noparse>}</#noparse>)">前往首页</el-button>
          </div>
        </div>
        <div class="suggestion">
          <h2>你可以尝试以下操作</h2>
          <p>1. 如果是手动更改的网页地址，请检查网页地址是否正确</p>
          <p>2. 点击【返回】按钮刷新页面后重试</p>
          <p>3. 联系系统管理员</p>
        </div>
      </template>
      <!-- 客户端配置加载失败 -->
      <template v-else-if="errorType === 'config-load-failed'">
        <div class="message">
          <h1>系统配置加载失败</h1>
          <div class="opera">
            <el-button @click="$router.back()">返回</el-button>
            <el-button type="primary" @click="$router.push({ name: 'index' <#noparse>}</#noparse>)">前往首页</el-button>
          </div>
        </div>
        <div class="suggestion">
          <h2>你可以尝试以下操作</h2>
          <p>1. 刷新页面</p>
          <p>2. 检查网络是否正常</p>
          <p>3. 联系系统管理员</p>
        </div>
      </template>
      <!-- 未知错误 -->
      <template v-else>
        <div class="left">
          <img src="../../public/images/system/error.png" alt="未知错误">
          <p>系统出现未知错误，请联系系统管理员！</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { logout <#noparse>}</#noparse> from '@/api/system'

export default {
  name: 'Error',
  data () {
    return {
      errorType: null
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 退出登录
     */
    logout () {
      logout()
        .then(() => {
          this.$defaultStore.userInfo = null
          this.$router.push({ name: 'login' <#noparse>}</#noparse>)
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  created () {
    this.errorType = this.$route.params.type
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.error-page {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    margin-top: -100px;
    display: flex;
  <#noparse>}</#noparse>
  .message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 26px;
    <#noparse>}</#noparse>
    .opera {
      margin-top: 30px;
    <#noparse>}</#noparse>
    &.not-allowed {
      h1 {
        font-size: 22px;
        margin-top: 5px;
      <#noparse>}</#noparse>
      img {
        width: 50px;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  .suggestion {
    width: 450px;
    height: 235px;
    text-align: left;
    margin-top: 16px;
    margin-left: 40px;
    padding: 30px 50px;
    border-radius: 16px;
    background: url("../../public/images/system/suggestion.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    h2 {
      font-size: 16px;
      margin-bottom: 16px;
    <#noparse>}</#noparse>
    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 26px;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
