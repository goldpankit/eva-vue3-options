<template>
  <TableLayout
    :authorized="$hasPermissions(['system:menu:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 表格和分页 -->
    <template #table-wrap>
      <SearchTable
        ref="table"
        v-loading="isWorking.search"
        row-key="id"
        buttons-width="250px"
        :data="tableData.list"
        :default-expand-all="true"
        v-model:fullscreen="fullscreen"
        @refresh="refresh"
        @selection-change="handleSelectionChange"
      >
        <template
          v-if="$hasAnyPermissions([
            'system:menu:create',
            'system:menu:delete',
            'system:menu:sort'
          ])"
          #toolbar
        >
          <el-button
            v-permissions="['system:menu:create']"
            type="primary"
            icon="Plus"
            @click="$refs.operaMenuWindow.open('新建菜单')"
          >新建</el-button>
          <el-button
            v-permissions="['system:menu:delete']"
            icon="Delete"
            @click="deleteByIdInBatch"
          >删除</el-button>
          <el-button
            v-permissions="['system:menu:sort']"
            :loading="isWorking.sort"
            icon="ArrowUp"
            @click="sort('top')"
          >上移</el-button>
          <el-button
            v-permissions="['system:menu:sort']"
            :loading="isWorking.sort"
            icon="ArrowDown"
            @click="sort('bottom')"
          >下移</el-button>
          <el-button
            v-permissions="['system:menu:icon:query']"
            class="iconfont icon-icon"
            @click="$refs.menuIconTableWindow.open()"
          >菜单图标</el-button>
        </template>
        <el-table-column type="selection" width="55" fixed="left"/>
        <el-table-column
          prop="name"
          label="菜单"
          fixed="left"
          min-width="200px"
          class-name="column-menu-name"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <Icon v-if="row.icon != null" :data="row.icon" size="16px"/>
            <span>{{ row.name <#noparse>}</#noparse><#noparse>}</#noparse></span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="菜单类型" min-width="100px">
          <template #default="{ row <#noparse>}</#noparse>">
            {{ $d(`MENU_TYPES.<#noparse>${</#noparse>row.type<#noparse>}</#noparse>`) <#noparse>}</#noparse><#noparse>}</#noparse>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识符" min-width="160px"/>
        <el-table-column prop="uri" label="访问路径" min-width="140px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue :content="row.uri"/>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="120px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue :content="row.remark" :with-opera="false"/>
          </template>
        </el-table-column>
        <el-table-column prop="creatorRealName" label="创建人" min-width="100px"/>
        <el-table-column prop="createdAt" label="创建时间" min-width="165px"/>
        <el-table-column prop="updaterRealName" label="更新人" min-width="100px"/>
        <el-table-column prop="updatedAt" label="更新时间" min-width="165px"/>
        <el-table-column
          v-if="$hasPermissions(['system:menu:update'])"
          prop="disabled"
          label="是否启用"
          min-width="80px"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <el-switch
              v-model="row.disabled"
              :active-value="false"
              :inactive-value="true"
              @change="switchDisabled(row)"
            />
          </template>
        </el-table-column>
        <template
          v-if="$hasAnyPermissions([
            'system:menu:update',
            'system:menu:create',
            'system:menu:delete'
          ])"
          #buttons="{ row <#noparse>}</#noparse>"
        >
          <el-button
            v-if="row.type === 'DIR'"
            v-permissions="['system:menu:create']"
            type="primary"
            icon="Plus"
            @click="$refs.operaMenuWindow.open('新建菜单', null, row)"
            link
          >新建子菜单</el-button>
          <el-button
            v-if="row.type === 'SYSTEM'"
            v-permissions="['system:menu:func:query']"
            type="primary"
            icon="Edit"
            @click="$refs.menuFuncManagerWindow.open(row)"
            link
          >功能管理</el-button>
          <el-button
            v-permissions="['system:menu:update']"
            type="primary"
            icon="EditPen"
            @click="$refs.operaMenuWindow.open('编辑菜单', row)"
            link
          >编辑</el-button>
          <el-button
            v-if="!row.fixed"
            v-permissions="['system:menu:delete']"
            type="danger"
            icon="Delete"
            @click="deleteById(row)"
            link
          >删除</el-button>
        </template>
      </SearchTable>
    </template>
    <!-- 新建/修改 -->
    <OperaMenuWindow
      ref="operaMenuWindow"
      @success="handlePageChange()"
    />
    <!-- 功能管理 -->
    <MenuFuncManagerWindow ref="menuFuncManagerWindow"/>
    <!-- 菜单图标管理 -->
    <MenuIconTableWindow ref="menuIconTableWindow"/>
  </TableLayout>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
import OperaMenuWindow from '@/components/system/menu/OperaMenuWindow'
import MenuFuncManagerWindow from '@/components/system/menu/MenuFuncManagerWindow'
import MenuIconTableWindow from '@/components/system/menu/MenuIconTableWindow'
import { updateStatus, sort <#noparse>}</#noparse> from '@/api/system/menu'
export default {
  extends: BaseTable,
  components: {
    MenuIconTableWindow,
    MenuFuncManagerWindow,
    OperaMenuWindow
  <#noparse>}</#noparse>,
  data () {
    return {
      // 是否正在处理中
      isWorking: {
        sort: false
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 排序
     *
     * @param direction 方向，取值[top:上移, bottom:下移]
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
      const menuId = this.tableData.selectedRows[0].id
      // 找到菜单范围
      let menuPool
      for (const rootMenu of this.tableData.list) {
        const parent = this.__findParent(menuId, rootMenu)
        if (parent != null) {
          menuPool = parent.children
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      menuPool = menuPool || this.tableData.list
      const menuIndex = menuPool.findIndex(menu => menu.id === menuId)
      // 上移校验
      if (direction === 'top' && menuIndex === 0) {
        this.$tip.warning('菜单已到顶部')
        return
      <#noparse>}</#noparse>
      // 下移校验
      if (direction === 'bottom' && menuIndex === menuPool.length - 1) {
        this.$tip.warning('菜单已到底部')
        return
      <#noparse>}</#noparse>
      this.isWorking.sort = true
      sort({
        id: this.tableData.selectedRows[0].id,
        targetId: direction === 'top'
          ? menuPool[menuIndex - 1].id : menuPool[menuIndex + 1].id
      <#noparse>}</#noparse>)
        .then(() => {
          if (direction === 'top') {
            menuPool.splice(menuIndex, 0, menuPool.splice(menuIndex - 1, 1)[0])
          <#noparse>}</#noparse> else {
            menuPool.splice(menuIndex, 0, menuPool.splice(menuIndex + 1, 1)[0])
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
        .finally(() => {
          this.isWorking.sort = false
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 启用/禁用
     *
     * @param row 行对象
     */
    switchDisabled (row) {
      const newValue = row.disabled
      row.disabled = !row.disabled
      // 开启
      if (!newValue) {
        this.__updateMenuStatus(row, newValue)
        return
      <#noparse>}</#noparse>
      // 禁用
      this.$dialog.disableConfirm(`确认禁用 <#noparse>${</#noparse>row.name<#noparse>}</#noparse> 菜单吗？`)
        .then(() => {
          this.__updateMenuStatus(row, newValue)
        <#noparse>}</#noparse>)
        .catch(() => {
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 查询父节点
     *
     * @param id 节点ID
     * @param parent 在哪个父节点中进行查找
     * @returns {null|{children<#noparse>}</#noparse>|*|*|undefined|null<#noparse>}</#noparse>
     * @private
     */
    __findParent (id, parent) {
      if (parent.children == null || parent.children.length === 0) {
        return
      <#noparse>}</#noparse>
      for (const row of parent.children) {
        if (row.id === id) {
          return parent
        <#noparse>}</#noparse>
        if (row.children.length > 0) {
          const target = this.__findParent(id, row)
          if (target != null) {
            return target
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      return null
    <#noparse>}</#noparse>,
    /**
     * 修改菜单状态
     *
     * @param row 行对象
     * @param newValue 新值
     * @private
     */
    __updateMenuStatus (row, newValue) {
      updateStatus({
        id: row.id,
        parentId: row.parentId,
        disabled: newValue
      <#noparse>}</#noparse>)
        .then(() => {
          row.disabled = newValue
          this.$tip.apiSuccess('修改成功')
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      module: '菜单',
      api: await import('@/api/system/menu')
    <#noparse>}</#noparse>)
    this.search()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style lang="scss" scoped>
.table-layout {
  :deep(.table-content) {
    margin-top: 0;
    .table-wrap {
      padding-bottom: 16px;
      // 菜单列
      .column-menu-name .cell{
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
