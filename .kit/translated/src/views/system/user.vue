<template>
  <TableLayout
    :authorized="userInfo.isSuperAdmin || $hasPermissions(['system:user:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm
        ref="searchForm"
        :model="searchForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="searchForm.username"
            v-trim
            placeholder="请输入用户名"
            @keypress.enter="search"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input
            v-model="searchForm.realName"
            v-trim
            placeholder="请输入姓名"
            @keypress.enter="search"
          />
        </el-form-item>
        <el-form-item label="手机尾号" prop="mobile">
          <el-input
            v-model="searchForm.mobile"
            v-trim
            placeholder="请输入手机尾号"
            @keypress.enter="search"
          />
        </el-form-item>
        <template #buttons>
          <el-button
            type="primary"
            icon="Search"
            @click="search"
          >搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </SearchForm>
    </template>
    <!-- 表格和分页 -->
    <template #table-wrap>
      <SearchTable
        v-loading="isWorking.search"
        :data="tableData.list"
        :default-sort = "{ prop: 'createdAt', order: 'descending' <#noparse>}</#noparse>"
        v-model:fullscreen="fullscreen"
        buttons-width="310px"
        @refresh="refresh"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <template
          #toolbar
          v-if="userInfo.isSuperAdmin || $hasAnyPermissions([
            'system:user:create',
            'system:user:delete'
          ])"
        >
          <el-button
            v-if="userInfo.isSuperAdmin || $hasPermissions(['system:user:create'])"
            type="primary"
            icon="Plus"
            @click="$refs.operaUserWindow.open('新建用户')"
          >新建</el-button>
          <el-button
            v-if="userInfo.isSuperAdmin || $hasPermissions(['system:user:delete'])"
            icon="Delete"
            @click="deleteByIdInBatch"
          >删除</el-button>
        </template>
        <el-table-column type="selection" width="55"/>
        <el-table-column
          prop="avatar"
          label="头像"
          width="80px"
          class-name="table-column-avatar"
          fixed="left"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <img
              :src="row.avatar == null ? '/static/avatar/man.png' : row.avatar"
              alt="头像"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          min-width="100px"
          fixed="left"
        />
        <el-table-column prop="username" label="用户名" min-width="120px"/>
        <el-table-column
          prop="empNo"
          label="工号"
          sortable="custom"
          sort-by="EMP_NO"
          min-width="80px"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          sortable="custom"
          sort-by="GENDER"
          min-width="80px"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            {{ $d(`GENDERS.<#noparse>${</#noparse>row.gender<#noparse>}</#noparse>`) <#noparse>}</#noparse><#noparse>}</#noparse>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" min-width="120px"/>
        <el-table-column prop="email" label="邮箱" min-width="180px"/>
        <el-table-column prop="birthday" label="生日" min-width="100px"/>
        <el-table-column
          prop="roles"
          label="角色"
          min-width="160px"
          class-name="table-column-strings"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <TagCellValue :data="row.roles" label-key="name"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="roles"
            label="部门"
            min-width="160px"
            class-name="table-column-strings"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <TagCellValue :data="row.departments" label-key="name"/>
          </template>
        </el-table-column>
        <el-table-column prop="isDepartmentLeader" label="是否为部门负责人" min-width="80px">
          <template v-slot:default="{ row <#noparse>}</#noparse>">
            {{ $filters.yONText(row.isDepartmentLeader) <#noparse>}</#noparse><#noparse>}</#noparse>
          </template>
        </el-table-column>
        <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          sortable="custom"
          sort-by="created_at"
          min-width="165px"
        />
        <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          sortable="custom"
          sort-by="UPDATED_AT"
          min-width="165px"
        />
        <template
          v-if="userInfo.isSuperAdmin || $hasAnyPermissions([
            'system:user:update',
            'system:user:role:config',
            'system:user:password:reset',
            'system:user:delete'
          ])"
          #buttons="{ row <#noparse>}</#noparse>"
        >
          <!-- 超级管理员 -->
          <template v-if="userInfo.isSuperAdmin">
            <el-button
              type="primary"
              icon="EditPen"
              @click="$refs.operaUserWindow.open('编辑用户', row)"
              link
            >编辑</el-button>
            <el-button
              type="primary"
              icon="Avatar"
              @click="$refs.roleConfigWindow.open(row)"
              link
            >配置角色</el-button>
            <el-button
              type="primary"
              @click="$refs.resetPwdWindow.open(row)"
              link
            >重置密码</el-button>
            <!-- 不能删除自己 -->
            <el-button
              v-if="row.id !== userInfo.id"
              type="danger"
              icon="Delete"
              @click="deleteById(row)"
              link
            >删除</el-button>
          </template>
          <!-- 非超级管理员 -->
          <template v-else>
            <!-- 不能编辑超级管理员 -->
            <el-button
              v-if="$hasPermissions(['system:user:update']) && !isSuperAdmin(row)"
              type="primary"
              icon="EditPen"
              @click="$refs.operaUserWindow.open('编辑用户', row)"
              link
            >编辑</el-button>
            <!-- 不能配置超级管理员和自己的角色 -->
            <el-button
              v-if="$hasPermissions(['system:user:role:config']) && !isSuperAdmin(row) && row.id !== userInfo.id"
              type="primary"
              icon="Avatar"
              @click="$refs.roleConfigWindow.open(row)"
              link
            >配置角色</el-button>
            <!-- 不能重置超级管理员密码 -->
            <el-button
              v-if="$hasPermissions(['system:user:password:reset']) && !isSuperAdmin(row)"
              type="primary"
              @click="$refs.resetPwdWindow.open(row)"
              link
            >重置密码</el-button>
            <!-- 不能删除超级管理员和自己 -->
            <el-button
              v-if="$hasPermissions(['system:user:delete']) && !isSuperAdmin(row) && row.id !== userInfo.id"
              type="danger"
              icon="Delete"
              @click="deleteById(row)"
              link
            >删除</el-button>
          </template>
        </template>
      </SearchTable>
      <pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :pagination="tableData.pagination"
      />
    </template>
    <!-- 新建/修改 -->
    <OperaUserWindow
      ref="operaUserWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
    <!-- 配置角色 -->
    <RoleConfigWindow
      ref="roleConfigWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
    <!-- 重置密码 -->
    <ResetPwdWindow ref="resetPwdWindow"/>
  </TableLayout>
</template>

<script>
import { mapState <#noparse>}</#noparse> from 'pinia'
import { useDefaultStore <#noparse>}</#noparse> from '@/core/store'
import BaseTable from '@/components/base/BaseTable'
import OperaUserWindow from '@/components/system/user/OperaUserWindow'
import RoleConfigWindow from '@/components/system/user/RoleConfigWindow'
import ResetPwdWindow from '@/components/system/user/ResetPwdWindow'

export default {
  extends: BaseTable,
  components: {
    ResetPwdWindow,
    RoleConfigWindow,
    OperaUserWindow
  <#noparse>}</#noparse>,
  data () {
    return {
      // 搜索
      searchForm: {
        username: '', // 名字
        realName: '', // 姓名
        mobile: '' // 手机号码
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    ...mapState(useDefaultStore, ['userInfo'])
  <#noparse>}</#noparse>,
  methods: {
    // 是否为超级管理员
    isSuperAdmin (user) {
      return user.roles.findIndex(item => item.code === this.$const.ROLE_ADMIN) !== -1
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      module: '用户',
      api: await import('@/api/system/user'),
      'field.main': 'realName',
      sorts: [{
        property: 'created_at',
        direction: 'DESC'
      <#noparse>}</#noparse>]
    <#noparse>}</#noparse>)
    this.search()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
// 列表头像处理
.table-column-avatar {
  img {
    width: 48px;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
