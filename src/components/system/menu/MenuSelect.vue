<template>
  <TreeSelect
    :placeholder="placeholder"
    :modelValue="modelValue"
    :data="data"
    :append-to-body="appendToBody"
    :clearable="clearable"
    :inline="inline"
    node-key="value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script>
import TreeSelect from '@/components/common/TreeSelect'
import constants from '@/core/plugins/consts'
import { fetchAll } from '@/api/system/menu'
export default {
  name: 'MenuSelect',
  components: { TreeSelect },
  props: {
    modelValue: {},
    inline: {
      default: true
    },
    placeholder: {
      default: '请选择菜单'
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      default: false
    },
    // 需被排除的部门ID
    excludeId: {}
  },
  data () {
    return {
      data: []
    }
  },
  watch: {
    excludeId () {
      this.fetchData()
    }
  },
  methods: {
    /**
     * 获取所有菜单
     */
    fetchData () {
      fetchAll()
        .then(records => {
          this.data = []
          this.__fillData(this.data, records)
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    },
    // 填充菜单树
    __fillData (list, pool) {
      for (const menu of pool) {
        // 非目录
        if (menu.type !== constants.SYSTEM_MENU.TYPE_DIR) {
          continue
        }
        // 已排除
        if (menu.id === this.excludeId) {
          continue
        }
        const menuNode = {
          value: menu.id,
          label: menu.name
        }
        list.push(menuNode)
        if (menu.children != null && menu.children.length > 0) {
          menuNode.children = []
          this.__fillData(menuNode.children, menu.children)
          if (menuNode.children.length === 0) {
            menuNode.children = undefined
          }
        }
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
