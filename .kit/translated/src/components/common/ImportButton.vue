<template>
  <div class="import-button">
    <el-button @click="$refs.importWindow.open(text)">{{text<#noparse>}</#noparse><#noparse>}</#noparse></el-button>
    <ImportWindow :action="action" :template-path="templatePath" :template-name="templateName" ref="importWindow" @success="handleSuccess"/>
  </div>
</template>

<script>
import ImportWindow from './ImportWindow'
export default {
  name: 'ImportButton',
  components: { ImportWindow <#noparse>}</#noparse>,
  props: {
    // 按钮文案
    text: {
      default: '导入'
    <#noparse>}</#noparse>,
    // 模版地址
    templatePath: {
      required: true
    <#noparse>}</#noparse>,
    // 下载后的模版文件名称
    templateName: {
      required: true
    <#noparse>}</#noparse>,
    // 导入接口地址
    action: {
      required: true
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    handleSuccess () {
      this.$emit('success')
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
