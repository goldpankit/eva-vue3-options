<script>
export default {
  name: 'BaseOpera',
  data () {
    return {
      title: '',
      visible: false,
      isWorking: false,
      // 接口
      api: null,
      // 配置数据
      configData: {
        'field.id': 'id'
      }
    }
  },
  methods: {
    /**
     * 配置
     *
     * @param extParams 配置参数
     */
    config (extParams = {}) {
      if (extParams == null) {
        throw new Error('Parameter can not be null of method \'config\' .')
      }
      if (extParams.api == null) {
        throw new Error('Missing config option \'api\'.')
      }
      this.api = extParams.api
      extParams['field.id'] && (this.configData['field.id'] = extParams['field.id'])
    },
    /**
     * 打开窗口
     *
     * @param title 窗口标题
     * @param target 行对象（仅编辑需该参数）
     */
    open (title, target) {
      this.title = title
      this.visible = true
      // 新建
      if (target == null) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form[this.configData['field.id']] = null
        })
        return
      }
      // 编辑
      this.$nextTick(() => {
        for (const key in this.form) {
          this.form[key] = target[key]
        }
      })
    },
    /**
     * 确认（点击确认按钮后触发）
     */
    confirm () {
      if (this.form[this.configData['field.id']] == null || this.form[this.configData['field.id']] === '') {
        this.__confirmCreate()
        return
      }
      this.__confirmEdit()
    },
    /**
     * 确认新建
     *
     * @private
     */
    __confirmCreate () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        // 调用新建接口
        this.isWorking = true
        this.api.create(this.__getForm())
          .then(() => {
            this.visible = false
            this.$tip.apiSuccess('新建成功')
            this.$emit('success')
          })
          .catch(e => {
            this.$tip.apiFailed(e)
          })
          .finally(() => {
            this.isWorking = false
          })
      })
    },
    /**
     * 确认修改
     *
     * @private
     */
    __confirmEdit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        // 调用更新接口
        this.isWorking = true
        this.api.updateById(this.__getForm())
          .then(() => {
            this.visible = false
            this.$tip.apiSuccess('修改成功')
            this.$emit('success')
          })
          .catch(e => {
            this.$tip.apiFailed(e)
          })
          .finally(() => {
            this.isWorking = false
          })
      })
    },
    /**
     * 获取新增编辑表单对象
     * @returns {*}
     * @private
     */
    __getForm () {
      return this.form
    }
  }
}
</script>
