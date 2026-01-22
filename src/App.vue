<template>
  <div class="container">
    <div class="phone-case" :style="phoneStyle">
      <StatusBar />
      <main class="screen-content">
        <RouterView /> <!-- 引入路由显示页面，根据规则放入页面组件 -->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import StatusBar from "@/components/StatusBar.vue"
import {computed, onMounted, onUnmounted, ref} from 'vue'

const baseWidth = 375             // 手机原始宽度
const baseHeight = 812            // 手机原始高度

const scaleRate = ref(1)    // 缩放比例状态
const isMobile = ref(false) // 记录是否为移动端

let ticking = false               // 防抖

const updateScale = () => {
  // 1. 获取当前屏幕宽高
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 2. 手机端不缩放
  if (windowWidth <= 480) {
    isMobile.value = true
    scaleRate.value = 1
    ticking = false
    return
  }

  isMobile.value = false

  // 3. 计算可用高度
  const paddingH = 20
  const paddingW = 60
  const availableHeight = windowHeight - paddingH
  const availableWidth = windowWidth - paddingW

  // 4. 计算缩放比例
  const rateH = Math.min(1, availableHeight / baseHeight)
  const rateW = Math.min(1, availableWidth / baseWidth)

  scaleRate.value = Math.min(rateW, rateH)
  ticking = false
}

const onResize = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScale)
    ticking = true
  }
}

// 监听窗口大小变化
onMounted(() => {
  updateScale()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// 将缩放比例应用到样式
const phoneStyle = computed(() => {
  if (isMobile.value) return {}

  return {
    transform: `scale(${scaleRate.value})`,
    transformOrigin: `center center`,
  }
})
</script>

<style scoped>
/* =========================================
   1. 电脑端样式 (默认) - 这是一个精致的手机模型
   ========================================= */
.container {
  width: 100vw;
  height: 100vh;
  background: #f0f2f5;
  padding: 10px 30px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
.container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
}

.phone-case {
  width: 375px;
  height: 812px;
  border-radius: 30px;
  overflow: hidden;
  background-color: white;
  /* 两层阴影。水平偏移、垂直偏移、模糊半径、颜色 */
  box-shadow: 0 0 0 6px #333, 0 20px 50px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-out;
}

.screen-content {
  display: flex;
  flex: 1;
}

.screen-content::-webkit-scrollbar {
  display: none;
}

/* =========================================
   2. 手机端样式 (当屏幕宽度小于 480px 时生效)
   ========================================= */
@media (max-width: 480px) {
  .phone-case {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
    transform: none !important; /* 强制取消缩放 */
  }
}

</style>