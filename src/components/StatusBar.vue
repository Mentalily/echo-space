<template>
  <div class="status-bar">
    <div class="left-area">
      <div>时间</div>
    </div>
    <div class="center-area">
      <div>视角</div>
      <div>状态</div>
    </div>
    <div class="right-area">
      <div>心电图</div>
      <div>电量</div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.status-bar {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background-color: beige;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-area {
  display: flex;
  flex-direction: row;
}

.center-area {
  display: flex;
  flex-direction: row;
}

.right-area {
  display: flex;
  flex-direction: row;
}
</style>