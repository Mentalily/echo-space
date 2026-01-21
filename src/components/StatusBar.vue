<template>
  <div class="status-bar">
    <div class="left-area">
      <span class="mini-time">{{ time }}</span>
    </div>

    <div class="right-area">
      <div class="icon signal">
        <div class="bar" style="height: 40%"></div>
        <div class="bar" style="height: 60%"></div>
        <div class="bar" style="height: 80%"></div>
        <div class="bar" style="height: 100%"></div>
      </div>

      <div class="icon wifi">WIFI</div>

      <div class="battery">
        <div class="battery-body">
          <div class="battery-level" :style="{ width: batteryLevel + '%' }"></div>
        </div>
        <div class="battery-head"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('12:00')
const batteryLevel = ref(85) // 假装 85% 电量
let timer = null

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  time.value = `${hours}:${minutes}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.status-bar {
  position: absolute; /* 绝对定位，浮在最上面 */
  top: 0;
  left: 0;
  width: 100%;
  height: 24px; /* 状态栏高度 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 100; /* 关键！保证它压在锁屏上面 */
  color: white; /* 锁屏通常是深色背景，字用白色 */
  font-size: 12px;
  font-weight: 600;
  background-color: black;
  /* background: rgba(0, 0, 0, 0.1); 可选：给一点点底色 */
}

.right-area {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 电量图标样式 */
.battery {
  display: flex;
  align-items: center;
}
.battery-body {
  width: 20px;
  height: 10px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  padding: 1px;
  position: relative;
}
.battery-level {
  height: 100%;
  background-color: white;
  border-radius: 1px;
}
.battery-head {
  width: 2px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0 1px 1px 0;
}

/* 信号格样式 */
.signal {
  display: flex;
  align-items: flex-end;
  gap: 1px;
  height: 10px;
}
.signal .bar {
  width: 2px;
  background-color: white;
  border-radius: 1px;
}
</style>