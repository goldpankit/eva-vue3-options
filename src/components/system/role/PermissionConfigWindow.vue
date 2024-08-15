<template>
  <GlobalWindow
    class="permission-config-dialog"
    v-model:visible="visible"
    :confirm-working="isWorking"
    width="576px"
    title="授权权限"
    @confirm="confirm"
  >
    <div
      v-if="role != null"
      class="tip-wrap"
    >
      <p>为角色 <em>{{role.name}}</em> 配置权限</p>
      <el-alert
        title="操作提示：在左侧选择需要配置的权限类型，在右侧勾选对应的权限，全部配置完成后点击底部「确认」按钮即可。配置完成后，对应角色需重新登录账号来使用最新权限！"
        type="info"
        :closable="false"
      />
    </div>
    <el-tabs
      v-model="permissionTabs.active"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <el-tab-pane name="menu" label="菜单和功能">
        <el-tree
          ref="menuTree"
          :data="permissionTabs.menu.permissions"
          show-checkbox
          :check-strictly="true"
          node-key="id"
          default-expand-all
          :default-checked-keys="permissionTabs.menu.selectedIds"
          :expand-on-click-node="false"
          :check-on-click-node="true"
        />
      </el-tab-pane>
      <el-tab-pane name="systemConfig" label="系统配置项">
        <EmptyTip
          v-if="permissionTabs.systemConfig.permissions.length === 0"
          description="没有系统配置项可配置"
        />
        <el-alert
          v-else-if="!permissionTabs.systemConfig.visible"
          title="当前角色没有「系统配置」菜单访问权限，无需配置系统配置项权限！"
          type="warning"
          :closable="false"
        />
        <template v-else>
          <el-alert
            title="提醒：系统配置项权限用于限定角色对系统配置项的访问权限，但不会影响系统配置是否能加载到客户端。当配置项没有设定权限标识符时无法选中，默认可访问。"
            type="warning"
            :closable="false"
            style="margin-bottom: 10px;"
          />
          <el-tree
            ref="systemConfigTree"
            :data="permissionTabs.systemConfig.permissions"
            show-checkbox
            :check-strictly="true"
            node-key="id"
            default-expand-all
            :default-checked-keys="permissionTabs.systemConfig.selectedIds"
            :expand-on-click-node="false"
            :check-on-click-node="true"
          />
        </template>
      </el-tab-pane>
    </el-tabs>
  </GlobalWindow>
</template>

