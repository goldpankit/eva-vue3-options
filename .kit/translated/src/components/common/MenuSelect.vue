<template>
  <TreeSelect
    :placeholder="placeholder"
    :value="value"
    :data="data"
    :append-to-body="appendToBody"
    :clearable="clearable"
    :inline="inline"
    @input="$emit('input', $event)"
  />
</template>

<script>
import TreeSelect from './TreeSelect'
import { fetchTree <#noparse>}</#noparse> from '@/api/system/menu'
export default {
  name: 'MenuSelect',
  components: { TreeSelect <#noparse>}</#noparse>,
  props: {
    value: {<#noparse>}</#noparse>,
    inline: {
      default: true
    <#noparse>}</#noparse>,
    placeholder: {
      default: '请选择菜单'
    <#noparse>}</#noparse>,
    // 是否可清空
    clearable: {
      default: false
    <#noparse>}</#noparse>,
    appendToBody: {
      default: false
    <#noparse>}</#noparse>,
    // 需被排除的部门ID
    excludeId: {<#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
      data: []
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  watch: {
    excludeId () {
      this.fetchData()
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    // 获取所有菜单
    fetchData () {
      fetchTree()
        .then(records => {
          this.data = []
          this.__fillData(this.data, records)
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    // 填充菜单树
    __fillData (list, pool) {
      for (const menu of pool) {
        if (menu.id === this.excludeId) {
          continue
        <#noparse>}</#noparse>
        const menuNode = {
          id: menu.id,
          label: menu.name
        <#noparse>}</#noparse>
        list.push(menuNode)
        if (menu.children != null && menu.children.length > 0) {
          menuNode.children = []
          this.__fillData(menuNode.children, menu.children)
          if (menuNode.children.length === 0) {
            menuNode.children = undefined
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  created () {
    this.fetchData()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
