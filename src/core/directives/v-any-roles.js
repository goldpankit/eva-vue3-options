import authorizer from '@/core/authorize'

export default {
  mounted (el, binding) {
    if (!authorizer.hasAnyRoles(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
