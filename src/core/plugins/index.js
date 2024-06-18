import constants from './consts'
import message from './message'
import messagebox from './messagebox'
import cache from './cache'
import download from './download'
import authorizer from '../authorize'
import Dict from './system.dict'
import getConfigValue from './system.config'
import dayjs from 'dayjs'
import filters from '../filters'
import bus from './bus'
import { useDefaultStore } from '@/core/store'

export default {
  install (app) {
    // 提醒对象
    app.config.globalProperties.$tip = message
    // 提示框对象
    app.config.globalProperties.$dialog = messagebox
    // 缓存对象
    app.config.globalProperties.$cache = cache
    // 常量
    app.config.globalProperties.$const = constants
    // 下载文件
    app.config.globalProperties.$download = download
    // 获取配置值方法
    app.config.globalProperties.$c = getConfigValue
    // 获取字典标签方法
    app.config.globalProperties.$d = Dict.getDictLabel
    // 获取字典配置方法
    app.config.globalProperties.$dc = Dict.getDictConfig
    // dayjs对象
    app.config.globalProperties.$dayjs = dayjs
    // 判断是否为测试模式
    app.config.globalProperties.$isTesting = import.meta.env.VITE_APP_MODE === 'testing'
    // 判断是否为DEBUG模式
    app.config.globalProperties.$isDebugging = import.meta.env.VITE_APP_DEBUG === 'on'
    // 获取图片访问路径
    app.config.globalProperties.$getImageURL = (fileKey) => {
      if (fileKey.startsWith('http://') || fileKey.startsWith('https://')) {
        return fileKey
      }
      return import.meta.env.VITE_APP_COMMON_IMAGE_PREFIX + fileKey
    }
    // 获取附件下载路径
    app.config.globalProperties.$getAttachURL = (fileKey, filename) => {
      let url = import.meta.env.VITE_APP_COMMON_ATTACH_PREFIX + fileKey
      if (filename != null && filename.trim().length !== 0) {
        url += `&fn=${filename}`
      }
      return url
    }
    // 增加全局权限方法
    app.config.globalProperties.$hasRoles = authorizer.hasRoles
    app.config.globalProperties.$hasAnyRoles = authorizer.hasAnyRoles
    app.config.globalProperties.$hasPermissions = authorizer.hasPermissions
    app.config.globalProperties.$hasAnyPermissions = authorizer.hasAnyPermissions
    // 全局过滤方法
    app.config.globalProperties.$filters = filters
    // 自定义事件
    app.config.globalProperties.$bus = bus
    // 默认store
    app.config.globalProperties.$defaultStore = useDefaultStore()
  }
}
