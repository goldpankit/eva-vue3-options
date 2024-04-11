<template>
  <GlobalWindow
    class="handle-table-dialog"
    :title="title"
    width="750px"
    v-model:visible="visible"
    :confirm-working="isWorking"
    @confirm="confirm"
  >
    <p class="tip" v-if="form.parent != null && form.id == null">为 <em>{{parentName<#noparse>}</#noparse><#noparse>}</#noparse></em> 新建子菜单</p>
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="上级菜单" prop="parentId">
        <MenuSelect
          v-if="visible"
          v-model="form.parentId"
          placeholder="请选择上级菜单"
          :exclude-id="excludeMenuId"
          :clearable="true"
          :inline="false"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name" required>
        <el-input v-model="form.name" placeholder="请输入菜单名称" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" required>
        <DictRadioGroup code="MENU_TYPES" v-model="form.type"/>
      </el-form-item>
      <el-form-item v-if="form.type !== 'DIR'" label="访问路径" prop="uri" required>
        <el-input v-model="form.uri" placeholder="请输入访问路径" v-trim maxlength="200"/>
      </el-form-item>
      <el-form-item v-if="form.type !== 'DIR'" label="权限标识符" prop="permission">
        <el-input
          v-model="form.permission"
          placeholder="请输入权限标识符"
          v-trim
          maxlength="100"
        />
        <FormItemTip>若该菜单需要进行权限控制，请填写权限标识符！注意：标识符为全局唯一的字符串。</FormItemTip>
      </el-form-item>
      <el-form-item label="图标" prop="iconId" class="form-item-icon">
        <IconSelect v-if="visible" ref="iconSelect" v-model:value="form.iconId"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" placeholder="请输入菜单备注" v-trim :rows="3" maxlength="500"/>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
import MenuSelect from './MenuSelect'
import IconSelect from '@/components/common/IconSelect'
export default {
  name: 'OperaMenuWindow',
  extends: BaseOpera,
  components: { IconSelect, MenuSelect <#noparse>}</#noparse>,
  methods: {
    /**
     * 打开窗口
     *
     * @param title: 窗口标题
     * @param target: 行对象（仅编辑需该参数）
     * @param parent: 新建时的上级菜单
     */
    open (title, target, parent) {
      this.title = title
      this.visible = true
      // 新建，menu为空时表示新建菜单
      if (target == null) {
        this.excludeMenuId = null
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = null
          this.form.parentId = parent == null ? null : parent.id
          this.parentName = parent == null ? null : parent.name
        <#noparse>}</#noparse>)
        return
      <#noparse>}</#noparse>
      // 编辑
      this.$nextTick(() => {
        this.excludeMenuId = target.id
        for (const key in this.form) {
          this.form[key] = target[key]
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  data () {
    const _this = this
    return {
      // 上级菜单名称
      parentName: '',
      // 需排除选择的菜单ID
      excludeMenuId: null,
      // 表单数据
      form: {
        id: null,
        parentId: null,
        name: '',
        type: _this.$c('DEFAULT_MENU_TYPE'),
        uri: '',
        permission: '',
        iconId: null,
        remark: ''
      <#noparse>}</#noparse>,
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入菜单名称' <#noparse>}</#noparse>
        ],
        uri: [
          { required: true, message: '访问路径不能为空' <#noparse>}</#noparse>
        ]
      <#noparse>}</#noparse>
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>,
  async created () {
    this.config({
      api: await import('@/api/system/menu')
    <#noparse>}</#noparse>)
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>

<style scoped lang="scss">
.global-window {
  .tip {
    margin-bottom: 12px;
    em {
      font-style: normal;
      color: var(--color-primary);
      font-weight: bold;
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</style>
