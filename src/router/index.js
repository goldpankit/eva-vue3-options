import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import { useDefaultStore } from '@/core/store'
import Message from '@/core/plugins/message'
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
  defaultStore.refreshUserInfo()
    .then(() => {
      next()
    })
    .catch(e => {
      // 提示错误
      Message.apiFailed(e)
      // 指定了错误类型，跳转到错误页面，错误页面将根据错误类型作出提示
      if (e.type !== undefined) {
        next({
          name: 'error',
          params: {
            type: e.type
          }
        })
        return
      }
      // 其它情况，跳转到登录页
      next({ name: 'login' })
    })
})

export default router
