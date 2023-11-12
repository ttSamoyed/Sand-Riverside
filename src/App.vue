<template>
    <meta charset="UTF-8">
    <div id="app" style="min-width: 1100px;">
      <div class="common-layout">
      <el-container class="container">
        <el-header>
            <topBar></topBar>
        </el-header>

        <el-main class="main">
          <keep-alive include="home,writePost">
            <router-view :key=$route.fullPath></router-view>
          </keep-alive>
        </el-main>

        <el-footer v-show="$route.fullPath != '/login'" class="foot">
            <img class="logo" src="@/assets/shplogo.png" >
        </el-footer>
      </el-container>
      </div>
    </div>
    
</template>

<script setup>
import topBar from "@/components/home/topBar.vue"
import PingFang from "@/assets/font.css?inline"
</script>


<style scoped>
.body {
  font-family: PingFang;
}

.container{
  margin:0 !important;
  padding: 0 !important;
  height:98vh;
}

.foot {
  border-top: 1px solid #b4b2b251;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-items: center;
}

.main {
    height: 700px;
}
.logo {
  width: 50px;
  padding-top: 10px;
  height: auto;
}

.el-progress--line {
  width: 150px;
}
</style>
