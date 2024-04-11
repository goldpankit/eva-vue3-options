import { useDefaultStore } from '../store'

// 获取Store
function getStore () {
  return useDefaultStore()
}

/**
 * 根据编码表达式获取字典或数据标签
 * @param codeExpress 编码表达式
 *  语法1：“字典编码.数据编码”，如GENDER.MALE
 *  语法2：“字典编码”，如GENDER
 */
function getDictLabel (codeExpress) {
  const clientConfig = getStore().clientConfig
  if (clientConfig == null) {
    return ''
  }
  const codes = codeExpress.split('.')
  const dictList = clientConfig.dictList
  const dictCode = codes[0]
  const dataValue = codes[1]
  const dict = dictList.find(d => d.code === dictCode)
  if (dict == null) {
    return codeExpress
  }
  // 如果不存在数据编码，则直接返回字典名称
  if (dataValue == null) {
    return dict.name
  }
  const data = dict.dataList.find(d => d.value === dataValue)
  if (data == null) {
    return codeExpress
  }
  return data.label
}

/**
 * 根据编码表达式获取字典数据配置
 * @param codeExpress 编码表达式
 *  语法：“字典编码.数据编码”，如GENDER.MALE
 */
function getDictConfig (codeExpress) {
  const clientConfig = getStore().clientConfig
  if (clientConfig == null) {
    return null
  }
  const codes = codeExpress.split('.')
  const dictList = clientConfig.dictList
  const dictCode = codes[0]
  const dataValue = codes[1]
  const dict = dictList.find(d => d.code === dictCode)
  if (dict == null) {
    return null
  }
  // 如果不存在数据编码，则直接返回null
  if (dataValue == null) {
    return null
  }
  const data = dict.dataList.find(d => d.value === dataValue)
  if (data == null) {
    return null
  }
  return data.config
}

export default {
  getDictLabel,
  getDictConfig
}
