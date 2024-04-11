<template>
  <el-dialog
    width="500px"
    :title="title"
    v-model="visible"
    append-to-body
    class="eva-dialog import-window"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-upload
      drag
      :show-file-list="false"
      action="none"
      accept=".xlsx"
      :before-upload="handleBeforeUpload"
    >
      <template v-if="form.file == null">
        <el-icon>
          <UploadFilled/>
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else>
        <el-icon>
          <Files/>
        </el-icon>
        <div class="el-upload__text">{{form.file.name<#noparse>}</#noparse><#noparse>}</#noparse><em></em></div>
      </template>
    </el-upload>
    <template #footer>
      <div class="import-window__footer">
        <div class="sync-exists">
          <el-checkbox v-model="form.sync"/><span>同步已存在的数据</span>
        </div>
        <div class="opera">
          <el-button type="primary" icon="Download" @click="downloadTemplate" link>下载模版</el-button>
          <el-button @click="cancel">{{cancelText<#noparse>}</#noparse><#noparse>}</#noparse></el-button>
          <el-button type="primary" @click="confirm" :loading="isWorking">{{confirmText<#noparse>}</#noparse><#noparse>}</#noparse></el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import request from '@/core/utils/request'
import { downloadLocalFile <#noparse>}</#noparse> from '@/api/system'
export default {
  name: 'ImportWindow',
  props: {
    // 导入接口地址
    action: {
      required: true
    <#noparse>}</#noparse>,
    // 确认按钮文案
    confirmText: {
      type: String,
      default: '导入'
    <#noparse>}</#noparse>,
    // 取消按钮文案
    cancelText: {
      type: String,
      default: '取消'
    <#noparse>}</#noparse>,
    // 模版地址
    templatePath: {
      required: true
    <#noparse>}</#noparse>,
    // 下载后的模版文件名称
    templateName: {
      required: true
    <#noparse>}</#noparse>,
    // 额外的上传参数
    data: {
      required: false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
      visible: false,
      isWorking: false,
      title: '导入数据',
      form: {
        sync: false,
        file: false
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 打开窗口
     *
     * @param title 窗口标题
     */
    open (title) {
      this.visible = true
      this.title = title
      this.form.sync = false
      this.form.file = null
    <#noparse>}</#noparse>,
    /**
     * 确定导入
     */
    confirm () {
      if (this.form.file == null) {
        this.$tip.warning('请选择文件')
        return
      <#noparse>}</#noparse>
      this.isWorking = true
      const param = new FormData()
      param.set('file', this.form.file)
      param.set('sync', this.form.sync)
      for (const key in this.data) {
        param.set(key, this.data[key])
      <#noparse>}</#noparse>
      request.post(this.action, param, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8'
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>)
        .then(data => {
          this.$tip.success('导入成功，共导入' + data + '条记录')
          this.visible = false
          this.$emit('success')
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
        .finally(() => {
          this.isWorking = false
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 取消
     */
    cancel () {
      this.visible = false
    <#noparse>}</#noparse>,
    /**
     * 下载模版
     */
    downloadTemplate () {
      downloadLocalFile({
        path: this.templatePath,
        name: this.templateName
      <#noparse>}</#noparse>)
        .then(data => {
          this.$download(data)
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 文件上传前存储上传的文件
     *
     * @param file 需导入的文件
     */
    handleBeforeUpload (file) {
      this.form.file = file
      return false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style lang="scss">
.import-window {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      .el-icon {
        font-size: 67px;
        color: #C0C4CC;
        margin: 40px 0 16px;
        line-height: 50px;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  .import-window__footer {
    display: flex;
    .sync-exists {
      width: 200px;
      flex-shrink: 0;
      text-align: left;
      font-size: 13px;
      display: flex;
      align-items: center;
      .el-checkbox {
        margin-right: 10px;
      <#noparse>}</#noparse>
      & > * {
        vertical-align: middle;
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
    .opera {
      flex-grow: 1;
      a {
        font-size: 12px;
        margin-right: 10px;
        text-decoration: none;
        .el-icon-download {
          font-size: 15px;
          position: relative;
          top: 2px;
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
