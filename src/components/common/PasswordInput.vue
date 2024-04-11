<template>
  <div class="password-input">
    <el-input
      :class="{ 'use-text': withoutAutoFill }"
      :type="type"
      :model-value="modelValue"
      :maxlength="maxlength"
      :show-password="withShowPassword && type === 'password'"
      autocomplete="new-password"
      @input="$emit('update:modelValue', $event)"
      @keydown.enter="$emit('enter', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    modelValue: {},
    // 是否允许显示密码操作
    withShowPassword: {
      type: Boolean,
      default: true
    },
    // 不自动填充，仅chrome内核和safari支持（禁用浏览器在密码框聚焦时弹出密码列表，同时也会禁用浏览器密码的自动保存）
    withoutAutoFill: {
      type: Boolean,
      default: true
    },
    // 最大长度
    maxlength: {
      type: Number
    }
  },
  data () {
    return {
      type: 'text',
      showPassword: false
    }
  },
  mounted () {
    // 允许浏览器自动填充
    if (!this.withoutAutoFill) {
      this.type = 'password'
      return
    }
    // 延迟防止浏览器自动填充
    setTimeout(() => {
      this.type = 'password'
    }, 700)
  }
}
</script>

<style scoped lang="scss">
.password-input {
  position: relative;
  flex-grow: 1;
}
</style>
