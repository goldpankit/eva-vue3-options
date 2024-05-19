<template>
  <el-upload
    class="attach-uploader"
    action="/api/oss/upload/attach"
    :accept="accept"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
  >
    <div v-if="modelValue" class="upload-info">
      <Icon :icon-class="iconClass"/>
      <p>{{filename}}</p>
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
    accept: {},
    // 图标
    iconClass: {
      default: 'iconfont icon-file1'
    },
    // 文件的fileKey
    modelValue: {},
    // 文件名称
    filename: {
      default: '文件已上传'
    }
  },
  methods: {
    // 处理文件上传成功
    handleUploadSuccess (res) {
      if (!res.success) {
        this.$tip.apiFailed(res)
        return
      }
      this.$emit('update:modelValue', res.data.fileKey)
      this.$emit('success', res.data)
    }
  }
}
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
    }
  }
  .attach-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
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
    }
    p {
      margin: 10px 0 0 0;
      color: var(--font-color-gray);
    }
  }
  .attach {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
