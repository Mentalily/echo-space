<template>
  <label class="toggle-switch">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <span class="slider round"></span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* 容器 */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* 隐藏原生 checkbox */
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 跑道 (背景) */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc; /* 默认灰色 */
  transition: .4s;
  border-radius: 34px; /* 胶囊圆角 */
}

/* 小圆球 */
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* ✅ 开启状态：变绿 */
input:checked + .slider {
  background-color: #4cd964; /* iOS 绿 */
}

/* ✅ 开启状态：小球右移 */
input:checked + .slider:before {
  transform: translateX(22px);
}
</style>