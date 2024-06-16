<template>
  <div class="import-button">
    <el-button :type="type" @click="$refs.importWindow.open(title)"><slot>导入</slot></el-button>
    <ImportWindow :action="action" :template-path="templatePath" :template-name="templateName" ref="importWindow" @success="handleSuccess"/>
  </div>
</template>

<script>
import ImportWindow from './ImportWindow'
export default {
  name: 'ImportButton',
  components: { ImportWindow },
  props: {
    // type，同el-button type
    type: {
      default: 'primary'
    },
    // 导入窗口文案
    title: {
      default: '导入Excel数据'
    },
    // 模版文件存放地址（后端提供，路径从files开始）
    templatePath: {
      required: true
    },
    // 下载后的模版文件名称
    templateName: {
      required: true
    },
    // 导入接口地址
    action: {
      required: true
    }
  },
  methods: {
    handleSuccess () {
      this.$emit('success')
    }
  }
}
</script>
