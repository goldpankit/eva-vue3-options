<template>
  <TableLayout
    :authorized="$hasPermissions(['system:dict:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm ref="searchForm" :model="searchForm">
        <el-form-item label="字典编码" prop="code">
          <el-input
            v-model="searchForm.code"
            v-trim
            placeholder="请输入字典编码"
            @keypress.enter="search"
          />
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input
            v-model="searchForm.name"
            v-trim
            placeholder="请输入字典名称"
            @keypress.enter="search"
          />
        </el-form-item>
        <el-form-item label="作用域" prop="scope">
          <DictSelect
            v-model="searchForm.scope"
            code="DICT_SCOPES"
            placeholder="请选择所属作用域"
            :clearable="true"
            @change="search"
          />
        </el-form-item>
        <template #buttons>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </SearchForm>
    </template>
    <!-- 表格和分页 -->
    <template #table-wrap>
      <SearchTable
        v-loading="isWorking.search"
        :data="tableData.list"
        :default-sort = "{ prop: 'createdAt', order: 'descending' }"
        buttons-width="225px"
        :opera-permissions="['system:dict:update', 'system:dict:delete']"
        v-model:fullscreen="fullscreen"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @refresh="refresh"
      >
        <template
          v-if="$hasAnyPermissions([
            'system:dict:create',
            'system:dict:delete'
          ])"
          #toolbar
        >
          <el-button
            v-permissions="['system:dict:create']"
            type="primary"
            icon="Plus"
            @click="$refs.operaDictWindow.open('新建字典')"
          >新建</el-button>
          <el-button
            v-permissions="['system:dict:delete']"
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
        <el-table-column prop="name" label="字典名称" fixed="left" min-width="140px"/>
        <el-table-column prop="category" label="作用域" min-width="100px">
          <template #default="{ row }">
            {{ $d(`DICT_SCOPES.${row.scope}`) }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="字典编码" min-width="140px"/>
        <el-table-column prop="remark" label="备注" min-width="100px">
          <template #default="{ row }">
            <PopoverCellValue :content="row.remark" :with-opera="false"/>
          </template>
        </el-table-column>
        <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          min-width="165px"
          sortable="custom"
          sort-by="dict.created_at"
        />
        <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
        <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
        <template
          v-if="$hasAnyPermissions([
            'system:dict:update',
            'system:dict:delete'
          ])"
          #buttons="{ row }"
        >
          <el-button
            v-permissions="['system:dict:update']"
            type="primary"
            icon="EditPen"
            @click="$refs.operaDictWindow.open('编辑字典', row)"
            link
          >编辑</el-button>
          <el-button
            v-permissions="['system:dict:update']"
            type="primary"
            @click="$refs.dictDataManagerWindow.open(row.id, row.name)"
            link
          >数据管理</el-button>
          <el-button
            v-permissions="['system:dict:delete']"
            type="danger"
            icon="Delete"
            @click="deleteById(row)"
            link
          >删除</el-button>
        </template>
      </SearchTable>
      <pagination
        :pagination="tableData.pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </template>
    <!-- 新建/修改 -->
    <OperaDictWindow
      ref="operaDictWindow"
      @success="handlePageChange(tableData.pagination.pageIndex)"
    />
    <!-- 数据管理 -->
    <DictDataManagerWindow ref="dictDataManagerWindow"/>
  </TableLayout>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
import OperaDictWindow from '@/components/system/dict/OperaDictWindow'
import DictDataManagerWindow from '@/components/system/dict/DictDataManagerWindow'
import { refreshCache } from '@/api/system/dict'
export default {
  extends: BaseTable,
  components: {
    DictDataManagerWindow,
    OperaDictWindow
  },
  data () {
    return {
      // 搜索
      searchForm: {
        code: '',
        name: '',
        scope: ''
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
      module: '字典',
      'field.main': 'name',
      api: await import('@/api/system/dict'),
      sorts: [{
        property: 'dict.created_at',
        direction: 'DESC'
      }]
    })
    this.search()
  }
}
</script>
