<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    :confirm-working="isWorking"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="角色编码" prop="code" required>
        <el-input v-model="form.code" placeholder="请输入角色编码" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="角色名称" prop="name" required>
        <el-input v-model="form.name" placeholder="请输入角色名称" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="角色备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入角色备注" :rows="5" show-word-limit v-trim maxlength="200"/>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
export default {
  name: 'OperaRoleWindow',
  extends: BaseOpera,
  data () {
    return {
      // 原角色码
      originRoleCode: '',
      // 表单数据
      form: {
        id: null,
        code: '',
        name: '',
        remark: ''
      },
      // 验证规则
      rules: {
        code: [
          { required: true, message: '请输入角色编码' }
        ],
        name: [
          { required: true, message: '请输入角色名称' }
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
          this.form[this.configData['field.id']] = null
        })
        return
      }
      // 编辑
      this.$nextTick(() => {
        this.originRoleCode = target.code
        for (const key in this.form) {
          this.form[key] = target[key]
        }
      })
    },
    /**
     * 确认
     */
    confirm () {
      if (this.form.id == null || this.form.id === '') {
        this.__confirmCreate()
        return
      }
      if (this.originRoleCode === this.form.code) {
        this.__confirmEdit()
        return
      }
      // 修改了角色编码
      this.$dialog.confirm('检测到您修改了角色编码，角色编码修改后前后端均可能需要调整代码，确认修改吗？', '提示', {
        confirmButtonText: '确认修改',
        type: 'warning'
      })
        .then(() => {
          this.__confirmEdit()
        })
    }
  },
  async created () {
    this.config({
      api: await import('@/api/system/role'),
    })
  }
}
</script>
