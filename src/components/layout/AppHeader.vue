<template>
  <div class="header-wrap">
    <div class="header">
      <h2>
        <el-icon v-if="menuData.collapse" @click="switchCollapseMenu(null)">
          <Expand />
        </el-icon>
        <el-icon v-else @click="switchCollapseMenu(null)">
          <Fold />
        </el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="path in paths"
            :key="path"
          >{{path}}</el-breadcrumb-item>
        </el-breadcrumb>
      </h2>
      <div class="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img
              v-if="userInfo != null"
              :src="userInfo.avatar == null ? '/avatar/man.png' : userInfo.avatar"
              alt=""
            >
            {{displayName(userInfo)}}
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码 -->
    <GlobalWindow
      title="修改密码"
      v-model:visible="visible.changePwd"
      @confirm="confirmChangePwd"
      @close="visible.changePwd = false"
    >
      <el-form :model="changePwdData.form" ref="changePwdDataForm" :rules="changePwdData.rules">
        <el-form-item label="原始密码" prop="oldPwd" required>
          <el-input v-model="changePwdData.form.oldPwd" type="password" placeholder="请输入原始密码" maxlength="30" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" required>
          <el-input v-model="changePwdData.form.newPwd" type="password" placeholder="请输入新密码" maxlength="30" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPwd" required>
          <el-input v-model="changePwdData.form.confirmPwd" type="password" placeholder="请再次输入新密码" maxlength="30" show-password></el-input>
        </el-form-item>
      </el-form>
    </GlobalWindow>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { logout, updatePwd } from '@/api/system'
import { useDefaultStore } from '@/core/store'

export default {
  name: 'AppHeader',
  data () {
    return {
      visible: {
        // 修改密码
        changePwd: false
      },
      isWorking: {
        // 修改密码
        changePwd: false
      },
      // 用户名
      username: '',
      // 修改密码弹框
      changePwdData: {
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          oldPwd: [
            { required: true, message: '请输入原始密码' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码' }
          ],
          confirmPwd: [
            { required: true, message: '请再次输入新密码' }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState(useDefaultStore, ['menuData', 'userInfo']),
    title () {
      return this.$route.meta.title
    },
    paths () {
      return this.$route.meta.paths
    }
  },
  methods: {
    ...mapActions(useDefaultStore, ['switchCollapseMenu']),
    /**
     * 修改密码（点击修改密码时触发）
     */
    changePwd () {
      this.visible.changePwd = true
      this.$nextTick(() => {
        this.$refs.changePwdDataForm.resetFields()
      })
    },
    /**
     * 确定修改密码
     */
    confirmChangePwd () {
      if (this.isWorking.changePwd) {
        return
      }
      this.$refs.changePwdDataForm.validate((valid) => {
        if (!valid) {
          return
        }
        // 验证两次密码输入是否一致
        if (this.changePwdData.form.newPwd !== this.changePwdData.form.confirmPwd) {
          this.$tip.warning('两次密码输入不一致')
          return
        }
        // 执行修改
        this.isWorking.changePwd = true
        updatePwd({
          oldPwd: this.changePwdData.form.oldPwd,
          newPwd: this.changePwdData.form.newPwd
        })
          .then(() => {
            this.visible.changePwd = false
            setTimeout(() => {
              this.$dialog.attentionConfirm('密码修改成功，请重新登录', undefined, {
                confirmButtonText: '重新登录'
              }).then(() => {
                this.logout()
              })
            }, 300)
          })
          .catch(e => {
            this.$tip.apiFailed(e)
          })
          .finally(() => {
            this.isWorking.changePwd = false
          })
      })
    },
    /**
     * 退出登录
     */
    logout () {
      logout()
        .then(() => {
          this.$router.push({ name: 'login' })
          // 跳转完成后再清空用户，避免因userInfo为null导致的异常
          this.$nextTick(() => {
            this.$defaultStore.$reset()
          })
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    },
    /**
     * 展示名称
     *
     * @param {Object} userInfo 用户信息
     */
    displayName (userInfo) {
      if (userInfo == null) {
        return ''
      }
      if (userInfo.realName != null && userInfo.realName.trim().length > 0) {
        return userInfo.realName
      }
      return userInfo.username
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrap {
  background: #fff;
  .header {
    overflow: hidden;
    padding: 0 25px 0 15px;
    height: var(--header-height);
    display: flex;
    h2 {
      width: 50%;
      flex-shrink: 0;
      line-height: var(--header-height);
      font-size: 19px;
      font-weight: 600;
      color: #606263;
      display: flex;
      align-items: center;
      & > i {
        font-size: 20px;
        margin-right: 12px;
      }
      // 页面路径
      :deep(.el-breadcrumb) {
        .el-breadcrumb__item {
          .el-breadcrumb__inner {
            color: #ABB2BE;
          }
          &:last-of-type .el-breadcrumb__inner {
            color: #606263;
            font-size: 14px;
          }
        }
      }
    }
    .user {
      width: 50%;
      flex-shrink: 0;
      text-align: right;
      .el-dropdown {
        top: 2px;
      }
      img {
        width: 32px;
        position: relative;
        top: 10px;
        margin-right: 10px;
      }
    }
  }
  // 下拉菜单框
  .el-dropdown-menu {
    width: 140px;
    .el-dropdown-menu__item:hover {
      background: #E3EDFB;
      color: var(--color-primary);
    }
  }
}
</style>
