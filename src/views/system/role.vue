<template>
  <TableLayout
    :authorized="userInfo.isSuperAdmin || $hasPermissions(['system:role:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
      >
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="searchForm.code"
            v-trim
            placeholder="请输入角色编码"
            @keypress.enter="search"
          />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="searchForm.name"
            v-trim
            placeholder="请输入角色名称"
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
        buttons-width="310px"
        :data="tableData.list"
        :default-sort = "{ prop: 'createAt', order: 'descending' }"
        v-model:fullscreen="fullscreen"
        digest="调整角色的权限后，对应用户需重新登录才可生效！"
        digestType="warning"
        @refresh="refresh"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <template
          v-if="userInfo.isSuperAdmin || $hasAnyPermissions([
            'system:role:create',
            'system:role:delete'
          ])"
          #toolbar
        >
          <el-button
            v-if="userInfo.isSuperAdmin || $hasAnyPermissions(['system:role:create'])"
            type="primary"
            icon="Plus"
            @click="$refs.operaRoleWindow.open('新建角色')"
          >新建</el-button>
          <el-button
            v-if="userInfo.isSuperAdmin || $hasAnyPermissions(['system:role:delete'])"
            icon="Delete"
            @click="deleteByIdInBatch"
          >删除</el-button>
        </template>
        <el-table-column type="selection" fixed="left" width="55"></el-table-column>
        <el-table-column prop="code" label="角色编码" fixed="left" min-width="100px"/>
        <el-table-column prop="name" label="角色名称" fixed="left" min-width="100px"/>
        <el-table-column prop="remark" label="角色备注" min-width="120px">
          <template #default="{ row }">
            <PopoverCellValue :content="row.remark"/>
          </template>
        </el-table-column>
        <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          min-width="165px"
          sortable="custom"
          sort-by="role.created_at"
        />
        <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
        <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
        <template
          v-if="userInfo.isSuperAdmin || $hasAnyPermissions([
            'system:role:update',
            'system:role:config',
            'system:role:delete'
          ])"
          #buttons="{ row }"
        >
          <el-button
            v-if="userInfo.isSuperAdmin || $hasPermissions(['system:role:update'])"
            type="primary"
            icon="EditPen"
            @click="$refs.operaRoleWindow.open('编辑角色', row)"
            link
          >编辑</el-button>
          <el-button
            v-if="userInfo.isSuperAdmin || $hasPermissions(['system:role:config'])"
            type="primary"
            @click="$refs.permissionConfigWindow.open(row)"
            link
          >配置权限</el-button>
          <el-button
            v-if="userInfo.isSuperAdmin || $hasPermissions(['system:role:delete'])"
            type="danger"
            icon="Delete"
            @click="deleteById(row)"
            link
          >删除</el-button>
        </template>
      </SearchTable>
      <pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :pagination="tableData.pagination"
      />
    </template>
    <!-- 新建/修改 -->
    <OperaRoleWindow
      ref="operaRoleWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
    <!-- 配置菜单权限 -->
    <PermissionConfigWindow
      ref="permissionConfigWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
  </TableLayout>
</template>

<script>
import { mapState } from 'pinia'
import BaseTable from '@/components/base/BaseTable'
import OperaRoleWindow from '@/components/system/role/OperaRoleWindow'
import PermissionConfigWindow from '@/components/system/role/PermissionConfigWindow'
import { useDefaultStore } from '@/core/store'
export default {
  extends: BaseTable,
  components: {
    PermissionConfigWindow,
    OperaRoleWindow
  },
  data () {
    return {
      // 搜索
      searchForm: {
        code: '',
        name: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapState(useDefaultStore, ['userInfo'])
  },
  async created () {
    this.config({
      module: '角色',
      api: await import('@/api/system/role'),
      sorts: [{
        property: 'role.created_at',
        direction: this.$const.ORDER_BY.DESC
      }]
    })
    this.search()
  }
}
</script>
