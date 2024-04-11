<script>
export default {
  name: 'BaseTable',
  data () {
    return {
      // 接口
      api: null,
      // 模块名称
      module: '数据',
      // 配置数据
      configData: {
        // id字段
        'field.id': 'id',
        // 主字段
        'field.main': 'name'
      <#noparse>}</#noparse>,
      // 是否全屏
      fullscreen: false,
      // 是否正在执行
      isWorking: {
        // 搜索中
        search: false,
        // 删除中
        delete: false,
        // 导出中
        export: false
      <#noparse>}</#noparse>,
      // 表格数据
      tableData: {
        // 已选中的数据
        selectedRows: [],
        // 排序的字段
        sorts: [],
        // 当前页数据
        list: [],
        // 分页
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 配置
     *
     * @param extParams 配置参数
     */
    config (extParams) {
      if (extParams == null) {
        throw new Error('Parameter can not be null of method \'config\' .')
      <#noparse>}</#noparse>
      if (extParams.api == null) {
        throw new Error('Missing config option \'api\'.')
      <#noparse>}</#noparse>
      this.api = extParams.api
      extParams.module && (this.module = extParams.module)
      extParams['field.id'] && (this.configData['field.id'] = extParams['field.id'])
      extParams['field.main'] && (this.configData['field.main'] = extParams['field.main'])
      this.tableData.sorts = extParams.sorts
    <#noparse>}</#noparse>,
    /**
     * 搜索（点击搜索按钮时触发）
     */
    search () {
      this.handlePageChange(1)
    <#noparse>}</#noparse>,
    /**
     * 导出Excel（点击导出按钮时触发）
     */
    exportExcel () {
      this.__checkApi()
      this.$dialog.exportConfirm('确认导出吗？')
        .then(() => {
          this.isWorking.export = true
          this.api.exportExcel({
            page: this.tableData.pagination.pageIndex,
            capacity: 1000000,
            model: this.__getSearchForm(),
            sorts: this.tableData.sorts
          <#noparse>}</#noparse>)
            .then(response => {
              this.$download(response)
            <#noparse>}</#noparse>)
            .catch(e => {
              this.$tip.apiFailed(e)
            <#noparse>}</#noparse>)
            .finally(() => {
              this.isWorking.export = false
            <#noparse>}</#noparse>)
        <#noparse>}</#noparse>)
        .catch(() => {<#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 重置搜索条件（点击重置按钮时触发）
     */
    reset () {
      this.$refs.searchForm.resetFields()
      this.search()
    <#noparse>}</#noparse>,
    /**
     * 页容量变更处理（切换页容量时触发）
     *
     * @param pageSize 页容量
     */
    handleSizeChange (pageSize) {
      this.tableData.pagination.pageSize = pageSize
      this.search()
    <#noparse>}</#noparse>,
    /**
     * 行选中处理（点击选中列时触发）
     *
     * @param selectedRows 已选中的行数组
     */
    handleSelectionChange (selectedRows) {
      this.tableData.selectedRows = selectedRows
    <#noparse>}</#noparse>,
    /**
     * 排序（点击列头排序时触发）
     *
     * @param sortData 排序参数
     */
    handleSortChange (sortData) {
      this.tableData.sorts = []
      if (sortData.order != null) {
        this.tableData.sorts.push({
          property: sortData.column.sortBy,
          direction: sortData.order === 'descending' ? 'DESC' : 'ASC'
        <#noparse>}</#noparse>)
      <#noparse>}</#noparse>
      this.handlePageChange()
    <#noparse>}</#noparse>,
    /**
     * 页码变更处理（分页时触发）
     *
     * @param pageIndex 新页码
     */
    handlePageChange (pageIndex) {
      this.__checkApi()
      this.tableData.pagination.pageIndex = pageIndex || this.tableData.pagination.pageIndex
      this.isWorking.search = true
      // 获取接口，优先使用“分页查询”接口，如果没有，则使用“查询所有”接口
      const api = this.api.fetchPage || this.api.fetchAll
      if (api == null) {
        throw new Error('未找到fetchPage或fetchAll的接口定义')
      <#noparse>}</#noparse>
      let params = this.__getSearchForm()
      // 分页查询，携带分页参数
      if (api === this.api.fetchPage) {
        params = {
          page: this.tableData.pagination.pageIndex,
          capacity: this.tableData.pagination.pageSize,
          model: this.__getSearchForm(),
          sorts: this.tableData.sorts
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      // 调用接口
      api(params)
        .then(data => {
          // 分页接口，填充列表数据和分页数据
          if (api === this.api.fetchPage) {
            this.tableData.list = data.records
            this.tableData.pagination.total = data.total
            return
          <#noparse>}</#noparse>
          // 查询所有接口，填充列表数据
          this.tableData.list = data
        <#noparse>}</#noparse>)
        .catch(e => {
          this.$tip.apiFailed(e)
        <#noparse>}</#noparse>)
        .finally(() => {
          this.isWorking.search = false
        <#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 刷新
     */
    refresh () {
      this.handlePageChange(this.tableData.pagination.pageIndex)
    <#noparse>}</#noparse>,
    /**
     * 删除（点击行操作/删除时触发）
     *
     * @param row 行对象
     * @param childConfirm 删除子节点时是否进行二次确认
     */
    deleteById (row, childConfirm = true) {
      this.__checkApi()
      let message = `确认删除<#noparse>${</#noparse>this.module<#noparse>}</#noparse>【<#noparse>${</#noparse>row[this.configData['field.main']]<#noparse>}</#noparse>】吗?`
      if (childConfirm && row.children != null && row.children.length > 0) {
        message = `确认删除<#noparse>${</#noparse>this.module<#noparse>}</#noparse>【<#noparse>${</#noparse>row[this.configData['field.main']]<#noparse>}</#noparse>】及其子<#noparse>${</#noparse>this.module<#noparse>}</#noparse>吗?`
      <#noparse>}</#noparse>
      this.$dialog.deleteConfirm(message)
        .then(() => {
          this.isWorking.delete = true
          this.api.deleteById(row[this.configData['field.id']])
            .then(() => {
              this.__afterDelete()
            <#noparse>}</#noparse>)
            .catch(e => {
              this.$tip.apiFailed(e)
            <#noparse>}</#noparse>)
            .finally(() => {
              this.isWorking.delete = false
            <#noparse>}</#noparse>)
        <#noparse>}</#noparse>)
        .catch(() => {<#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 批量删除（点击批量删除时触发）
     *
     * @param childConfirm 删除子节点时是否进行二次确认
     */
    deleteByIdInBatch (childConfirm = true) {
      this.__checkApi()
      if (this.tableData.selectedRows.length === 0) {
        this.$tip.warning('请至少选择一条数据')
        return
      <#noparse>}</#noparse>
      let message = `确认删除已选中的 <#noparse>${</#noparse>this.tableData.selectedRows.length<#noparse>}</#noparse> 条<#noparse>${</#noparse>this.module<#noparse>}</#noparse>记录吗?`
      if (childConfirm) {
        const containChildrenRows = []
        for (const row of this.tableData.selectedRows) {
          if (row.children != null && row.children.length > 0) {
            containChildrenRows.push(row[this.configData['field.main']])
          <#noparse>}</#noparse>
        <#noparse>}</#noparse>
        if (containChildrenRows.length > 0) {
          message = `本次将删除<#noparse>${</#noparse>this.module<#noparse>}</#noparse>【<#noparse>${</#noparse>containChildrenRows.join('、')<#noparse>}</#noparse>】及其子<#noparse>${</#noparse>this.module<#noparse>}</#noparse>记录，确认删除吗？`
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>
      this.$dialog.deleteConfirm(message)
        .then(() => {
          this.isWorking.delete = true
          this.api.deleteByIdInBatch(this.tableData.selectedRows.map(row => row.id).join(','))
            .then(() => {
              this.__afterDelete(this.tableData.selectedRows.length)
            <#noparse>}</#noparse>)
            .catch(e => {
              this.$tip.apiFailed(e)
            <#noparse>}</#noparse>)
            .finally(() => {
              this.isWorking.delete = false
            <#noparse>}</#noparse>)
        <#noparse>}</#noparse>)
        .catch(() => {<#noparse>}</#noparse>)
    <#noparse>}</#noparse>,
    /**
     * 获取搜索表单对象
     *
     * @returns {*<#noparse>}</#noparse>
     * @private
     */
    __getSearchForm () {
      return this.searchForm
    <#noparse>}</#noparse>,
    /**
     * 删除后处理，在单行删除或多行删除后调用
     *
     * @param deleteCount 删除数量
     * @private
     */
    __afterDelete (deleteCount = 1) {
      this.$tip.apiSuccess('删除成功')
      // 删除当前页最后一条记录时查询上一页数据
      if (this.tableData.list.length - deleteCount === 0) {
        this.handlePageChange(this.tableData.pagination.pageIndex - 1 === 0 ? 1 : this.tableData.pagination.pageIndex - 1)
      <#noparse>}</#noparse> else {
        this.handlePageChange(this.tableData.pagination.pageIndex)
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    /**
     * 检查接口是否配置，在调用接口时调用
     *
     * @private
     */
    __checkApi () {
      if (this.api == null) {
        throw new Error('页面没有使用config方法进行初始化，无法使用BaseTable提供的属性和方法。')
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
