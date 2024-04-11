<!-- 获取验证字段 -->
<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    :confirm-working="isWorking"
    width="36%"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="图标名称" prop="name" required>
        <el-input
          v-model="form.name"
          placeholder="请输入图标名称"
          v-trim
        />
      </el-form-item>
      <el-form-item label="图标类型" prop="accessType" required>
        <DictSelect
          v-model="form.accessType"
          code="ICON_TYPES"
          placeholder="请选择图标类型"
          :clearable="true"
        />
        <FormItemTip>如为Element-Plus的图标，请选择CLASS</FormItemTip>
      </el-form-item>
      <el-form-item
        v-if="form.accessType === 'CLASS'"
        label="图标CLASS"
        prop="className"
        required
      >
        <el-input
          v-model="form.className"
          placeholder="请输入图标CLASS"
          v-trim
        />
        <FormItemTip>如为Element-Plus的图标，请直接输入组件名称，如Plus</FormItemTip>
      </el-form-item>
      <el-form-item
        v-else-if="form.accessType === 'URI'"
        label="网络路径"
        prop="uri"
        required
      >
        <el-input
          v-model="form.uri"
          placeholder="请输入网络路径"
          v-trim
        />
      </el-form-item>
      <el-form-item label="预览">
        <Icon :data="form" size="22px"/>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera.vue'
import { checkUrl <#noparse>}</#noparse> from '@/core/utils/form'

export default {
  name: 'OperaIconWindow',
  extends: BaseOpera,
  data () {
    return {
      // 表单数据
      form: {
        id: null,
        name: '',
        accessType: 'CLASS',
        className: 'iconfont ',
        uri: ''
      <#noparse>}</#noparse>,
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入图标名称' <#noparse>}</#noparse>
        ],
        accessType: [
          { required: true, message: '请选择图标类型' <#noparse>}</#noparse>
        ],
        className: [
          { required: true, message: '请输入图标CLASS' <#noparse>}</#noparse>
        ],
        uri: [
          { required: true, message: '请选择图标类型' <#noparse>}</#noparse>,
          { validator: checkUrl, message: '网络路径不正确' <#noparse>}</#noparse>
        ]
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      api: await import('@/api/system/icon'),
      'field.id': 'id'
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.el-form {
  :deep(.el-icon) {
    width: 1em !important;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
