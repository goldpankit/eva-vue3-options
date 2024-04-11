<template>
  <!-- Element Plus图标 -->
  <el-icon v-if="isElementPlusIcon" class="icon" :size="size">
    <component :is="iconClass == null ? data.className : iconClass"/>
  </el-icon>
  <!-- class图标 -->
  <i
    v-else-if="(data != null && data.accessType === 'CLASS') || iconClass != null"
    class="icon"
    :class="iconClass == null ? data.className : iconClass"
    :style="{ 'font-size': size }"
  ></i>
  <!-- 网络图标 -->
  <img
    v-else-if="(data != null && data.accessType === 'URI') || iconUri != null"
    class="icon image-icon"
    :src="iconUri == null ? (data == null ? '' : data.uri) : iconUri"
    :alt="data == null ? '' : data.name"
    :style="{ width: sizeWidth }"
  />
  <!-- 不正确的图标 -->
  <span class="icon holder" v-else><em>x</em></span>
</template>

<script>

export default {
  name: 'Icon',
  props: {
    // 图标对象
    // e.g: CLASS图标 { accessType: 'CLASS', className: 'el-icon-refresh' }
    // e.g: 网络图标 { accessType: 'URI', iconUri: '/images/icon.png' }
    data: {
      type: Object
    },
    // 图标class
    iconClass: {
      type: String
    },
    // 图标网络路径
    iconUri: {
      type: String
    },
    // 尺寸
    size: {
      default: 'inherit'
    }
  },
  computed: {
    // size对应的width值
    sizeWidth () {
      if (this.size === 'inherit') {
        return '16px'
      }
      return this.size
    },
    // 判断是否为ElementPlus图标
    isElementPlusIcon () {
      const expression = /^[A-Z].*/
      if (this.iconClass != null) {
        return expression.test(this.iconClass)
      }
      if (this.data != null && this.data.accessType === 'CLASS') {
        return expression.test(this.data.className)
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.holder {
  width: 16px !important;
  height: 16px !important;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: red !important;
  background: #e0e0e0;
  em {
    position: relative;
    top: -1px;
    font-style: normal;
  }
}
</style>
