import authorizer from '@/core/authorize'

export default {
  inserted: function (el, binding) {
    if (!authorizer.hasRoles(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
