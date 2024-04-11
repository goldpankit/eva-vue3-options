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
            <template #default="{ row <#noparse>}</#noparse>">
              <PopoverCellValue :content="row.config"/>
            </template>
          </el-table-column>
          <el-table-column prop="disabled" label="状态" min-width="100px">
            <template #default="{ row <#noparse>}</#noparse>">
              {{$filters.disabledText(row.disabled)<#noparse>}</#noparse><#noparse>}</#noparse>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="100px">
            <template #default="{ row <#noparse>}</#noparse>">
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
            #buttons="{ row <#noparse>}</#noparse>"
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
  components: { OperaDictDataWindow <#noparse>}</#noparse>,
  data () {
    return {
      visible: false,
      searchForm: {
        // 字典ID
        dictId: null
      <#noparse>}</#noparse>,
      // 是否正在处理中
      isWorking: {
        sort: false
      <#noparse>}</#noparse>,
      // 字典名称
      dictName: ''
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
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
    <#noparse>}</#noparse>,
    /**
     * 排序
     *
     * @param direction 方向，取值[top:上移,bottom:下移]
     */
    sort (direction) {
      if (this.isWorking.sort) {
        return
      <#noparse>}</#noparse>
      if (this.tableData.selectedRows.length === 0) {
        this.$tip.warning('请选择一条数据')
        return
      <#noparse>}</#noparse>
      if (this.tableData.selectedRows.length > 1) {
        this.$tip.warning('排序时仅允许选择一条数据')
        return
      <#noparse>}</#noparse>
      const rowId = this.tableData.selectedRows[0].id
      const index = this.tableData.list.findIndex(item => item.id === rowId)
      // 上移校验
      if (direction === 'top' && index === 0) {
        this.$tip.warning('数据已到顶部')
        return
      <#noparse>}</#noparse>
      // 下移校验
      if (direction === 'bottom' && index === this.tableData.list.length - 1) {
        this.$tip.warning('数据已到底部')
        return
      <#noparse>}</#noparse>
      this.isWorking.sort = true
      this.api.sort({
        id: this.tableData.selectedRows[0].id,
        targetId: direction === 'top'
          ? this.tableData.list[index - 1].id : this.tableData.list[index + 1].id
      <#noparse>}</#noparse>)
        .then(() => {
          if (direction === 'top') {
            this.tableData.list.splice(
              index,
              0,
              this.tableData.list.splice(index - 1, 1)[0]
            )
          <#noparse>}</#noparse> else {
            this.tableData.list.splice(
              index,
              0,
              this.tableData.list.splice(index + 1, 1)[0]
            )
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
        .finally(() => {
          this.isWorking.sort = false
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      api: await import('@/api/system/dict.data'),
      'field.main': 'label'
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
:deep(.window__body) {
  .table-content {
    padding: 0;
    .table-wrap {
      padding-top: 0;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
