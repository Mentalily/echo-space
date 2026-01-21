import './assets/main.css'

import { createApp } from 'vue'    // creatApp: 创建应用
import { createPinia } from 'pinia'

import App from './App.vue'        // 根组件
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') // 挂载到 <div id='app'></div> 上

/*
* 应用实例必须在调用了 .mount() 方法后才会渲染出来
* 该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串
* 应用根组件的内容将会被渲染在容器元素里面。容器元素自己将不会被视为应用的一部分。
* */
