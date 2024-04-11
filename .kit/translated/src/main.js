// import '@/assets/style/element/index.scss'
import '@/assets/style/index.scss'
import { createApp <#noparse>}</#noparse> from 'vue'
import { createPinia <#noparse>}</#noparse> from 'pinia'
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
<#noparse>}</#noparse>
app.use(createPinia())
  .use(router)
  .use(plugins)
  .use(directives)
  .use(components)
  .use(ElementPlus, {
    locale: zhCn
  <#noparse>}</#noparse>)
  .mount('#app')

export default app
