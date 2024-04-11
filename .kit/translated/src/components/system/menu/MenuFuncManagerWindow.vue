<template>
  <GlobalWindow
    v-if="target != null"
    :title="target.name + '功能'"
    width="78%"
    v-model:visible="visible"
    :with-footer="false"
    :wrapper-closable="true"
    :close-on-press-escape="true"
  >
    <TableLayout :authorized="$hasPermissions(['system:menu:func:query'])">
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
              'system:menu:func:create',
              'system:menu:func:delete',
              'system:menu:func:update'
            ])"
            #toolbar
          >
            <el-button
              v-permissions="['system:menu:func:create']"
              type="primary"
              @click="$refs.operaMenuFuncWindow.open('新建功能', target.id)"
              icon="Plus"
            >新建</el-button>
            <el-button
              v-permissions="['system:menu:func:delete']"
              icon="Delete"
              @click="deleteByIdInBatch"
            >删除</el-button>
          </template>
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="name" label="功能名称" min-width="100px"/>
          <el-table-column prop="permission" label="权限标识符" min-width="150px"/>
          <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
          <el-table-column prop="createdAt" label="创建时间" min-width="165px"/>
          <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
          <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
          <template
            v-if="$hasAnyPermissions([
              'system:menu:func:update',
              'system:menu:func:delete'
            ])"
            #buttons="{ row <#noparse>}</#noparse>"
          >
            <el-button
              v-permissions="['system:menu:func:update']"
              type="primary"
              icon="EditPen"
              @click="$refs.operaMenuFuncWindow.open(`编辑<#noparse>${</#noparse>target.name<#noparse>}</#noparse>功能`, target.id, row)"
              link
            >编辑</el-button>
            <el-button
              v-permissions="['system:menu:func:delete']"
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
      <!-- 新建 & 编辑 -->
      <OperaMenuFuncWindow ref="operaMenuFuncWindow" @success="search"/>
    </TableLayout>
  </GlobalWindow>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
import OperaMenuFuncWindow from '@/components/system/menu/OperaMenuFuncWindow'
export default {
  name: 'MenuFuncManagerWindow',
  components: {
    OperaMenuFuncWindow
  <#noparse>}</#noparse>,
  extends: BaseTable,
  data () {
    return {
      visible: false,
      // 菜单数据
      target: null,
      // 是否正在处理中
      isWorking: {
        sort: false
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 打开窗口
     *
     * @param target 菜单数据
     */
    open (target) {
      this.target = target
      this.visible = true
      this.search()
    <#noparse>}</#noparse>,
    /**
     * 覆盖获取搜索表单对象，填充菜单ID
     *
     * @returns {*<#noparse>}</#noparse>
     * @private
     */
    __getSearchForm () {
      return {
        menuId: this.target.id
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      module: '功能',
      api: await import('@/api/system/menu.func'),
      'field.main': 'name'
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
