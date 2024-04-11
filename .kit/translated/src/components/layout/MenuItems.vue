<template>
  <el-menu-item
    v-if="menu.children == null || menu.children.length == 0"
    :key="menu.index"
    :index="menu.index"
  >
    <Icon v-if="menu.icon != null" :data="menu.icon"/>
    <template #title>
      <span>{{menu.name<#noparse>}</#noparse><#noparse>}</#noparse></span>
    </template>
    <!-- 圆弧 -->
    <svg class="radius-top" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38" height="38" viewBox="0 0 38 38" fill="none"><path fill-rule="evenodd" style="fill:#F7F7F7" opacity="1" d="M26.5 26.5C15 38 0 38 0 38L38 38L38 0C38 0 38 15 26.5 26.5Z"></path></svg>
    <svg class="radius-bottom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38.0511474609375" height="38.0511474609375" viewBox="0 0 38.0511474609375 38.0511474609375" fill="none"><path fill-rule="evenodd" style="fill:#F7F7F7" opacity="1" d="M26.5357 11.5357C38.0202 23.0512 38 38.0511 38 38.0511L38.0512 0.0511894L0.0512076 -1.90735e-05C0.0512076 -1.90735e-05 15.0512 0.020195 26.5357 11.5357Z"></path></svg>
  </el-menu-item>
  <el-sub-menu v-else :index="menu.index">
    <template #title>
      <Icon v-if="menu.icon != null" :data="menu.icon"/>
      <span>{{menu.name<#noparse>}</#noparse><#noparse>}</#noparse></span>
    </template>
    <MenuItems
      v-for="child in menu.children"
      :menu="child"
      :key="child.index"
    />
  </el-sub-menu>
</template>

<script>
export default {
  name: 'MenuItems',
  props: {
    menu: {
      type: Object,
      required: true
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
