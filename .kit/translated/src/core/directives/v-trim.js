export default {
  mounted (el) {
    let input = el
    let classes = input.getAttribute('class') || ''
    if (classes != null) {
      classes = classes.split(' ')
    <#noparse>}</#noparse>
    if (classes == null) {
      classes = ''
    <#noparse>}</#noparse>
    // 输入框：<el-input/>
    if (classes.indexOf('el-input') > -1) {
      input = input.querySelector('input')
    <#noparse>}</#noparse>
    // 多行输入框：<el-input type="textarea"/>
    if (classes.indexOf('el-textarea') > -1) {
      input = input.querySelector('textarea')
    <#noparse>}</#noparse>
    // 失去焦点时去掉两侧空格
    input.addEventListener('blur', (e) => {
      e.target.value = e.target.value.trim()
      input.dispatchEvent(new Event('input'))
    <#noparse>}</#noparse>)
    // 回车时去掉两侧空格（仅输入框）
    if (classes.indexOf('el-input') > -1) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.target.value = e.target.value.trim()
          input.dispatchEvent(new Event('input'))
        <#noparse>}</#noparse>
      <#noparse>}</#noparse>)
    <#noparse>}</#noparse>
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
