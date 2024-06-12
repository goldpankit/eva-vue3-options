<script>
export default {
  name: 'BaseComponent',
  methods: {
    // 计算属性
    computeProp (propName) {
      if (typeof this[propName] === 'function') {
        return this[propName]()
      }
      return this[propName]
    }
  }
}
</script>
