<template>
  <div class="popover-cell-value">
    <!-- 完全展示 -->
    <p
      v-if="!withPopover"
      class="cell-value__content"
      :style="{ '-webkit-line-clamp': lineClamp <#noparse>}</#noparse>"
    >{{content<#noparse>}</#noparse><#noparse>}</#noparse></p>
    <!-- 部分展示 -->
    <el-popover
      v-else
      v-model="visible"
      popper-class="cell-value__popover"
      :trigger="trigger"
    >
      <div class="cell-value__content-wrap">
        <pre class="cell-value__content-wrap-main">{{formattedContent<#noparse>}</#noparse><#noparse>}</#noparse></pre>
        <div v-if="withOpera" class="cell-value__content-wrap-action">
          <slot name="buttons">
            <el-button
              size="small"
              type="primary"
              v-clipboard:copy="formattedContent"
              v-clipboard:success="copySuccess"
              v-clipboard:error="copyFailed"
              @click="confirm"
            >复制</el-button>
          </slot>
        </div>
      </div>
      <template #reference>
        <p
          class="cell-value__content"
          :style="{ '-webkit-line-clamp': lineClamp <#noparse>}</#noparse>"
        >{{content<#noparse>}</#noparse><#noparse>}</#noparse></p>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'PopoverCellValue',
  props: {
    // 内容
    content: {
      type: String,
      default: ''
    <#noparse>}</#noparse>,
    // 触发方式，同el-popover trigger
    trigger: {
      default: 'click'
    <#noparse>}</#noparse>,
    // 自动识别数据类型并格式化
    analyse: {
      type: Boolean,
      default: true
    <#noparse>}</#noparse>,
    // 是否包含操作按钮
    withOpera: {
      type: Boolean,
      default: true
    <#noparse>}</#noparse>,
    // 展示行数
    lineClamp: {
      default: 2
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
      visible: false,
      // 是否需要popover展示更多，通过计算获得值
      withPopover: false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  watch: {
    // 监听内容，变化后重新计算是否需要popover
    content () {
      this.$nextTick(() => {
        this.__calcWithPopover()
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    // 格式化后的内容
    formattedContent () {
      let content = this.content
      if (this.analyse) {
        try {
          content = JSON.stringify(JSON.parse(this.content), null, 2)
        <#noparse>}</#noparse> catch (e) {
          return content
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      return content
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    // 确认
    confirm () {
      this.visible = false
      this.$emit('confirm')
    <#noparse>}</#noparse>,
    // 取消
    cancel () {
      this.visible = false
      this.$emit('cancel')
    <#noparse>}</#noparse>,
    // 复制成功
    copySuccess () {
      this.$tip.success('复制成功')
    <#noparse>}</#noparse>,
    // 复制失败
    copyFailed () {
      this.$tip.error('复制失败')
    <#noparse>}</#noparse>,
    // 计算是否展示popover
    __calcWithPopover () {
      const p = this.$el.querySelector('.cell-value__content')
      this.withPopover = p.scrollHeight > p.clientHeight
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  mounted () {
    this.__calcWithPopover()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.popover-cell-value {
  width: 100%;
  // 内容部分，完全展示时的场景样式
  .cell-value__content {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
// popover内容
.popover-cell-value {
  // 内容部分，部分展示时的样式
  .cell-value__content {
    cursor: pointer;
    &:hover {
      text-decoration: underline!important;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
<style lang="scss">
.cell-value__popover {
  width: auto!important;
  max-width: 50%!important;
  .cell-value__content-wrap {
    width: 100%;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .cell-value__content-wrap-main {
      flex-grow: 1;
      width: 100%;
      overflow: auto;
      word-break: break-word;
      white-space: pre-wrap;
    <#noparse>}</#noparse>
    .cell-value__content-wrap-action {
      border-top: 1px solid #eee;
      padding-top: 10px;
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
