<template>
  <div class="chat-view">

    <div class="nav-bar">
      <div class="back-btn" @click="$router.back()">
        <span class="arrow">‹</span>
        <span class="back-text">列表</span>
      </div>
      <div class="title">谢回</div> <div class="menu-btn">···</div>
    </div>

    <div class="message-container">
      <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-row"
          :class="{ 'my-message': msg.isMe }"
      >
        <div class="avatar" v-if="!msg.isMe">谢</div>

        <div class="bubble">
          {{ msg.content }}
        </div>

        <div class="avatar my-avatar" v-if="msg.isMe">我</div>
      </div>
    </div>

    <div class="input-area">
      <div class="voice-icon">(((</div>
      <input type="text" placeholder="发消息..." />
      <div class="emoji-icon">☺</div>
      <div class="add-icon">⊕</div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🍬 核心假数据：一定要写能治愈你自己的话！
const messages = ref([
  { id: 1, isMe: false, content: '还没睡？' },
  { id: 2, isMe: true, content: '嗯，在写代码，想做一个只有我们两个人的系统。' },
  { id: 3, isMe: false, content: '笨蛋。' },
  { id: 4, isMe: false, content: '不需要为了证明什么而这么辛苦，早点休息，明天我叫你起床。' },
  { id: 5, isMe: true, content: '好...这就去睡 💤' },
])
</script>

<style scoped>
/* 整体容器 */
.chat-view {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2; /* 微信那种浅灰色背景 */
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10; /* 保证能盖住桌面 */
}

/* --- 1. 导航栏 --- */
.nav-bar {
  height: 44px;
  background-color: #ededed;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  padding-top: 20px; /* 避开状态栏高度 */
  font-size: 16px;
  font-weight: 600;
}
.back-btn {
  display: flex;
  align-items: center;
  color: #007aff; /* iOS 蓝 */
  cursor: pointer;
}
.arrow { font-size: 24px; margin-top: -2px; }
.back-text { font-size: 16px; }

/* --- 2. 消息区域 --- */
.message-container {
  flex: 1; /* 占满剩余空间 */
  overflow-y: auto; /* 允许滚动 */
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 消息之间的间距 */
}

/* 每一行的通用样式 */
.message-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

/* 气泡通用样式 */
.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.4;
  position: relative;
}

/* --- 谢回的消息 (左边) --- */
.message-row:not(.my-message) .bubble {
  background-color: #ffffff;
  color: #333;
  border-top-left-radius: 2px; /* 小尖角效果 */
}
.avatar {
  width: 36px;
  height: 36px;
  background-color: #ccc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
}

/* --- 我的消息 (右边) --- */
.my-message {
  flex-direction: row-reverse; /* 关键：反转排列，让头像在右边 */
}
.my-message .bubble {
  background-color: #95ec69; /* 微信绿 */
  color: #000;
  border-top-right-radius: 2px;
}
.my-avatar {
  background-color: #ffcc00; /* 给自己个亮色 */
}

/* --- 3. 底部输入框 --- */
.input-area {
  height: 50px;
  background-color: #f7f7f7;
  border-top: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
}
.input-area input {
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
}
</style>