<template>
    <el-menu
      :default-active="props.pos" class="menu" mode="horizontal" @select="handleSelect"
    >
      <el-menu-item index="1"><el-icon><Tickets /></el-icon>帖子</el-menu-item>
      <el-menu-item index="2"><el-icon><Message /></el-icon>互动</el-menu-item>
      <el-menu-item index="3"><el-icon><Setting /></el-icon>设置</el-menu-item>
      <el-menu-item index="4"><el-icon><Setting /></el-icon>管理</el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { defineEmits,defineProps } from 'vue'
  const emit = defineEmits(['Post', 'Interaction','Settings','Manage']);
  const props=defineProps({
    pos:{
      type:String,
      default:'1'
    }
  })
  const handleSelect = (index) => {
    switch (index) {
      case '1':
        emit('Post');
        break;
      case '2':
        emit('Interaction');
        break;
      case '3':
        emit('Settings');
        break;
      case '4':
        emit('Manage');
        break;
    }
  }
  </script>
  
<style scoped>
.menu{
    padding-bottom: 0px !important;
    width: 900px;
    height: 36px;
    margin-top: 10px !important;
    border: 1px solid #b4b2b251;
    border-radius: 5px;
}

.el-menu-item {
    height: 35px !important;
    width: 90px !important;
    color: #73767a;
}

.el-menu-item:hover {
background-color: transparent !important;
}
.el-menu-item.is-active {
background-color: transparent !important;
}
 
</style>
