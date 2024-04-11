import { useDefaultStore } from '../store'

// 获取Store
function getStore () {
  return useDefaultStore()
}

/**
 * 根据配置编码获取配置值
 * @param code 配置编码
 */
function getConfigValue (code) {
  const clientConfig = getStore().clientConfig
  if (clientConfig == null) {
    return null
  }
  const configs = clientConfig.configs
  const data = configs.find(c => c.code === code)
  if (data == null) {
    return null
  }
  return data.value
}

export default getConfigValue
