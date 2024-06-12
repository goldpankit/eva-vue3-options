<template>
  <ul class="colors-marking">
    <li
      v-for="item in computedData"
      :key="item.label"
    >
      <span
        :style="`border: 1px solid ${item.borderColor}; background-color: ${item.backgroundColor}`"
      ></span>
      <label>{{ item.label }}</label>
    </li>
  </ul>
</template>

<script>
import BaseComponent from '@/components/BaseComponent'

export default {
  name: 'ColorsMarking',
  extends: BaseComponent,
  props: {
    data: {
      required: true
    }
  },
  computed: {
    computedData () {
      return this.computeProp('data')
    }
  }
}
</script>

<style scoped lang="scss">
.colors-marking {
  padding: 10px 16px;
  display: flex;
  & > li {
    font-size: 13px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    & > span {
      display: inline-block;
      content: '';
      width: 36px;
      height: 14px;
      margin-right: 6px;
    }
  }
}
</style>
