import './assets/main.css'

import { createApp } from 'vue'    // creatApp: 创建应用
import { createPinia } from 'pinia'

import App from './App.vue'        // 组件
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
