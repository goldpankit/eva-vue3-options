<template>
  <p class="form-item-tip" :style="{ color }">
    <slot name="icon"><Icon v-if="withIcon" :icon-class="iconClass"/></slot>
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'FormItemTip',
  props: {
    // 是否包含图标
    withIcon: {
      default: true
    },
    // 字体颜色
    color: {
      default: '#a0721e'
    },
    // 图标class
    iconClass: {
      default: 'Warning'
    }
  }
}
</script>

<style scoped lang="scss">
.form-item-tip {
  line-height: 20px;
  font-size: 13px;
  margin: 6px 0 0 0;
  .icon {
    font-size: 16px;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
}
</style>
