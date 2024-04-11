// import '@/assets/style/element/index.scss'
import '@/assets/style/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router/index'
import directives from './core/directives/index'
import components from './components/index'
import plugins from './core/plugins/index'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
  .use(router)
  .use(plugins)
  .use(directives)
  .use(components)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')

export default app
