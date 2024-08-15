<template>
  <TableLayout
    :authorized="$hasPermissions(['system:loginLog:query'])"
    :fullscreen="fullscreen"
  >
    <!-- 搜索表单 -->
    <template #search-form>
      <SearchForm ref="searchForm" :model="searchForm" :collapse="true" buttons-width="275px">
        <el-form-item label="登录用户名" prop="loginUsername">
          <el-input v-model="searchForm.loginUsername" placeholder="请输入登录用户名" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="登录IP" prop="ip">
          <el-input v-model="searchForm.ip" placeholder="请输入登录IP" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="服务器IP" prop="serverIp">
          <el-input v-model="searchForm.serverIp" placeholder="请输入服务器IP" @keypress.enter="search"></el-input>
        </el-form-item>
        <el-form-item label="登录状态" prop="success">
          <el-select v-model="searchForm.success" placeholder="请选择登录状态" clearable @change="search">
            <el-option value="true" label="登录成功"/>
            <el-option value="false" label="登录失败"/>
          </el-select>
        </el-form-item>
        <el-form-item label="登录时间" prop="loginTime">
          <el-date-picker
            v-model="searchForm.loginTime"
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
    <!-- 表格和分页 -->
    <template #table-wrap>
      <SearchTable
        v-loading="isWorking.search"
        :data="tableData.list"
        :default-sort="{ prop: 'loginTime', order: 'descending' }"
        :with-opera-column="false"
        v-model:fullscreen="fullscreen"
        @refresh="refresh"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="loginUsername" label="登录用户名" min-width="100px"/>
        <el-table-column prop="ip" label="登录IP" min-width="120px"/>
        <el-table-column prop="location" label="登录地址" min-width="160px"/>
        <el-table-column prop="clientInfo" label="客户端" min-width="160px"/>
        <el-table-column prop="osInfo" label="操作系统" min-width="100px"/>
        <el-table-column prop="platform" label="登录平台" min-width="100px"/>
        <el-table-column
          prop="loginTime"
          label="登录时间"
          min-width="165px"
          sortable="custom"
          sort-by="LOGIN_TIME"
        ></el-table-column>
        <el-table-column prop="systemVersion" label="系统版本" min-width="100px"/>
        <el-table-column prop="serverIp" label="服务器IP" min-width="120px"/>
        <el-table-column prop="success" label="状态" min-width="100px">
          <template #default="{ row }">
            {{statusText(row.success)}}
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="失败原因" min-width="160px">
          <template #default="{ row }">
            <PopoverCellValue :content="row.reason"/>
          </template>
        </el-table-column>
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
import BaseTable from '@/components/base/BaseTable'

export default {
  extends: BaseTable,
  data () {
    return {
      // 搜索
      searchForm: {
        loginUsername: '',
        ip: '',
        serverIp: '',
        success: '',
        loginTime: []
      }
    }
  },
  methods: {
    /**
     * 重写__getSearchForm方法，实现覆盖搜索条件参数
     * @private
     */
    __getSearchForm () {
      const searchForm = JSON.parse(JSON.stringify(this.searchForm))
      if (searchForm.loginTime != null) {
        searchForm.loginTime = {
          start: searchForm.loginTime[0],
          end: searchForm.loginTime[1]
        }
      }
      return searchForm
    },
    /**
     * 登录状态
     *
     * @param value 登录状态
     */
    statusText (value) {
      if (value) {
        return '登录成功'
      }
      return '登录失败'
    }
  },
  async created () {
    this.config({
      module: '登录日志',
      api: await import('@/api/system/login.log'),
      sorts: [{
        property: 'LOGIN_TIME',
        direction: 'DESC'
      }]
    })
    this.search()
  }
}
</script>