<script>
import { fetchPermissions, configPermissions } from '@/api/system/permission'
import { mapState } from 'pinia'
import { useDefaultStore } from '@/core/store'
export default {
  name: 'PermissionConfigWindow',
  data () {
    return {
      visible: false,
      isWorking: false,
      // 角色对象
      role: null,
      // 权限页签
      permissionTabs: {
        active: 'menu',
        menu: {
          selectedIds: [],
          permissions: []
        },
        systemConfig: {
          visible: false,
          selectedIds: [],
          permissions: []
        }
      },
      // 已选中的权限ID
      selectedIds: []
    }
  },
  computed: {
    ...mapState(useDefaultStore, ['userInfo'])
  },
  methods: {
    /**
     * 打开窗口
     *
     * @param role 角色对象
     */
    open (role) {
      fetchPermissions()
        .then(data => {
          this.role = role
          this.permissionTabs.active = 'menu'
          this.permissionTabs.menu.permissions = this.__handlePermissions(data.menuNodes)
          this.permissionTabs.systemConfig.permissions = this.__handlePermissions(data.configNodes)
          // 获取默认选中的菜单和功能权限
          const permissions = []
          this.__treeToArray(this.permissionTabs.menu.permissions, permissions)
          this.permissionTabs.menu.selectedIds = permissions
            // 筛选出角色已配置的权限ID 和 未配置权限标识符的菜单，作为默认选中的权限
            .filter(p => {
              return role.permissions.findIndex(rp => rp.id === p.id) !== -1 ||
                (p.id < 0 && p.type !== 'dir')
            })
            .map(p => p.id)
          // 获取默认选中的系统配置项权限
          this.permissionTabs.systemConfig.selectedIds = this.permissionTabs.systemConfig.permissions
            // 筛选出角色已配置的权限ID 和 未配置权限标识符的菜单，作为默认选中的权限
            .filter(p => {
              return role.permissions.findIndex(rp => rp.id === p.id) !== -1
            })
            .map(p => p.id)
          this.visible = true
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    },
    /**
     * 确认选择权限
     */
    confirm () {
      // 获取菜单权限
      const menuPermissionIds = this.$refs.menuTree.getCheckedNodes(false, true)
        // 筛选出有效的权限
        .filter(item => item.type === 'menu' && item.id > 0)
        .map(item => item.id)
      // 获取功能权限
      const funcPermissionIds = this.$refs.menuTree.getCheckedNodes(false, true)
        // 筛选出有效的权限
        .filter(item => item.type === 'func' && item.id > 0)
        .map(item => item.id)
      // 获取系统配置项权限
      let systemConfigPermissionIds = null
      if (this.$refs.systemConfigTree) {
        systemConfigPermissionIds = this.$refs.systemConfigTree.getCheckedNodes(false, true)
          // 筛选出有效的权限
          .filter(item => item.type === 'systemConfig' && item.id > 0)
          .map(item => item.id)
      }
      // 执行授权
      this.isWorking = true
      configPermissions({
        roleId: this.role.id,
        menuPermissionIds,
        funcPermissionIds,
        systemConfigPermissionIds
      })
        .then(() => {
          this.visible = false
          this.$emit('success')
          setTimeout(() => {
            this.$dialog.attentionConfirm('菜单权限配置成功，用户需重新登录后生效').then(() => {})
          }, 300)
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
        .finally(() => {
          this.isWorking = false
        })
    },
    /**
     * 切换标签
     *
     * @param tab tab实例
     */
    handleTabClick (tab) {
      // 超级管理员
      if (this.$isSuperAdmin()) {
        this.permissionTabs.systemConfig.visible = true
        return
      }
      // 非超级管理员，检查是否拥有系统配置菜单权限
      if (tab.name === 'systemConfig') {
        this.permissionTabs.systemConfig.visible = false
        const menus = this.$refs.menuTree.getCheckedNodes(false, true)
          // 筛选出有效的权限
          .filter(item => item.type === 'menu' && item.id > 0)
        // 判断是否存在系统配置菜单
        if (menus.find(item => item.permission === 'system:config:query') != null) {
          this.permissionTabs.systemConfig.visible = true
        }
      }
    },
    /**
     * 处理权限树
     * 1. id为null时生成负数ID，避免node-key为null的情况（为null有两种情况，a目录，b没有设置权限标识符）
     * 2. id为null时禁用掉
     *
     * @param tree 权限树
     * @returns {*}
     * @private
     */
    __handlePermissions (tree) {
      return tree.map(item => {
        if (item.children != null && item.children.length > 0) {
          item.children = this.__handlePermissions(item.children)
        }
        const id = item.id == null ? (0 - Math.random()) : item.id
        return {
          ...item,
          id,
          disabled: id < 0
        }
      })
    },
    /**
     * 将权限树转为权限数组
     *
     * @param tree 权限树
     * @param array 节点列表，用于存放权限节点
     * @private
     */
    __treeToArray (tree, array) {
      if (tree == null) {
        return
      }
      for (const permission of tree) {
        array.push(permission)
        if (permission.children != null) {
          this.__treeToArray(permission.children, array)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.permission-config-dialog {
  :deep(.window__body) {
    overflow-y: hidden !important;
    display: flex;
    flex-direction: column;
    .tip-wrap {
      flex-shrink: 0;
      & > p {
        margin: 0;
        em {
          font-style: normal;
          color: var(--color-primary);
          font-weight: bold;
        }
      }
      .el-alert {
        margin: 10px 0;
      }
    }
    .el-tabs {
      flex-grow: 1;
      .el-tabs__content {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
