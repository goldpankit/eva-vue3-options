<template>
  <el-popover
    :visible="visible"
    popper-class="icon-select-popper"
    :width="popperWidth"
    trigger="click"
    @update:visible="handleVisibleChange"
  >
    <Scrollbar>
      <ul v-if="filteredIcons.length > 0" class="icons" :style="{ width: iconsWidth }">
        <li
          v-for="item in filteredIcons"
          :key="item.id"
          :value="item.id"
          @click="select(item)"
        >
          <Icon :data="item" size="22px"/>
          <label>{{item.name}}</label>
        </li>
      </ul>
      <EmptyTip
        v-else
        :description="keyword.trim() === '' ? '没有图标可选，请先添加图标' : '未搜索到图标'"
      />
    </Scrollbar>
    <template #reference>
      <div
        ref="reference"
        :class="{
          reference__expand: visible,
          'reference__with-value': value != null && value !== ''
        }"
      >
        <el-input
          v-model="keyword"
          :readonly="!visible"
          placeholder="搜索图标"
          @keyup.space="disallowHidden"
          @keyup.enter="disallowHidden"
          @click="disallowHidden"
        >
          <template #prefix>
            <Icon :data="selectedIcon" @click="disallowHidden"/>
          </template>
        </el-input>
        <span class="opera-icon-wrap">
          <span v-if="clearable" class="close-icon-wrap">
            <i class="Close" @click="select()"></i>
          </span>
          <i class="ArrowDown"></i>
        </span>
      </div>
    </template>
  </el-popover>
</template>

<script>
import { fetchAll } from '@/api/system/icon'
import Scrollbar from '@/components/common/Scrollbar'

export default {
  name: 'IconSelect',
  components: { Scrollbar },
  props: {
    value: {
      required: true
    },
    // 是否可清除
    clearable: {
      default: true
    }
  },
  data () {
    return {
      visible: false,
      // popper宽度
      popperWidth: 0,
      // ul宽度
      iconsWidth: 0,
      // 搜索关键字
      keyword: '',
      // 图标列表
      list: [],
      // 是否不允许隐藏，用于处理点击输入框等部分时不隐藏选择框
      disallow: false
    }
  },
  watch: {
    visible () {
      if (!this.visible || this.popperWidth > 0) {
        return
      }
      this.popperWidth = this.$refs.reference.getBoundingClientRect().width
      this.iconsWidth = this.calcIconsWidth()
    }
  },
  computed: {
    // 图标
    filteredIcons () {
      if (this.keyword === '') {
        return this.list
      }
      return this.list.filter(item => item.name.indexOf(this.keyword) !== -1)
    },
    // 已选图标
    selectedIcon () {
      if (this.value == null) {
        return null
      }
      if (typeof this.value === 'number') {
        return this.list.find(item => item.id === this.value)
      }
      if (this.value.indexOf('/') === -1) {
        return this.list.find(item => item.className === this.value)
      }
      return this.list.find(item => item.uri === this.value)
    }
  },
  methods: {
    // 处理visible变更
    handleVisibleChange (value) {
      if (this.visible && this.disallow) {
        this.disallow = false
        return
      }
      this.visible = value
    },
    // 获取图标列表
    fetchAll () {
      fetchAll()
        .then(icons => {
          this.list = icons
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    },
    // 确认选择
    select (icon) {
      this.visible = false
      if (icon == null) {
        this.$emit('update:value', null)
        return
      }
      this.$emit('update:value', icon.id)
    },
    // 计算ul真实宽度，每个图标占据80px，计算当前popper宽度可以放下多少个图标，并得到最终宽度值
    calcIconsWidth () {
      const count = Math.floor(this.popperWidth / 85)
      return (count * 80) + 'px'
    },
    // 标记为不允许隐藏
    disallowHidden () {
      if (this.visible) {
        this.disallow = true
      }
    }
  },
  created () {
    this.fetchAll()
  },
  mounted () {
    this.popperWidth = this.$refs.reference.getBoundingClientRect().width
    this.iconsWidth = this.calcIconsWidth()
  }
}
</script>

<style scoped lang="scss">
.el-popover__reference-wrapper {
  position: relative;
  // hover状态，展示清空
  &:hover {
    .reference__with-value {
      .close-icon-wrap {
        display: inline-flex !important;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 50%;
        i {
          font-size: 12px;
          transform: scale(0.80);
        }
      }
      .el-icon-arrow-down {
        display: none !important;
      }
    }
  }
  // 展开状态，旋转下拉箭头
  .reference__expand {
    .el-icon-arrow-down {
      transform: rotate(-180deg);
    }
  }
  // 图标预览
  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
    z-index: 9;
    cursor: pointer !important;
  }
  // 操作图标
  .opera-icon-wrap {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: #999;
      cursor: pointer !important;
    }
    // 清空图标
    .close-icon-wrap {
      display: none;
    }
    // 下拉箭头
    .el-icon-arrow-down {
      transition: all ease .15s;
    }
  }
  // 输入框
  & > div {
    ::v-deep(.el-input .el-input__inner) {
      padding-left: 30px;
      padding-right: 30px;
      cursor: pointer !important;
    }
  }
}
</style>

<style lang="scss">
.icon-select-popper {
  height: 300px;
  box-sizing: border-box;
  .el-scrollbar .el-scrollbar__view {
    display: flex;
    justify-content: center;
  }
  // 图标列表
  .icons {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 80px;
      height: 60px;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: background ease .1s;
      color: #777;
      .icon {
        transition: color ease .1s;
      }
      label {
        display: block;
        text-align: center;
        width: 100%;
        font-size: 12px;
        margin-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        background: #eee;
        color: var(--color-primary);
      }
    }
  }
  .empty-tip {
    height: 200px;
  }
}
</style>
