<template>
  <GlobalWindow
    title="菜单图标管理"
    width="1200px"
    v-model:visible="visible"
    :with-footer="false"
  >
    <TableLayout
      :authorized="$hasPermissions(['system:menu:icon:query'])"
    >
      <!-- 搜索表单 -->
      <template #search-form>
        <SearchForm class="window-search-form" ref="searchForm" :model="searchForm">
          <el-form-item label="图标名称" prop="name">
            <el-input v-model="searchForm.name" v-trim placeholder="请输入图标名称" @keypress.enter="search"/>
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
          stripe
          :opera-permissions="['system:menu:icon:update','system:menu:icon:delete']"
          :with-fullscreen="false"
          @refresh="refresh"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
        >
          <template
            v-if="$hasAnyPermissions([
              'system:menu:icon:create',
              'system:menu:icon:delete'
            ])"
            #toolbar
          >
            <el-button
              type="primary"
              v-permissions="['system:menu:icon:create']"
              icon="Plus"
              @click="$refs.operaMenuIconWindow.open('新建系统图标', searchForm.dictId)"
            >新建</el-button>
            <el-button
              v-permissions="['system:menu:icon:create']"
              type="danger"
              icon="Delete"
              @click="deleteByIdInBatch"
            >删除</el-button>
          </template>
          <el-table-column type="selection" fixed="left" width="55"></el-table-column>
          <el-table-column label="预览" min-width="50px" fixed="left">
            <template #default="{ row }">
              <Icon :data="row" size="22px"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="图标名称" min-width="100px" fixed="left"></el-table-column>
          <el-table-column prop="className" label="CLASS" min-width="160px"/>
          <el-table-column prop="uri" label="网络路径" min-width="140px"/>
          <el-table-column prop="accessType" label="图标类型" min-width="100px">
            <template #default="{ row }">
              {{ $d(`ICON_TYPES.${row.accessType}`) }}
            </template>
          </el-table-column>
          <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
          <el-table-column prop="createdAt" label="创建时间" min-width="165px"/>
          <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
          <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
          <template
            v-if="$hasAnyPermissions([
              'system:menu:icon:update',
              'system:menu:icon:delete'
            ])"
            #buttons="{ row }"
          >
            <el-button
              type="primary"
              icon="EditPen"
              v-permissions="['system:menu:icon:update']"
              @click="$refs.operaMenuIconWindow.open(`编辑系统图标`, row)"
              link
            >编辑</el-button>
            <el-button
              type="danger"
              icon="Delete"
              v-permissions="['system:menu:icon:delete']"
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
      <OperaMenuIconWindow
        ref="operaMenuIconWindow"
        @success="handlePageChange(tableData.pagination.pageIndex)"
      />
    </TableLayout>
  </GlobalWindow>
</template>

<script>
import BaseTable from '@/components/base/BaseTable.vue'
import OperaMenuIconWindow from '@/components/system/menu/OperaMenuIconWindow'
export default {
  name: 'MenuIconTableWindow',
  extends: BaseTable,
  components: {
    OperaMenuIconWindow
  },
  data () {
    return {
      visible: false,
      // 搜索
      searchForm: {
        name: '',
        category: ''
      }
    }
  },
  methods: {
    // 打开窗口
    open () {
      this.visible = true
      this.search()
    }
  },
  async created () {
    this.config({
      module: '系统图标',
      api: await import('@/api/system/icon'),
      sorts: []
    })
  }
}
</script>

<style scoped lang="scss">
</style>
