<template>
  <GlobalWindow
    v-model:visible="visible"
    :confirm-working="isWorking"
    width="582px"
    title="配置用户角色"
    @confirm="confirm"
  >
    <p class="tip" v-if="user != null">为用户 <em>{{user.realName}}</em> 配置角色</p>
    <el-transfer
      v-model="selectedIds"
      :titles="['未授权角色', '已授权角色']"
      :props="{
        key: 'id',
        label: 'name'
      }"
      :data="roles">
    </el-transfer>
  </GlobalWindow>
</template>

<script>
import { mapState } from 'pinia'
import { createUserRole } from '@/api/system/user'
import { fetchAll as fetchAllRoles } from '@/api/system/role'
import { useDefaultStore } from '@/core/store'
export default {
  name: 'RoleConfigWindow',
  data () {
    return {
      visible: false,
      isWorking: false,
      // 用户
      user: null,
      // 角色列表
      roles: null,
      // 已选中的角色ID
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
     * @param user 目标用户
     */
    open (user) {
      fetchAllRoles()
        .then(records => {
          this.roles = records
          this.user = user
          // 如果为固定用户，则固定角色不可更改
          if (this.user.fixed) {
            for (const role of this.roles) {
              if (role.fixed) {
                role.disabled = true
              }
            }
          }
          // 如果当前用户为非超级管理员用户，则不允许授权超级管理员角色
          if (!this.userInfo.isSuperAdmin) {
            for (const role of this.roles) {
              if (role.code === this.adminCode) {
                role.disabled = true
              }
            }
          }
          this.selectedIds = this.user.roles.map(r => r.id)
          this.visible = true
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    },
    /**
     * 确认选择角色
     */
    confirm () {
      if (this.isWorking) {
        return
      }
      this.isWorking = true
      createUserRole({
        userId: this.user.id,
        roleIds: this.selectedIds
      })
        .then(() => {
          this.visible = false
          this.$emit('success')
          setTimeout(() => {
            this.$dialog.attentionConfirm('角色配置成功，用户需重新登录后生效').then(() => {})
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
     * 关闭
     */
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
// 角色配置
.global-window {
  .tip {
    em {
      font-style: normal;
      color: var(--color-primary);
      font-weight: bold;
    }
  }
}
</style>
