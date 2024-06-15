<template>
  <ul class="colors-marking">
    <li
      v-for="item in computedData"
      :key="item.label"
    >
      <span
        :style="`border: 1px solid <#noparse>${</#noparse>item.borderColor<#noparse>}</#noparse>; background-color: <#noparse>${</#noparse>item.backgroundColor<#noparse>}</#noparse>`"
      ></span>
      <label>{{ item.label <#noparse>}</#noparse><#noparse>}</#noparse></label>
    </li>
  </ul>
</template>

<script>
import BaseComponent from '@/components/BaseComponent'

export default {
  name: 'ColorsMarking',
  extends: BaseComponent,
  props: {
    data: {
      required: true
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    computedData () {
      return this.computeProp('data')
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.colors-marking {
  padding: 10px 16px;
  display: flex;
  & > li {
    font-size: 13px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    & > span {
      display: inline-block;
      content: '';
      width: 36px;
      height: 14px;
      margin-right: 6px;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
