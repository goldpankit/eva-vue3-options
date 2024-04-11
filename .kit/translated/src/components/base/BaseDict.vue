<script>
export default {
  props: {
    // 值
    value: {<#noparse>}</#noparse>,
    // 字典编码
    code: {
      type: String,
      required: true
    <#noparse>}</#noparse>,
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  computed: {
    // 字典数据列表，从客户端配置中读取字典列表并根据code找到对应字典和字典数据
    dataList () {
      const clientConfig = this.$defaultStore.clientConfig
      if (
        clientConfig == null ||
        clientConfig.dictList == null ||
        clientConfig.dictList.length === 0
      ) {
        return []
      <#noparse>}</#noparse>
      const dict = clientConfig.dictList.find(dict => dict.code === this.code)
      if (dict == null) {
        return []
      <#noparse>}</#noparse>
      return dict.dataList.filter(data => !data.disabled)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
