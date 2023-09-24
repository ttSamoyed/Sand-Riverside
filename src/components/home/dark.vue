<template>
    <div class="dark-box">
        <el-switch
        v-model="isDark"
        :active-icon="Sunny"
        :inactive-icon="Moon"
        style="--el-switch-on-color: rgb(189, 188, 188); --el-switch-off-color: black; --el-switch-border-color: rgb(221,223,229)"
        @change="updateDarkState"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Moon,Sunny } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  const isDark = ref(true)
  const updateDarkState = () => {
    const html = document.querySelector('html')
    if (html) {
      if (isDark.value) {
        html.classList.remove("dark");
        html.classList.add("light");
      } else {
        html.classList.remove("light");
        html.classList.add("dark");
      }
    }
  }
  
  </script>
  
  <style scoped lang="scss">
  .dark-box {
    margin-right: 20px;
  }
  .switch {
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    padding-bottom: 0;
    padding-top: 0px;
  
    background-color: #ebeef5 !important;
    font-size: 12px;
  }
  
  .isDark-switch {
    .el-icon {
      background-color: #fff !important;
      padding: 2px;
      border-radius: 50%;
      color: #000;
      margin-left: -8px;
    }
  }
  
  .noDark-switch {
    background-color: rgb(8, 8, 8) !important;
  
    .el-icon {
      color: #fff;
      margin-left: 15px;
    }
  }
  </style>
  
  