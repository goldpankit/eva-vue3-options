<template>
  <!-- 新建/修改 -->
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    :confirm-working="isWorking"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="form.username" placeholder="请输入用户名" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="姓名" prop="realName" required>
        <el-input v-model="form.realName" placeholder="请输入姓名" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender" required>
        <DictRadioGroup v-model="form.gender" code="GENDERS"/>
      </el-form-item>
      <el-form-item v-if="form.id == null" label="登录密码" prop="password" required>
        <el-input v-model="form.password" type="password" placeholder="请输入登录密码" maxlength="30" show-password/>
      </el-form-item>
      <el-form-item label="工号" prop="empNo">
        <el-input v-model="form.empNo" placeholder="请输入工号" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号码" v-trim maxlength="11"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" v-trim maxlength="100"/>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker v-model="form.birthday" value-format="YYYY/MM/DD" placeholder="请选择用户生日"/>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
import { checkMobile, checkEmail } from '@/core/utils/form'

export default {
  name: 'OperaUserWindow',
  extends: BaseOpera,
  data () {
    const _this = this
    return {
      // 表单数据
      form: {
        id: null,
        username: '', // 用户名
        realName: '', // 姓名
        empNo: '', // 工号
        avatar: '/avatar/man.png', // 头像
        password: '', // 密码
        mobile: '', // 手机号码
        email: '', // 邮箱
        gender: _this.$c('DEFAULT_USER_GENDER'), // 性别
        birthday: '' // 生日
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        realName: [
          { required: true, message: '请输入姓名' }
        ],
        password: [
          { required: true, message: '请输入登录密码' }
        ],
        avatar: [
          { required: true, message: '请选择用户头像' }
        ],
        sex: [
          { required: true, message: '请选择用户性别' }
        ],
        mobile: [
          { validator: checkMobile }
        ],
        email: [
          { validator: checkEmail }
        ]
      }
    }
  },
  methods: {
    /**
     * 打开窗口
     *
     * @param title 窗口标题
     * @param target 行对象（仅编辑需该参数）
     */
    open (title, target) {
      this.title = title
      this.visible = true
      // 新建
      if (target == null) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = null
        })
        return
      }
      // 编辑
      this.$nextTick(() => {
        for (const key in this.form) {
          this.form[key] = target[key]
        }
      })
    },
    /**
     * 覆盖获取新增编辑表单对象，实现根据性别填充头像
     *
     * @returns {*}
     * @private
     */
    __getForm () {
      this.form.avatar = '/avatar/man.png'
      if (this.form.gender === 'FEMALE') {
        this.form.avatar = '/avatar/woman.png'
      }
      return this.form
    }
  },
  async created () {
    this.config({
      api: await import ('@/api/system/user')
    })
  }
}
</script>

<style lang="scss" scoped>
.global-window {
  :deep(.el-date-editor) {
    width: 100%;
  }
  // 表单头像处理
  :deep(.form-item-avatar) {
    .el-radio.is-bordered {
      height: auto;
      padding: 6px;
      margin: 0 10px 0 0;
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        padding: 0;
        width: 48px;
        display: block;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
