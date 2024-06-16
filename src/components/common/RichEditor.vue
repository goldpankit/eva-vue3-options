<template>
  <div class="rich-editor">
    <Toolbar
      v-if="withToolbar"
      :editor="instance"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height }"
      :modelValue="modelValue"
      :defaultConfig="{
        placeholder: this.placeholder,
        ...this.editorConfig
      }"
      :mode="mode"
      @onChange="$emit('update:modelValue', $event.getHtml())"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script>
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
export default {
  name: 'RichEditor',
  components: {
    Toolbar,
    Editor
  },
  props: {
    // 值
    modelValue: {
      type: String,
      required: true
    },
    // 编辑器高度
    height: {
      default: null
    },
    // 输入提示文案
    placeholder: {
      default: '请输入'
    },
    // 编辑器模式
    mode: {
      default: 'simple'
    },
    // 是否展示工具栏
    withToolbar: {
      default: true
    },
    // 工具栏配置，详见https://www.wangeditor.com/v5/toolbar-config.html#toolbarkeys
    toolbarConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    // 编辑器配置
    editorConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      instance: null
    }
  },
  methods: {
    handleCreated (editor) {
      this.instance = Object.seal(editor)
      this.$emit('created', editor)
    }
  },
  // 组件销毁时，销毁编辑器
  beforeUnmount () {
    if (this.instance == null) {
      return
    }
    this.instance.destroy()
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.rich-editor {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & > div {
    // 工具栏
    &:first-of-type {
      flex-shrink: 0;
      border-bottom: 1px solid #e0e0e0;
    }
    // 编辑器
    &:last-of-type {
      flex-grow: 1;
    }
  }
}
</style>
