<template>
  <div class="home-view">

    <div class="app-grid">
      <div
          v-for="app in mainApps"
          :key="app.name"
          class="app-item"
          @click="openApp(app.route)"
      >
        <div class="app-icon" :style="{ backgroundColor: app.color }">
          {{ app.icon }}
        </div>
        <span class="app-name">{{ app.name }}</span>
      </div>
    </div>

    <div class="dock-container">
      <div class="dock-bar">
        <div
            v-for="app in dockApps"
            :key="app.name"
            class="app-item"
            @click="openApp(app.route)"
        >
          <div class="app-icon" :style="{ backgroundColor: app.color }">
            {{ app.icon }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🟢 核心逻辑：跳转函数
const openApp = (route) => {
  if (!route) return
  router.push(route)
}

// 📱 数据：上面的 APP 列表
const mainApps = ref([
  { name: '日历', icon: '📅', color: '#fff', route: '' },
  { name: '时钟', icon: '⏰', color: '#000', route: '' },
  { name: '相册', icon: '🌸', color: '#ff9f0a', route: '/gallery' }, // 预留
  { name: '天气', icon: '⛅', color: '#32ade6', route: '' },
  { name: '备忘录', icon: '📝', color: '#ffd60a', route: '' },
  { name: '钱包', icon: '💰', color: '#30d158', route: '' },
  { name: '设置', icon: '⚙️', color: '#8e8e93', route: '' },
  { name: '更多', icon: '📂', color: '#1c1c1e', route: '' },
])

// 📱 数据：底部的 Dock 栏 (最常用的)
const dockApps = ref([
  { name: '电话', icon: '📞', color: '#30d158', route: '' },
  { name: '短信', icon: '💬', color: '#30d158', route: '/chat' }, // 👈 重点！连接到短信
  { name: '浏览器', icon: '🧭', color: '#007aff', route: '' },
  { name: '音乐', icon: '🎵', color: '#ff453a', route: '' },
])
</script>

<style scoped>
/* 1. 整体容器：全屏 + 壁纸 */
.home-view {
  width: 100%;
  height: 100%;
  /* 壁纸：你可以换成谢回的图片！这里暂时用渐变 */
  background: linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 拉开上下距离 */
  padding-top: 60px; /* 避开顶部的状态栏 */
  padding-bottom: 30px; /* 避开底部的横条 */
  box-sizing: border-box;
}

/* 2. APP 网格布局 */
.app-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 一行4个 */
  gap: 20px 10px; /* 上下间距20，左右10 */
  padding: 0 20px;
}

/* 3. 单个 APP 样式 */
.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.1s; /* 点击时的缩放动效 */
}

.app-item:active {
  transform: scale(0.9); /* 按下去缩小一点点，手感超好 */
}

.app-icon {
  width: 58px;
  height: 58px;
  border-radius: 14px; /* iOS 风格圆角 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px; /* Emoji 大小 */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-name {
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4); /* 给文字加阴影，防止壁纸太亮看不清 */
  font-weight: 500;
}

.widget-item {

}

/* 4. 底部 Dock 栏 */
.dock-container {
  padding: 0 16px;
  margin-bottom: 10px;
}

.dock-bar {
  background-color: rgba(255, 255, 255, 0.25); /* 半透明 */
  backdrop-filter: blur(15px); /* 🌟 灵魂：毛玻璃效果 */
  -webkit-backdrop-filter: blur(15px);
  border-radius: 32px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between; /* 图标两端对齐 */
}
</style>