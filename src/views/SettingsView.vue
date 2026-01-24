<template>
  <div class="settings-page">
    <h1 class="page-title">设置</h1>
    <div class="setting-card user-card">
      <div class="avatar">
        <img src="@/assets/baseIcons/ID_card.png" alt="ID card">
      </div>
      <div v-if="isLoggedIn" class="logged-in-view">
        <div class="user-info">
          <div class="email-text">
            <span>1234567891@xx.com</span>
          </div>
          <div class="explain-text">
            <span>云同步已开启！可以多端同步数据~</span>
          </div>
          <div class="user-options">
            <button class="kill-account-btn">注销账号</button>
            <button class="log-out-btn">退出登录</button>
          </div>
        </div>
      </div>
      <div v-else class="guest-view">
        <div class="guest-view-content">
          <div class="card-title">登录账号</div>
          <div class="card-desc">
            登录可云端保存数据，实现跨端同步。
            <br/>
            <span class="explain-text">游客访问数据将保存在本地。</span>
          </div>
        </div>
        <button class="log-in-btn">登录/注册</button>
      </div>
    </div>
    <h2> 个性化设置 </h2>
    <div class="upload">
      <div class="upload-wallpaper">
        <img class="desc-icon" src="@/assets/baseIcons/document.png" alt="upload">
        <span>上传壁纸</span>
      </div>
      <div class="upload-lockscreen">
        <img class="desc-icon" src="@/assets/baseIcons/document.png" alt="upload">
        <span>上传锁屏</span>
      </div>
    </div>
    <div class="setting-card">
      <div>锁屏文字：</div>
      <div class="edit-area">
        <input class="sentence" />
      </div>
      <div class="font-set">
        字体大小<input type="number" name="" id="">
      </div>
    </div>
    <h2> 桌面应用设置 </h2>
    <div class="explain-text">
      <span>拖动应用改变布局；可上传图标、修改应用名称；可选择是否启用应用；小组件大小2x2</span>
    </div>
    <div class="setting-card">
      <draggable
        v-model=""
        item-key=""
        handle=".drag-handle"
        animation="200"
      >
        <template #item="{ element }">
          <div class="app-item-row">
            <div class="drag-handle">☰</div>
            <div class="app-icon-upload" @click="triggerUpload(element.id)">
              <img src="" alt="">
            </div>
            <div class="app-name-editor">
              <input v-model="element.name" class="name-input"/>
            </div>
            <BaseToggle v-model="element.showCapsule" />
          </div>
        </template>
      </draggable>
    </div>
    <h2> 桌宠小组件 </h2>
    <div class="setting-card"></div>
  </div>
</template>

<script setup lang="ts">
// import useSystemStore from '@/stores/useSystemStore'
import {ref} from "vue";
import BaseToggle from "@/components/BaseToggle.vue";

let isLoggedIn = ref(false);
</script>

<style scoped>
.settings-page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  padding: 10px;
  background-color: #F2F3F7;
}

.settings-page::-webkit-scrollbar {
  display: none;
}

.setting-card {
  background-color: white;
  border-radius: 20px;
  width: 100%;
  margin-bottom: 10px;
  padding:20px 10px;
}

.user-card {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar {
  width: 100px;
  margin-right: 20px;
}

.avatar img {
  width: 100%;
}

.email-text {
  font-size: 20px;
  font-weight: bold;
}

.explain-text {
  font-size: 14px;
  font-weight: 400;
}

.user-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

.log-out-btn,
.kill-account-btn,
.log-in-btn {
  width: 40%;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.log-out-btn {
  background-color: #007aff;
}

.kill-account-btn {
  background-color: #e45454;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.guest-view {
  display: flex;
  flex-direction: column;
}

.log-in-btn {
  background-color: #54e47d;
  margin-top: 10px;
}

.upload {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.upload-wallpaper,
.upload-lockscreen {
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 32px;
  margin: 10px 0;
  padding: 5px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.desc-icon {
  height: 100%;
  margin: 3px;
}

</style>