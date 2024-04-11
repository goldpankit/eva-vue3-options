<template>
  <TableLayout
    :authorized="$hasPermissions(['system:traceLog:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm
        ref="searchForm"
        :collapse="true"
        :model="searchForm"
        label-width="100px"
      >
        <el-form-item label="操作人姓名" prop="userRealName">
          <el-input v-model="searchForm.userRealName" placeholder="请输入操作人姓名" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="业务模块" prop="operaModule">
          <el-input v-model="searchForm.operaModule" placeholder="请输入业务模块" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="请求地址" prop="requestUri">
          <el-input v-model="searchForm.requestUri" placeholder="请输入请求地址" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <DictSelect
            code="TRACE_LOG_STATUSES"
            v-model="searchForm.status"
            :clearable="true"
            @change="search"
          />
        </el-form-item>
        <el-form-item label="异常等级" prop="exceptionLevel">
          <DictSelect
            code="TRACE_LOG_EXCEPTION_LEVEL"
            v-model="searchForm.exceptionLevel"
            :clearable="true"
            @change="search"
          />
        </el-form-item>
        <el-form-item label="操作时间范围" prop="operaTime">
          <el-date-picker
            v-model="searchForm.operaTime"
            type="datetimerange"
            range-separator="至"
            value-format="YYYY/MM/DD hh:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="search"
          ></el-date-picker>
        </el-form-item>
        <template #buttons>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button
            type="primary"
            :loading="isWorking.export"
            @click="exportExcel"
          >导出</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </SearchForm>
    </template>
    <template #space>
      <div class="status-bar">
        <label class="status-normal">正常</label>
        <label class="status-warn">警告异常(需排查)</label>
        <label class="status-danger">系统异常(需修复)</label>
      </div>
    </template>
    <!-- 表格和分页 -->
    <template #table-wrap>
      <SearchTable
        v-loading="isWorking.search"
        :data="tableData.list"
        :default-sort="{prop: 'operaTime', order: 'descending'<#noparse>}</#noparse>"
        :row-class-name="tableRowClassName"
        :with-opera-column="false"
        v-model:fullscreen="fullscreen"
        @refresh="refresh"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="operaModule" label="业务模块" min-width="100px"/>
        <el-table-column prop="operaRemark" label="操作说明" min-width="120px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue :content="row.operaRemark" :with-opera="false"/>
          </template>
        </el-table-column>
        <el-table-column prop="requestMethod" label="请求方式" min-width="80px"/>
        <el-table-column prop="requestUri" label="请求地址" min-width="200px"/>
        <el-table-column prop="status" label="状态" min-width="80px">
          <template #default="{ row <#noparse>}</#noparse>">
            {{$d(`TRACE_LOG_STATUSES.<#noparse>${</#noparse>row.status<#noparse>}</#noparse>`)<#noparse>}</#noparse><#noparse>}</#noparse>
          </template>
        </el-table-column>
        <el-table-column v-if="userInfo.isSuperAdmin" prop="requestParams" label="请求参数" min-width="150px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue :content="row.requestParams"/>
          </template>
        </el-table-column>
        <el-table-column v-if="userInfo.isSuperAdmin" prop="requestResult" label="请求结果" min-width="150px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue :content="row.requestResult"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="exceptionLevel"
          label="异常等级"
          sortable="custom"
          sort-by="EXCEPTION_LEVEL"
          min-width="120px"
        >
          <template #default="{ row <#noparse>}</#noparse>">
            <template v-if="row.exceptionLevel != null" >
              {{$d(`TRACE_LOG_EXCEPTION_LEVEL.<#noparse>${</#noparse>row.exceptionLevel<#noparse>}</#noparse>`)<#noparse>}</#noparse><#noparse>}</#noparse>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="exceptionStack" label="异常信息" min-width="120px">
          <template #default="{ row <#noparse>}</#noparse>">
            <PopoverCellValue
              :content="row.exceptionStack"
              content-type="danger"
              :button-type="getExceptionButtonType(row.exceptionLevel)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="operaDuration"
          label="请求耗时(ms)"
          sortable="custom"
          sort-by="OPERA_DURATION"
          min-width="150px"
        ></el-table-column>
        <el-table-column prop="userRealName" label="操作人" min-width="100px"/>
        <el-table-column
          prop="operaTime"
          label="操作时间"
          sortable="custom"
          sort-by="OPERA_TIME"
          min-width="165px"
        />
        <el-table-column prop="platform" label="操作平台" min-width="100px"/>
        <el-table-column prop="systemVersion" label="系统版本" min-width="80px"/>
        <el-table-column prop="serverIp" label="处理服务器IP" min-width="150px"/>
        <el-table-column prop="ip" label="用户IP" min-width="150px"/>
        <el-table-column prop="clientInfo" label="用户客户端" min-width="200px"/>
        <el-table-column prop="osInfo" label="用户操作系统" min-width="120px"/>
      </SearchTable>
      <pagination
        :pagination="tableData.pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </template>
  </TableLayout>
</template>

<script>
import { mapState <#noparse>}</#noparse> from 'pinia'
import BaseTable from '@/components/base/BaseTable'
import { useDefaultStore <#noparse>}</#noparse> from '@/core/store'

export default {
  extends: BaseTable,
  data () {
    return {
      // 搜索
      searchForm: {
        userRealName: '',
        operaModule: '',
        requestUri: '',
        status: null,
        exceptionLevel: null,
        operaTime: []
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    ...mapState(useDefaultStore, ['userInfo'])
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 重写__getSearchForm方法，实现覆盖搜索条件参数
     * @private
     */
    __getSearchForm () {
      const searchForm = JSON.parse(JSON.stringify(this.searchForm))
      if (searchForm.operaTime != null) {
        searchForm.operaTime = {
          start: searchForm.operaTime[0],
          end: searchForm.operaTime[1]
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      return searchForm
    <#noparse>}</#noparse>,
    /**
     * 标记行class
     *
     * @param row 行对象
     * @returns {string<#noparse>}</#noparse>
     */
    tableRowClassName ({ row <#noparse>}</#noparse>) {
      if (row.exceptionLevel === 5 || row.status === -1) {
        return 'warning-log'
      <#noparse>}</#noparse>
      if (row.exceptionLevel === 10) {
        return 'danger-log'
      <#noparse>}</#noparse>
      return ''
    <#noparse>}</#noparse>,
    /**
     * 获取异常查看按钮类型
     *
     * @param level 异常等级
     * @returns {string|null<#noparse>}</#noparse>
     */
    getExceptionButtonType (level) {
      if (level === 5) {
        return 'warning'
      <#noparse>}</#noparse>
      if (level === 10) {
        return 'danger'
      <#noparse>}</#noparse>
      return null
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      api: await import('@/api/system/trace.log'),
      sorts: [{
        property: 'OPERA_TIME',
        direction: 'DESC'
      <#noparse>}</#noparse>]
    <#noparse>}</#noparse>)
    this.search()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
// 状态栏
.status-bar {
  padding: 0 16px;
  [class^=status-] {
    font-size: 13px;
    margin-right: 12px;
    line-height: 40px;
    &::before {
      position: relative;
      top: 2px;
      display: inline-block;
      content: '';
      width: 12px;
      height: 12px;
      border: 1px solid #ccc;
      background: #fff;
      margin-right: 6px;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
  .status-warn::before {
    background-color: oldlace;
    border-color: orange;
  <#noparse>}</#noparse>
  .status-danger::before {
    background-color: #fdf0f0;
    border-color: indianred;
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
:deep(.table-content) {
  margin-top: 0;
<#noparse>}</#noparse>
// 警告级日志
:deep(.warning-log) td {
  background-color: oldlace !important;
<#noparse>}</#noparse>
// 危险级日志
:deep(.danger-log) td {
  background-color: #fdf0f0 !important;
<#noparse>}</#noparse>
</style>
