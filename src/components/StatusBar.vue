<template>
  <div v-if="isMenuOpen" class="mask" @click="closeMenu">
    <!-- 透明遮罩，实现点击空白处关闭菜单的功能 -->
  </div>
  <div class="status-bar">
    <div class="left-area">
      <span class="time-text"> {{currentTime}} </span>
    </div>

    <div class="center-wrapper">
      <div class="center-area">
        <div class="perspective-tag" @click="changePerspective">{{ currentProfile.name }}</div>
        <div class="status-tag" @click.stop="toggleMenu">{{ currentProfile.status }}</div>
      </div>
      <div v-if="isMenuOpen" class="dropdown-menu">
<!--        <div class="menu-title">选择状态</div>-->
        <div class="menu-grid">
          <div
            class="grid-item"
            v-for="item in statusList"
            :key="item.label"
            :class="{ active: currentProfile.status === item.icon }"
            @click="selectStatus(item)"
          >
            <div class="status-icon">{{ item.icon }}</div>
            <div class="status-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-area">
      <div class="ecg-container" @click="toggleEasterEgg">
        <!-- 宽50 高20的画布 -->
        <svg viewBox="0 0 50 20" class="ecg-line"> <!-- 仅画出形状（静态） -->
          <polyline
              v-if="!isHeartBeating"
              points="0,10 10,10 13,6 16,10 18,12 22,1 26,18 29,10 34,6 38,10 50,10"
              fill="none"
              stroke="#efefef"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
            v-else
            d="M25,5.5 C22.5,3 18.5,3 16,5.5 C13.5,8 13.5,12 16,14.5 L25,18.5 L34,14.5 C36.5,12 36.5,8 34,5.5 C31.5,3 27.5,3 25,5.5 Z"
            fill="#FF3B30"
            class="heart-shape"
          />
        </svg>
      </div>
      <div class="battery"> <!-- CSS绘制电池外框 -->
        <div class="battery-level"></div> <!-- 电量：内部方块 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue"
import useSystemStore from '@/stores/useSystemStore' // 引入仓库
import { storeToRefs } from 'pinia' // 引入解构工具

const systemStore = useSystemStore()
const { currentProfile } = storeToRefs(systemStore) // 获取当前视角的所有数据

// ===========================
// 1. 🕒 时间逻辑
// ===========================
const currentTime = ref('')
let intervalID: number | undefined
let duration = 30

const updateTime = ()=> {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, ' ')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`

  // 特殊时间触发彩蛋
  const time = currentTime.value
  if (time == '05:20' || time == '13:14' || time == '20:20') {
    isHeartBeating.value = true
  } else if (isEasterEgg.value && duration) {
    duration -= 1
  } else if (isEasterEgg.value) {
    duration = 30
    isEasterEgg.value = false
  } else {
    isHeartBeating.value = false
  }
}

onMounted(() => {
  updateTime()
  intervalID = setInterval(updateTime, 1000) // 这是JS的内置函数，定时器，每隔一个delay可以执行code或者func
})
onUnmounted(() => {
  clearInterval(intervalID) // 利用标识清除定时器
})

// ===========================
// 2. 🎮 视角与状态控制
// ===========================
const isMenuOpen = ref(false)

const statusList = [
  { icon: '🙂', label: '开心' },
  { icon: '🥰', label: '幸福' },
  { icon: '😢', label: '伤心' },
  { icon: '🥺', label: '委屈' },
  { icon: '😠', label: '生气' },
  { icon: '💭', label: '发呆' },
  { icon: '💤', label: '困困' },
  { icon: '💻', label: '忙碌' },
  { icon: '🍷', label: '微醺' },
  { icon: '🔕', label: '勿扰' },
  { icon: '🛏️', label: '睡觉' },
  { icon: '🎤', label: '娱乐' }
]


const changePerspective = () => {
  systemStore.togglePerspective()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  console.log(isMenuOpen.value)
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const selectStatus = (item) => {
  systemStore.updateStatusEmoji(item.icon)
}

// ===========================
// 3. 💓 心电图彩蛋逻辑
// ===========================
// 控制显示折线还是爱心
const isHeartBeating = ref(false)
const isEasterEgg = ref(false)

const toggleEasterEgg = () => {
  isHeartBeating.value = !isHeartBeating.value
  console.log(isHeartBeating.value)
  isEasterEgg.value = isHeartBeating.value
}

</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.status-bar {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  position: relative;
}

.left-area {
  display: flex;
  flex-direction: row;
}

.time-text {
  font-weight: 500;
  font-family: "Helvetica Neue", sans-serif;
}

.center-wrapper {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 20;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 45px;
  background-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  width: 240px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.05);
}

.menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
}

.grid-item:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.grid-item.active { /* 同时选中两个类 */
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 4px 12px rgba(251, 221, 221, 0.93);
  transform: translateY(-3px) scale(1.02);
}

/* 选中状态下的文字和图标颜色加深 */
.grid-item.active .status-label {
  color: #ffabc4; /* 变成粉红色 */
  font-weight: bold;
}

/*
.dropdown-menu::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -10px;
  width: 20px;
  height: 20px;
  background: inherit;
  backdrop-filter: inherit;
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
}*/

.center-area {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.right-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.ecg-container {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;

  /*mask-image: linear-gradient(90deg, transparent 0%, white 20%, white 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%);

  mask-size: 200% 100%;
  -webkit-mask-size: 200% 100%;
  mask-position: 100% 0;
  -webkit-mask-position: 100% 0;

  animation: scan 2s linear infinite;*/
}

.ecg-line {
  width: 100%;
  height: 100%;
}
/*
@keyframes scan {
  0% {
    -webkit-mask-position: 100% 0;
  }
  100% {
    -webkit-mask-position: -100% 0;
  }
}
*/
.ecg-line polyline {
  /* 定义虚线：实线长50，空隙长50（这就把整条线藏起来了） */
  stroke-dasharray: 100;
  stroke-dashoffset: 100; /* 初始偏移，完全看不见 */

  /* 应用动画 */
  animation: heartbeat 2.5s linear infinite;
}

/* 定义心跳关键帧 */
@keyframes heartbeat {
  0% {
    stroke-dashoffset: 100;
    opacity: 1;
  }
  10% {
    stroke-dashoffset: 100;
    opacity: 1;
  }
  80% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

.heart-shape {
  transform-origin: center center;
  animation: heartbeat-boom 1.2s ease-in-out infinite alternate;
}

@keyframes heartbeat-boom {
  0% {
    transform: scale(0.9); /* 稍微缩小 */
  }
  30% {
    transform: scale(1.15); /* 猛地放大 (噗) */
  }
  50% {
    transform: scale(1.0); /* 回弹 (通) */
  }
  70% {
    transform: scale(1.08); /* 再小跳一下 */
  }
  100% {
    transform: scale(0.9); /* 回到初始状态 */
  }
}

.battery {
  width: 24px;
  height: 15px;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 2px;
  position: relative;
}

.battery::after { /* 伪元素，子元素默认在父元素的内部 */
  content: "";
  position: absolute;
  right: -4px; /* 距离右边缘的距离 */
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 4px;
  background-color: #efefef;
  border-radius: 1px;
}

.battery-level {
  width: 90%;
  height: 100%;
  background-color: #efefef;
  border-radius: 1px;
}
</style>