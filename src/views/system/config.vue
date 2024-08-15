<template>
  <TableLayout
    :authorized="$hasPermissions(['system:config:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm ref="searchForm" :model="searchForm">
        <el-form-item label="关键字" prop="keyword">
          <el-input
            v-model="searchForm.keyword"
            v-trim
            placeholder="请输入关键字"
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
        v-model:fullscreen="fullscreen"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @refresh="refresh"
      >
        <template
          v-if="$hasAnyPermissions([
            'system:config:create',
            'system:config:delete'
          ])"
          #toolbar
        >
          <el-button
            v-permissions="['system:config:create']"
            type="primary"
            icon="Plus"
            @click="$refs.operaConfigWindow.open('新建系统配置')"
          >新建</el-button>
          <el-button
            v-permissions="['system:config:delete']"
            type="danger"
            icon="Delete"
            @click="deleteByIdInBatch"
          >删除</el-button>
          <el-button
            icon="Refresh"
            @click="refreshCache"
          >刷新缓存</el-button>
        </template>
        <el-table-column type="selection" fixed="left" width="55"/>
        <el-table-column prop="name" label="配置名称" min-width="140px"/>
        <el-table-column prop="scope" label="作用域" min-width="140px">
          <template #default="{ row }">
            {{ $d(`CONFIG_SCOPES.${row.scope}`) }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="配置编码" min-width="200px"/>
        <el-table-column prop="value" label="配置值" min-width="100px">
          <template #default="{ row }">
            <PopoverCellValue :content="row.value"/>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识符" min-width="150px"/>
        <el-table-column prop="remark" label="备注" min-width="200px">
          <template #default="{ row }">
            <PopoverCellValue :content="row.remark"/>
          </template>
        </el-table-column>
        <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
        <el-table-column prop="createdAt" label="创建时间" min-width="165px"/>
        <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
        <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
        <template
          v-if="$hasAnyPermissions([
            'system:config:update',
            'system:config:delete'
          ])"
          #buttons="{ row }"
        >
          <el-button
            type="primary"
            icon="EditPen"
            v-permissions="['system:config:update']"
            @click="$refs.operaConfigWindow.open(`编辑${row.name}`, row)"
            link
          >编辑</el-button>
          <el-button
            type="danger"
            icon="Delete"
            v-permissions="['system:config:delete']"
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
    <!-- 新建编辑窗口 -->
    <OperaConfigWindow
      ref="operaConfigWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
  </TableLayout>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
import OperaConfigWindow from '@/components/system/config/OperaConfigWindow'
import { refreshCache } from '@/api/system/config'

export default {
  extends: BaseTable,
  components: {
    OperaConfigWindow
  },
  data () {
    return {
      // 搜索
      searchForm: {
        keyword: ''
      }
    }
  },
  methods: {
    // 刷新缓存
    refreshCache () {
      refreshCache()
        .then(() => {
          this.$tip.apiSuccess('刷新完成')
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
    }
  },
  async created () {
    this.config({
      module: '系统配置',
      'field.main': 'name',
      api: await import('@/api/system/config'),
      sorts: []
    })
    this.search()
  }
}
</script>
