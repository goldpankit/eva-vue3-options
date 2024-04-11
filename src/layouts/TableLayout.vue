<template>
  <div class="table-layout" :class="{ fullscreen }">
    <Profile :authorized="authorized">
      <!-- 搜索表单部分 -->
      <div class="table-search-form">
        <div class="form-wrap">
          <slot name="search-form"></slot>
        </div>
      </div>
      <slot name="space"></slot>
      <!-- 列表和分页部分 -->
      <div class="table-content">
        <div class="table-wrap">
          <slot name="table-wrap"></slot>
        </div>
      </div>
      <slot></slot>
    </Profile>
  </div>
</template>

<script>
import Profile from '../components/layout/Profile.vue'
export default {
  name: 'TableLayout',
  components: { Profile },
  props: {
    // 是否已授权访问
    authorized: {
      type: Boolean,
      default: true
    },
    // 是否全屏
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    paths () {
      return this.$route.meta.paths
    }
  }
}
</script>

<style lang="scss">
.table-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  box-sizing: border-box;
  .not-allow-wrap {
    padding-top: 0;
  }
  // 全屏
  &.fullscreen {
    background: var(--background-color);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    overflow-y: auto;
  }
}
// 搜索
.table-search-form {
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
  .form-wrap {
    padding: 16px 16px 0 16px;
    width: 100%;
    background: #fff;
    &:empty {
      padding: 0;
    }
  }
}
// 列表和分页
.table-content {
  margin-top: 10px;
  padding: 0 16px;
  .table-wrap {
    padding: 16px 16px 0 16px;
    background: #fff;
    // 分页
    .table-pagination {
      padding: 16px 0;
      text-align: left;
    }
  }
}
</style>
