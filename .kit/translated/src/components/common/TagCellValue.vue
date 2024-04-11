<template>
  <ul class="tag-cell-value">
    <li
      v-for="(item, index) in data"
      :key="index"
      :style="getTagStyle(item)"
    >
      {{getLabel(item)<#noparse>}</#noparse><#noparse>}</#noparse>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'TagCellValue',
  props: {
    // 数据
    data: {
      type: Array,
      required: true
    <#noparse>}</#noparse>,
    // 标签key，将采用指定字段读取对象中的数据
    labelKey: {
      type: [String, Function]
    <#noparse>}</#noparse>,
    // 标签样式处理器
    tagStyle: {
      type: Function,
      default () {
        return () => {
          return {
            background: '#f5f7fa',
            color: '#555'
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    // 获取标签key
    getLabelKey (item) {
      return this.__calcPropValue('labelKey', item)
    <#noparse>}</#noparse>,
    // 获取值
    getLabel (item) {
      const labelKey = this.getLabelKey(item)
      if (labelKey) {
        return item[labelKey]
      <#noparse>}</#noparse>
      return item
    <#noparse>}</#noparse>,
    // 获取标签样式
    getTagStyle (item) {
      return this.__calcPropValue('tagStyle', item)
    <#noparse>}</#noparse>,
    // 计算属性值
    __calcPropValue (propName, item) {
      if (typeof this[propName] === 'function') {
        return this[propName](item)
      <#noparse>}</#noparse>
      return this[propName]
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.tag-cell-value {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 3px;
  li {
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 3px;
    padding: 2px 5px;
    border: 1px solid var(--tag-border-color);
    border-radius: 4px;
    background: var(--tag-background-color);
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
