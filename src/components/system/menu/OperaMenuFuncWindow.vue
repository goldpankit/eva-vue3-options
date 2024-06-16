<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    width="750px"
    :confirm-working="isWorking.create"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="功能名称" prop="name" required>
        <el-input
          v-model="form.name"
          placeholder="请输入功能名称"
          v-trim
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="权限标识码" prop="permission" required>
        <el-input
          v-model="form.permission"
          placeholder="请输入权限标识码"
          v-trim
          maxlength="100"
        />
        <FormItemTip>权限标识符为全局唯一的字符串。</FormItemTip>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.remark"
          placeholder="请输入备注"
          v-trim
          show-word-limit
          maxlength="200"
        />
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
export default {
  name: 'OperaMenuFuncWindow',
  extends: BaseOpera,
  data () {
    return {
      // 表单数据
      form: {
        id: null,
        menuId: null,
        name: '',
        permission: '',
        remark: ''
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入功能名称' }
        ],
        permission: [
          { required: true, message: '请输入权限标识码' }
        ]
      }
    }
  },
  methods: {
    /**
     * 打开窗口
     *
     * @param title 窗口标题
     * @param menuId 所属菜单ID
     * @param target 行对象（仅编辑需该参数）
     */
    open (title, menuId, target) {
      this.title = title
      this.visible = true
      // 新建
      if (target == null) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = null
          this.form.menuId = menuId
        })
        return
      }
      // 编辑
      this.$nextTick(() => {
        for (const key in this.form) {
          this.form[key] = target[key]
        }
      })
    }
  },
  async created () {
    this.config({
      api: await import('@/api/system/menu.func')
    })
  }
}
</script>

<style scoped lang="scss">
.form-item-status {
  .el-form-item__content > * {
    width: auto !important;
  }
  .status-text {
    color: #999;
    margin-left: 6px;
    font-size: 13px;
    vertical-align: middle;
  }
}
</style>
