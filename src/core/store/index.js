import { defineStore } from 'pinia'
import { fetchConfig, getUserInfo } from '@/api/system'

export const useDefaultStore = defineStore('default', {
  state: () => ({
    // 登录用户信息
    userInfo: null,
    // 首页
    homePage: null,
    // 客户端配置
    clientConfig: null,
    // 菜单
    menuData: {
      // 菜单列表
      list: [],
      // 是否收起
      collapse: false
    },
    // 是否展示登录窗口
    visibleLoginWindow: false,
    // 缓存内容
    cache: {}
  }),
  actions: {
    // 切换菜单收缩
    switchCollapseMenu (value) {
      if (value != null) {
        this.menuData.collapse = value
      } else {
        this.menuData.collapse = !this.menuData.collapse
      }
      window.localStorage.setItem('MENU_STATUS', this.menuData.collapse)
    },
    /**
     * 刷新用户信息
     */
    refreshUserInfo () {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(userInfo => {
            // 初始化客户端配置，避免客户端配置还未获取到导致页面渲染不能获取到配置信息
            fetchConfig()
              .then(config => {
                // 存储登录用户信息
                this.userInfo = userInfo
                // 存储客户端配置
                this.clientConfig = config
                resolve({ userInfo, config })
              })
              .catch(e => {
                reject({
                  // 指定错误类型，用于路由至错误页
                  type: 'config-load-failed',
                  message: e.message
                })
              })
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
})
