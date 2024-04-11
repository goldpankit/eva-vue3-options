<template>
  <div class="table-pagination">
    <el-pagination
      :current-page="pagination.pageIndex"
      :page-sizes="pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="sizeChange"
      @current-change="currentChange"
      background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      default: function () {
        return {<#noparse>}</#noparse>
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>,
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30, 40]
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    return {
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  methods: {
    /**
     * 页容量变更
     *
     * @param value 新页容量
     */
    sizeChange (value) {
      this.$emit('size-change', value)
    <#noparse>}</#noparse>,
    /**
     * 页码变更
     *
     * @param value 新页码
     */
    currentChange (value) {
      this.$emit('current-change', value)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
