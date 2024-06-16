<template>
  <GlobalWindow
    :title="title"
    v-model:visible="visible"
    width="750px"
    :confirm-working="isWorking.create"
    @confirm="confirm"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="数据值" prop="value" required>
        <el-input v-model="form.value" placeholder="请输入数据值" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="数据标签" prop="label" required>
        <el-input v-model="form.label" placeholder="请输入数据标签" v-trim maxlength="50"/>
      </el-form-item>
      <el-form-item label="其它配置" prop="config">
        <el-input type="textarea" v-model="form.config" placeholder="请输入数据标签"/>
        <FormItemTip>其它配置用于针对数据值进行更具体的配置，以方便直接根据配置做业务处理！</FormItemTip>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" :rows="5" show-word-limit placeholder="请输入备注" v-trim maxlength="200"/>
      </el-form-item>
      <el-form-item label="状态" prop="disabled" required class="form-item-status">
        <el-switch v-model="form.disabled" :active-value="false" :inactive-value="true"/>
        <span class="status-text">{{$filters.disabledText(form.disabled)}}</span>
      </el-form-item>
    </el-form>
  </GlobalWindow>
</template>

<script>
import BaseOpera from '@/components/base/BaseOpera'
export default {
  name: 'OperaDictDataWindow',
  extends: BaseOpera,
  data () {
    return {
      // 表单数据
      form: {
        id: null,
        dictId: null,
        value: '',
        label: '',
        config: '',
        disabled: false,
        remark: ''
      },
      // 验证规则
      rules: {
        label: [
          { required: true, message: '请输入数据标签' }
        ],
        value: [
          { required: true, message: '请输入数据值' }
        ]
      }
    }
  },
  methods: {
    /**
     * 打开窗口
     *
     * @param title 窗口标题
     * @param dictId 所属字典ID
     * @param target 行对象（仅编辑需该参数）
     */
    open (title, dictId, target) {
      this.title = title
      this.visible = true
      // 新建
      if (target == null) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = null
          this.form.dictId = dictId
        })
        return
      }
      // 编辑
      this.$nextTick(() => {
        for (const key in this.form) {
          this.form[key] = target[key]
        }
      })
    }
  },
  async created () {
    this.config({
      api: await import('@/api/system/dict.data')
    })
  }
}
</script>

<style scoped lang="scss">
.form-item-status {
  .el-form-item__content > * {
    width: auto !important;
  }
  .status-text {
    color: #999;
    margin-left: 6px;
    font-size: 13px;
    vertical-align: middle;
  }
}
</style>
