import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import { getUserInfo } from '@/api/system'
import { useDefaultStore } from '@/core/store'
const Login = () => import('@/views/login')
const Error = () => import('@/views/error')
// 路由模式
let history = createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH)
if (import.meta.env.VITE_APP_ROUTER_MODE === 'hash') {
  history = createWebHashHistory(import.meta.env.VITE_APP_CONTEXT_PATH)
}
const router = new createRouter({
  history,
  routes: [
    // 登录
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 错误页
    {
      name: 'error',
      path: '/error/:type',
      component: Error
    },
    // 内容页（动态加载）
    {
      name: 'layout',
      path: '',
      component: AppLayout,
      children: [
        // iframe嵌入页
        {
          path: 'iframe',
          name: 'IFrame',
          component: () => import('@/views/iframe')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 无权访问&404页面可直接访问
  if (to.name === 'login' || to.name === 'error') {
    next()
    return
  }
  const defaultStore = useDefaultStore()
  // 验证用户是否登录
  const userInfo = defaultStore.userInfo
  if (userInfo != null) {
    // 如果访问的是登录页面，则直接跳转至首页
    if (to.name === 'login') {
      next({ name: 'index' })
      return
    }
    // 如果访问的是layout（回退时可能存在该情况），直接调整至首页
    if (to.name === 'layout') {
      next({ name: 'index' })
      return
    }
    next()
    return
  }
  getUserInfo()
    .then(userInfo => {
      // 初始化客户端配置，避免客户端配置还未获取到导致页面渲染不能获取到配置信息
      defaultStore.initClientConfig()
        .then(config => {
          // 存储userInfo
          defaultStore.userInfo = userInfo
          // 存储客户端配置
          defaultStore.clientConfig = config
          // 等待动态路由加载
          setTimeout(() => {
            next()
          }, 100)
        })
        .catch(() => {
          next({
            name: 'error',
            params: {
              type: 'config-load-failed'
            }
          })
        })
    })
    .catch(() => {
      next({ name: 'login' })
    })
})

export default router
