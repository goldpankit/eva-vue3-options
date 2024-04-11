<template>
  <GlobalWindow
    v-model:visible="visible"
    :confirm-working="isWorking"
    width="576px"
    title="重置密码"
    @confirm="confirm"
  >
    <p class="tip" v-if="user != null">为用户 <em>{{user.realName<#noparse>}</#noparse><#noparse>}</#noparse></em> 重置密码</p>
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="新密码" prop="password" required>
        <el-input v-model="form.password" type="password" placeholder="请输入新密码" maxlength="30" show-password></el-input>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import { resetPwd <#noparse>}</#noparse> from '@/api/system/user'
export default {
  name: 'ResetPwdWindow',
  data () {
    return {
      isWorking: false,
      visible: false,
      user: null,
      form: {
        password: ''
      <#noparse>}</#noparse>,
      rules: {
        password: [
          { required: true, message: '请输入密码' <#noparse>}</#noparse>
        ]
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 打开窗口
     *
     * @param user 目标用户
     */
    open (user) {
      this.user = user
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 确认重置密码
     */
    confirm () {
      if (this.isWorking) {
        return
      <#noparse>}</#noparse>
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        <#noparse>}</#noparse>
        this.isWorking = true
        resetPwd({
          id: this.user.id,
          password: this.form.password
        <#noparse>}</#noparse>)
          .then(() => {
            this.$tip.apiSuccess('密码重置成功')
            this.visible = false
            this.$emit('success')
          <#noparse>}</#noparse>)
          .catch(e => {
            this.$tip.apiFailed(e)
          <#noparse>}</#noparse>)
          .finally(() => {
            this.isWorking = false
          <#noparse>}</#noparse>)
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
// 角色配置
.global-window {
  .tip {
    margin-bottom: 12px;
    em {
      font-style: normal;
      color: var(--color-primary);
      font-weight: bold;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
