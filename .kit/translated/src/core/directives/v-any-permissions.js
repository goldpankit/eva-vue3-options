import authorizer from '@/core/authorize'

export default {
  mounted (el, binding) {
    if (!authorizer.hasAnyPermissions(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
