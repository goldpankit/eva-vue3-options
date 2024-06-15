<script>
export default {
  name: 'BaseComponent',
  methods: {
    // 计算属性
    computeProp (propName) {
      if (typeof this[propName] === 'function') {
        return this[propName]()
      <#noparse>}</#noparse>
      return this[propName]
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
</script>
