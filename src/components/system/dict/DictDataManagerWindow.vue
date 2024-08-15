<template>
  <GlobalWindow
    :title="dictName + '数据管理'"
    width="1000px"
    v-model:visible="visible"
    :with-footer="false"
    :wrapper-closable="true"
    :close-on-press-escape="true"
  >
    <TableLayout :authorized="$hasPermissions(['system:dict:data:query'])">
      <!-- 表格和分页 -->
      <template #table-wrap>
        <SearchTable
          v-loading="isWorking.search"
          :data="tableData.list"
          :with-fullscreen="false"
          @refresh="refresh"
          @selection-change="handleSelectionChange"
        >
          <template
            v-if="$hasAnyPermissions([
              'system:dict:data:create',
              'system:dict:data:delete',
              'system:dict:data:sort'
            ])"
            #toolbar
          >
            <el-button
              v-permissions="['system:dict:data:create']"
              type="primary"
              @click="$refs.operaDictDataWindow.open('新建字典数据', searchForm.dictId)"
              icon="Plus"
            >新建</el-button>
            <el-button
              v-permissions="['system:dict:data:delete']"
              type="danger"
              icon="Delete"
              @click="deleteByIdInBatch"
            >删除</el-button>
            <el-button
              v-permissions="['system:dict:data:sort']"
              :loading="isWorking.sort"
              icon="ArrowUp"
              @click="sort('top')"
            >上移</el-button>
            <el-button
              v-permissions="['system:dict:data:sort']"
              :loading="isWorking.sort"
              icon="ArrowDown"
              @click="sort('bottom')"
            >下移</el-button>
          </template>
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="label" label="数据标签" min-width="100px"/>
          <el-table-column prop="value" label="数据值" min-width="150px"/>
          <el-table-column prop="config" label="其它配置" min-width="100px">
            <template #default="{ row }">
              <PopoverCellValue :content="row.config"/>
            </template>
          </el-table-column>
          <el-table-column prop="disabled" label="状态" min-width="100px">
            <template #default="{ row }">
              {{$filters.disabledText(row.disabled)}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="100px">
            <template #default="{ row }">
              <PopoverCellValue :content="row.remark" :with-opera="false"/>
            </template>
          </el-table-column>
          <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
          <el-table-column prop="createdAt" label="创建时间" min-width="165px"/>
          <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
          <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
          <template
            v-if="$hasAnyPermissions([
              'system:dict:data:update',
              'system:dict:data:delete'
            ])"
            #buttons="{ row }"
          >
            <el-button
              v-permissions="['system:dict:data:update']"
              type="primary"
              icon="EditPen"
              @click="$refs.operaDictDataWindow.open('编辑字典数据', searchForm.dictId, row)"
              link
            >编辑</el-button>
            <el-button
              v-permissions="['system:dict:data:delete']"
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
      <OperaDictDataWindow
        ref="operaDictDataWindow"
        @success="handlePageChange(tableData.pagination.pageIndex)"
      />
    </TableLayout>
  </GlobalWindow>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
import OperaDictDataWindow from './OperaDictDataWindow'
export default {
  name: 'DictDataManagerWindow',
  extends: BaseTable,
  components: { OperaDictDataWindow },
  data () {
    return {
      visible: false,
      searchForm: {
        // 字典ID
        dictId: null
      },
      // 是否正在处理中
      isWorking: {
        sort: false
      },
      // 字典名称
      dictName: ''
    }
  },
  methods: {
    /**
     * 打开窗口
     *
     * @param dictId 字典ID
     * @param dictName 字典名称
     */
    open (dictId, dictName) {
      this.searchForm.dictId = dictId
      this.dictName = dictName
      this.visible = true
      this.search()
    },
    /**
     * 排序
     *
     * @param direction 方向，取值[top:上移,bottom:下移]
     */
    sort (direction) {
      if (this.isWorking.sort) {
        return
      }
      if (this.tableData.selectedRows.length === 0) {
        this.$tip.warning('请选择一条数据')
        return
      }
      if (this.tableData.selectedRows.length > 1) {
        this.$tip.warning('排序时仅允许选择一条数据')
        return
      }
      const rowId = this.tableData.selectedRows[0].id
      const index = this.tableData.list.findIndex(item => item.id === rowId)
      // 上移校验
      if (direction === 'top' && index === 0) {
        this.$tip.warning('数据已到顶部')
        return
      }
      // 下移校验
      if (direction === 'bottom' && index === this.tableData.list.length - 1) {
        this.$tip.warning('数据已到底部')
        return
      }
      this.isWorking.sort = true
      this.api.sort({
        id: this.tableData.selectedRows[0].id,
        targetId: direction === 'top'
          ? this.tableData.list[index - 1].id : this.tableData.list[index + 1].id
      })
        .then(() => {
          if (direction === 'top') {
            this.tableData.list.splice(
              index,
              0,
              this.tableData.list.splice(index - 1, 1)[0]
            )
          } else {
            this.tableData.list.splice(
              index,
              0,
              this.tableData.list.splice(index + 1, 1)[0]
            )
          }
        })
        .catch(e => {
          this.$tip.apiFailed(e)
        })
        .finally(() => {
          this.isWorking.sort = false
        })
    }
  },
  async created () {
    this.config({
      'field.main': 'label',
      api: await import('@/api/system/dict.data')
    })
  }
}
</script>

<style scoped lang="scss">
:deep(.window__body) {
  .table-content {
    padding: 0;
    .table-wrap {
      padding-top: 0;
    }
  }
}
</style>
