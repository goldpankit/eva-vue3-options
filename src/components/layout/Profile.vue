<template>
  <div v-if="authorized">
    <slot></slot>
  </div>
  <div v-else class="not-allowed-wrap">
    <slot name="not-allowed"><NotAllowed/></slot>
  </div>
</template>

<script>
import NotAllowed from './NotAllowed.vue'
export default {
  name: 'Profile',
  components: { NotAllowed },
  props: {
    // 是否已授权访问
    authorized: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.not-allowed-wrap {
  height: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
}
</style>
