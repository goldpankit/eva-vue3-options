<template>
  <div class="rich-editor">
    <Toolbar
      :editor="instance"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height <#noparse>}</#noparse>"
      :value="value"
      :defaultConfig="{
        placeholder: this.placeholder,
        ...this.editorConfig
      <#noparse>}</#noparse>"
      :mode="mode"
      @onChange="$emit('update:value', $event.getHtml())"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script>
import { Toolbar, Editor <#noparse>}</#noparse> from '@wangeditor/editor-for-vue'
export default {
  name: 'RichEditor',
  components: {
    Toolbar,
    Editor
  <#noparse>}</#noparse>,
  props: {
    // 值
    value: {
      type: String,
      required: true
    <#noparse>}</#noparse>,
    // 编辑器高度
    height: {
      default: null
    <#noparse>}</#noparse>,
    // 输入提示文案
    placeholder: {
      default: '请输入'
    <#noparse>}</#noparse>,
    // 编辑器模式
    mode: {
      default: 'simple'
    <#noparse>}</#noparse>,
    // 工具栏配置，详见https://www.wangeditor.com/v5/toolbar-config.html#toolbarkeys
    toolbarConfig: {
      type: Object,
      default () {
        return {<#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    // 编辑器配置
    editorConfig: {
      type: Object,
      default () {
        return {<#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
      instance: null
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    handleCreated (editor) {
      this.instance = Object.seal(editor)
      this.$emit('created', editor)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  // 组件销毁时，销毁编辑器
  beforeUnmount () {
    if (this.instance == null) {
      return
    <#noparse>}</#noparse>
    this.instance.destroy()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.rich-editor {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & > div {
    // 工具栏
    &:first-of-type {
      flex-shrink: 0;
      border-bottom: 1px solid #e0e0e0;
    <#noparse>}</#noparse>
    // 编辑器
    &:last-of-type {
      flex-grow: 1;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
