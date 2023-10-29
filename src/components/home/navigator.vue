<template>
    <el-col class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          default-openeds="1,2,3,4"
          @click="handleSelect"
        >
          <el-sub-menu index="1" class="title">
            <template #title class="title">
              <el-icon><School /></el-icon>
              <span>成电校园</span>
            </template>
              <el-menu-item index="1-1" @click="sindex=1; console.log('sindex=',sindex)">
                <el-icon><Help /></el-icon>
                水手之家</el-menu-item>
              <el-menu-item index="1-2" @click="sindex=2">
                <el-icon><School /></el-icon>
                校园热点</el-menu-item>
              <el-menu-item index="1-3" @click="sindex=3">
                <el-icon><TrophyBase /></el-icon>
                校园活动</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
                <el-icon><Star /></el-icon>
                <span>生活信息</span>
            </template>
              <el-menu-item index="4" @click="sindex=4"> <el-icon><Notebook /></el-icon>失物招领</el-menu-item>
              <el-menu-item index="5" @click="sindex=5"> <el-icon><Iphone /></el-icon>二手买卖</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
                <el-icon><ShoppingCart /></el-icon>
                <span>情感专区</span>
            </template>
              <el-menu-item index="6" @click="sindex=6"> <el-icon><Connection /></el-icon>鹊桥</el-menu-item>
              <el-menu-item index="7" @click="sindex=7"> <el-icon><ChatDotRound /></el-icon>话心</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Guide /></el-icon>
                <span>未来可期</span>
            </template>
              <el-menu-item index="8" @click="sindex=8"> <el-icon><Suitcase /></el-icon>就业创业</el-menu-item>
              <el-menu-item index="9" @click="sindex=9"> <el-icon><Ship /></el-icon>出国留学</el-menu-item>
              <el-menu-item index="10" @click="sindex=10"> <el-icon><Aim /></el-icon> 保研考研</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
  </template>
  
  <script setup>
    import { ref, defineEmits } from 'vue';
    const emit = defineEmits('itemSelected');
    const sindex = ref('0');
    const handleSelect = () => {
      console.log('正在切换',sindex.value);
      emit('itemSelected', sindex.value); // 将选中项的index传递给父组件
    };
  </script>
  
<style scoped>
.tac{
    height: 100%;
}
.menu{
    width: 250px;
    height:98%;
    border-right: 1px solid #b4b2b251;
    margin-top: 20px;
}
.el-menu-vertical-demo{
  width: 105%;
  margin-left: -15px !important;
  margin-right: -15px !important;
  border:none;
  font-weight: 400;
}

.el-menu-item {
    height: 35px !important;
    margin-top: 5px;
    border-radius: 5px;
    color: #73767a;
    font-family: 'PingFang SC';
}
 
.el-menu-item:hover {
    border: none;
    color: #409EFF !important;
    background-color:transparent;
}

.el-menu-item.is-active {
  color: #409EFF !important;
  background-color: rgba(98, 213, 242, 0.158)
}
</style>
