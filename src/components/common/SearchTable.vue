<template>
  <div
    class="search-table"
    :class="{ ['density-' + density ]: true }"
  >
    <!-- 工具栏 -->
    <div
      v-if="$slots.toolbar || withDensity || withFullscreen"
      class="toolbars"
    >
      <div v-if="$slots.toolbar != null" class="left-wrap">
        <slot name="toolbar"></slot>
      </div>
      <div v-if="withRefresh || withDensity || withFullscreen" class="right-wrap">
        <el-select
          v-if="withDensity"
          class="density-select"
          v-model="density"
          placeholder="请选择"
        >
          <el-option label="默认" value="default"/>
          <el-option label="宽松" value="loose"/>
          <el-option label="紧凑" value="compact"/>
        </el-select>
        <el-button
          v-if="withRefresh"
          icon="Refresh"
          @click="$emit('refresh')"
        >刷新</el-button>
        <template v-if="withFullscreen">
          <el-button
            v-if="fullscreen"
            class="iconfont icon-exit-fullscreen2"
            @click="execFullScreen"
          >退出全屏</el-button>
          <el-button
            v-else
            icon="FullScreen"
            @click="execFullScreen"
          >全屏</el-button>
        </template>
      </div>
    </div>
    <!-- 摘要内容 -->
    <div v-if="(digest != null && digest.trim() !== '') || $slots.digest" class="digest-content">
      <slot name="digest">
        <el-alert
          :title="digest"
          :type="digestType"
          show-icon
        />
      </slot>
    </div>
    <!-- 表格 -->
    <el-table
      ref="table"
      :data="computedData"
      :default-sort="computedDefaultSort"
      :default-expand-all="computedDefaultExpandAll"
      :row-key="computedRowKey"
      :show-overflow-tooltip="showOverflowTooltip"
      :tooltip-effect="tooltipEffect"
      :row-class-name="rowClassName"
      @selection-change="$emit('selection-change', $event)"
      @sort-change="$emit('sort-change', $event)"
    >
      <slot></slot>
      <!-- 操作列 -->
      <el-table-column
        v-if="$slots.buttons"
        label="操作"
        :width="computedButtonsWidth"
        fixed="right"
        class-name="opera-column"
      >
        <template #default="scope">
          <slot name="buttons" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BaseComponent from '@/components/BaseComponent'

export default {
  name: 'SearchTable',
  emits: ['update:fullscreen', 'refresh', 'selection-change'],
  extends: BaseComponent,
  props: {
    // 同el-table data
    data: {
      required: true
    },
    // 同el-table default-sort
    defaultSort: {},
    // 同el-table default-expand-all
    defaultExpandAll: {},
    // 同el-table row-key
    rowKey: {},
    // 同el-table show-overflow-tooltip
    showOverflowTooltip: {
      default: false
    },
    // 同el-table tooltip-effect
    tooltipEffect: {
      default: 'dark'
    },
    // 同el-table row-class-name
    rowClassName: {},
    // 全屏标识
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 摘要信息
    digest: {
      type: String,
      required: false
    },
    // 同el-alert type
    digestType: {
      default: 'info'
    },
    // 是否包含刷新
    withRefresh: {
      default: true
    },
    // 是否包含密度
    withDensity: {
      default: true
    },
    // 是否包含全屏
    withFullscreen: {
      default: true
    },
    // 按钮占据的宽度
    buttonsWidth: {
      default: '150px'
    }
  },
  data () {
    return {
      density: 'default'
    }
  },
  computed: {
    computedData () {
      return this.computeProp('data')
    },
    computedDefaultSort () {
      return this.computeProp('defaultSort')
    },
    computedDefaultExpandAll () {
      return this.computeProp('defaultExpandAll')
    },
    computedRowKey () {
      return this.computeProp('rowKey')
    },
    computedButtonsWidth () {
      return this.computeProp('buttonsWidth')
    }
  },
  methods: {
    /**
     * 处理全屏&缩放
     */
    execFullScreen () {
      this.$emit('update:fullscreen', !this.fullscreen)
      this.$nextTick(() => {
        if (this.fullscreen) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      })
    }
  },
  mounted () {
    // 监听全屏缩放
    document.addEventListener('fullscreenchange', () => {
      this.$emit('update:fullscreen', document.fullscreenElement != null)
    })
  }
}
</script>

<style scoped lang="scss">
.search-table {
  // 宽松
  &.density-loose {
    :deep(.el-table) {
      th {
        padding: 10px 0;
        .cell {
          font-size: 15px;
        }
      }
      td {
        padding: 10px 0;
        .cell {
          font-size: 15px;
          min-height: 40px;
        }
      }
    }
  }
  // 紧凑
  &.density-compact {
    :deep(.el-table) {
      th {
        padding: 2px 0;
        font-size: 12px;
        .cell {
          font-size: 12px;
        }
      }
      td {
        padding: 2px 0;
        .cell {
          min-height: 25px;
          font-size: 12px;
        }
      }
    }
  }
  // 工具栏
  .toolbars {
    margin-bottom: 10px;
    display: flex;
    .left-wrap {
      flex-grow: 1;
    }
    .right-wrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      & > * {
        margin-left: 10px;
      }
      .density-select {
        width: 80px;
      }
    }
  }
  // 摘要
  .digest-content {
    margin-bottom: 10px;
    :deep(.el-alert) {
      padding: 8px 16px !important;
    }
  }
  // 表格
  :deep(.el-table) {
    th {
      background: #f8f8f9;
      padding: 8px 0;
      .cell {
        color: #666;
        font-size: 13px;
      }
    }
    td {
      padding: 8px 0;
      .cell {
        min-height: 32px;
        line-height: 20px;
        display: flex;
        align-items: center;
        font-size: 13px;
        word-break: break-all;
        // 使用el的tooltip进行文字提示
        &.el-tooltip {
          line-height: 32px;
          white-space: nowrap;
          min-width: 50px;
          overflow: hidden;
          display: block;
        }
      }
      // 操作列
      &.opera-column {
        .cell .el-button {
          position: relative;
          padding-left: 8px;
          padding-right: 8px;
          margin-left: 0;
          &:last-of-type {
            &::after {
              content: initial;
            }
          }
          &::after {
            content: '';
            border-right: 1px solid #e8eaec;
            height: 12px;
            display: inline-flex;
            position: absolute;
            top: 50%;
            right: -1px;
            transform: translateY(-50%);
          }
        }
      }
    }
    // 复选框列
    .el-table-column--selection {
      .cell {
        text-align: center !important;
        justify-content: center;
      }
    }
    // 树视觉调整
    [class*=el-table__row--level] .el-table__expand-icon {
      position: relative;
      left: -6px;
      margin-right: 0;
    }
  }
}
</style>
