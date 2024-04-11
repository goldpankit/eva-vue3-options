<template>
  <el-select
    class="role-select"
    :class="{select__block: !inline<#noparse>}</#noparse>"
    :value="value"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  >
    <el-option v-for="role in roles" :key="role.id" :value="role.id" :label="role.name"/>
  </el-select>
</template>

<script>
import { fetchAll <#noparse>}</#noparse> from '@/api/system/role'

export default {
  name: 'RoleSelect',
  props: {
    value: {<#noparse>}</#noparse>,
    placeholder: {
      default: '请选择角色'
    <#noparse>}</#noparse>,
    inline: {
      default: true
    <#noparse>}</#noparse>,
    disabled: {<#noparse>}</#noparse>,
    clearable: {
      default: false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
      roles: []
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  created () {
    fetchAll()
      .then(data => {
        this.roles = data
      <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
<style lang="scss" scoped>
  .select__block {
    display: block;
  <#noparse>}</#noparse>
</style>
