<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    width="750px"
    :confirm-working="isWorking"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="字典编码" prop="code" required>
        <el-input
          v-model="form.code"
          placeholder="请输入字典编码"
          v-trim
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="字典名称" prop="name" required>
        <el-input
          v-model="form.name"
          placeholder="请输入字典名称"
          v-trim
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="作用域" prop="scope" required>
        <DictSelect
          v-model="form.scope"
          code="DICT_SCOPES"
          placeholder="请选择字典作用域"
        />
        <FormItemTip>作用域用于控制字典的使用范围</FormItemTip>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注"
          :rows="5"
          show-word-limit
          v-trim
          maxlength="200"
        />
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
export default {
  name: 'OperaDictWindow',
  extends: BaseOpera,
  data () {
    const _this = this
    return {
      // 表单数据
      form: {
        id: null,
        code: '',
        name: '',
        scope: _this.$c('DEFAULT_DICT_SCOPE'),
        remark: ''
      },
      // 验证规则
      rules: {
        code: [
          { required: true, message: '请输入字典编码' }
        ],
        name: [
          { required: true, message: '请输入字典名称' }
        ]
      }
    }
  },
  async created () {
    this.config({
      api: await import('@/api/system/dict')
    })
  }
}
</script>
