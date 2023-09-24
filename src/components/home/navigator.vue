<template>
    <el-col class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><School /></el-icon>
              <span>学院论坛</span>
            </template>
              <el-menu-item index="1-1">
                <el-icon><School /></el-icon>
                计算机学院</el-menu-item>
              <el-menu-item index="1-2">
                <el-icon><School /></el-icon>
                电子学院</el-menu-item>
              <el-menu-item index="1-3">
                <el-icon><School /></el-icon>
                集成电路学院</el-menu-item>
              <el-menu-item index="1-4">
                <el-icon><School /></el-icon>
                外国语学院</el-menu-item>
              <el-menu-item index="1-5">
                <el-icon><School /></el-icon>
                经管学院</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
                <el-icon><ShoppingCart /></el-icon>
                <span>二手交易</span>
            </template>
              <el-menu-item index="2-1"> <el-icon><Iphone /></el-icon>电子设备</el-menu-item>
              <el-menu-item index="2-2"> <el-icon><Notebook /></el-icon>书籍教材</el-menu-item>
              <el-menu-item index="2-3"> <el-icon><Coin /></el-icon>卡卷虚拟</el-menu-item>
              <el-menu-item index="2-4"> <el-icon><Van /></el-icon>交通工具</el-menu-item>
              <el-menu-item index="2-5"> <el-icon><Wallet /></el-icon>票务服务</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
                <el-icon><ShoppingCart /></el-icon>
                <span>生活社区</span>
            </template>
              <el-menu-item index="3-1"> <el-icon><Iphone /></el-icon>体育交流</el-menu-item>
              <el-menu-item index="3-2"> <el-icon><Notebook /></el-icon>文化交流</el-menu-item>
              <el-menu-item index="3-3"> <el-icon><Coin /></el-icon>心理健康</el-menu-item>
          </el-sub-menu>

        </el-menu>
      </el-col>
  </template>
  
  <script lang="ts" setup>
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
<style scoped>
.tac{
    height: 100%;
}
.menu{
    width: 250px;
    height:100%;
    border-right: 2px solid #b4b2b251;
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
    font-size: 16px;
    font-weight: 300;
}
 
.el-menu-item:hover {
    border: none;
    background-color: rgba(255, 192, 203, 0.477) !important;
}

.el-menu-item.is-active {
  color: rgb(251, 167, 181) !important;;
}

</style>