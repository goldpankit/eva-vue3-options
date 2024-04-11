<template>
  <el-upload
    class="attach-uploader"
    action="/api/oss/upload/attach"
    :accept="accept"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
  >
    <div v-if="value" class="upload-info">
      <Icon :icon-class="iconClass"/>
      <p>{{filename<#noparse>}</#noparse><#noparse>}</#noparse></p>
    </div>
    <el-icon v-else class="attach-uploader-icon">
      <Plus/>
    </el-icon>
  </el-upload>
</template>

<script>

export default {
  name: 'AttachUploader',
  props: {
    // 接受上传的文件类型，同el-uploader accept
    accept: {<#noparse>}</#noparse>,
    // 图标
    iconClass: {
      default: 'iconfont icon-file1'
    <#noparse>}</#noparse>,
    // 文件的fileKey
    value: {<#noparse>}</#noparse>,
    // 文件名称
    filename: {
      default: '文件已上传'
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    // 处理文件上传成功
    handleUploadSuccess (res) {
      if (!res.success) {
        this.$tip.apiFailed(res)
        return
      <#noparse>}</#noparse>
      this.$emit('input', res.data.fileKey)
      this.$emit('success', res.data)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.attach-uploader {
  background-color: var(--background-color);
  :deep(.el-upload) {
    border: 1px dashed #eee;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease .15s;
    &:hover {
      border-color: #409EFF;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  .attach-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  <#noparse>}</#noparse>
  .upload-info {
    height: 178px;
    width: 178px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 45px !important;
      color: var(--font-color-gray-deep);
    <#noparse>}</#noparse>
    p {
      margin: 10px 0 0 0;
      color: var(--font-color-gray);
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  .attach {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
