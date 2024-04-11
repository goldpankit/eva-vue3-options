import { useDefaultStore <#noparse>}</#noparse> from '../store'

// 获取Store
function getStore () {
  return useDefaultStore()
<#noparse>}</#noparse>

/**
 * 根据配置编码获取配置值
 * @param code 配置编码
 */
function getConfigValue (code) {
  const clientConfig = getStore().clientConfig
  if (clientConfig == null) {
    return null
  <#noparse>}</#noparse>
  const configs = clientConfig.configs
  const data = configs.find(c => c.code === code)
  if (data == null) {
    return null
  <#noparse>}</#noparse>
  return data.value
<#noparse>}</#noparse>

export default getConfigValue
