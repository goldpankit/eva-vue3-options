import authorizer from '@/core/authorize'

export default {
  inserted: function (el, binding) {
    if (!authorizer.hasAnyRoles(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
