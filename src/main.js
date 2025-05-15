import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 创建Pinia实例
const pinia = createPinia()

// 应用插件
app.use(router)
// 使用ElementPlus插件,并配置全局默认参数
// size: 'default' - 设置组件的默认尺寸为默认大小
// zIndex: 3000 - 设置弹窗组件的层级基准值为3000
app.use(ElementPlus, { size: 'default', zIndex: 3000 })
app.use(pinia)

app.mount('#app')
