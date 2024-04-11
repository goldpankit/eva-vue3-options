<template>
  <el-upload
    class="avatar-uploader"
    action="/api/oss/upload/image"
    accept=".jpg,.jpeg,.png"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
  >
    <img v-if="value" :src="$getImageURL(value)" class="avatar" alt="头像">
    <el-icon v-else class="avatar-uploader-icon">
      <Plus/>
    </el-icon>
  </el-upload>
</template>

<script>

export default {
  name: 'AvatarUploader',
  props: {
    // 头像fileKey
    value: {}
  },
  computed: {},
  methods: {
    // 处理头像上传成功
    handleUploadSuccess (res) {
      if (!res.success) {
        this.$tip.apiFailed(res)
        return
      }
      this.$emit('input', res.data.fileKey)
      this.$emit('success', res.data)
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
