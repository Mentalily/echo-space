<template>
  <div class="settings-page">
    <h1 class="page-title">设置</h1>
    <div class="setting-card user-card">
      <div v-if="systemStore.user" class="logged-in-view">

      </div>
      <div v-else class="guest-view">
        <div class="user-info">
          <div class="email-text">
            {{ systemStore.user.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSystemStore } from '@/stores/useSystemStore'
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
}

</style>