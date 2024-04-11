<!-- 获取验证字段 -->
<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    :confirm-working="isWorking"
    width="750px"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="配置编码" prop="code" required>
        <el-input
          v-model="form.code"
          placeholder="请输入配置编码"
          v-trim
        />
      </el-form-item>
      <el-form-item label="配置名称" prop="name" required>
        <el-input
          v-model="form.name"
          placeholder="请输入配置名称"
          v-trim
        />
      </el-form-item>
      <el-form-item label="值类型" prop="valueType" required>
        <DictSelect
          v-model="form.valueType"
          code="SYSTEM_CONFIG_VALUE_TYPES"
          placeholder="请选择值类型"
          :clearable="true"
        />
      </el-form-item>
      <el-form-item label="配置值" prop="value" required>
        <ConfigInput :type="form.valueType" v-model:value="form.value" placeholder="请输入配置值"/>
      </el-form-item>
      <el-form-item label="作用域" prop="scope" required>
        <DictSelect code="CONFIG_SCOPES" v-model="form.scope" placeholder="请选择配置作用域"/>
        <FormItemTip>系统配置会在启动或访问时一次性加载到服务端和客户端，以方便代码读取，通过作用域可控制加载范围！</FormItemTip>
      </el-form-item>
      <el-form-item label="权限标识码" prop="permission">
        <el-input
          v-model="form.permission"
          placeholder="请输入权限标识码"
          v-trim
          maxlength="100"
        />
        <FormItemTip>如配置需要权限控制，可输入权限标识符，并在角色管理中进行授权！</FormItemTip>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="3"
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
import BaseOpera from '@/components/base/BaseOpera.vue'
import ConfigInput from '@/components/system/config/ConfigInput'

export default {
  name: 'OperaSystemConfigWindow',
  components: { ConfigInput },
  extends: BaseOpera,
  data () {
    const _this = this
    return {
      // 表单数据
      form: {
        id: null,
        code: '',
        name: '',
        value: '',
        valueType: 'TEXT',
        scope: _this.$c('DEFAULT_CONFIG_SCOPE'),
        permission: '',
        remark: ''
      },
      // 验证规则
      rules: {
        code: [
          { required: true, message: '请输入配置编码' }
        ],
        name: [
          { required: true, message: '请输入配置名称' }
        ],
        value: [
          { required: true, message: '请输入配置值' }
        ],
        valueType: [
          { required: true, message: '请输入值类型' }
        ],
        scope: [
          { required: true, message: '请选择配置作用域' }
        ]
      }
    }
  },
  async created () {
    this.config({
      api: await import('@/api/system/config'),
      'field.id': 'id'
    })
  }
}
</script>
