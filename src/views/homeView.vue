<template>
    <el-row :gutter="30" class="page">
        <el-col :span="5">
            <navigator></navigator>
        </el-col>
        <el-col :span="19">
            <el-row style="margin-bottom: 10px;" class="center">
              <el-text>UI Designed By</el-text>
              <div style="width: 10px;"></div>
              <el-tag round effect="dark"  style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; border-color: white !important; background: linear-gradient(45deg,  rgb(255, 153, 243), rgb(38, 175, 235));">Kristian</el-tag>
            </el-row>
            <!-- <carousel style="margin-top: 150px;"></carousel> -->
            <el-row class="poster1">
              <el-col :span="11">
                <el-card shadow="hover" style="height: 150px; border-radius: 10px;  background: linear-gradient(45deg,  rgb(43, 150, 237), rgb(19, 195, 248));">
                    <el-row style="margin-top:25px;">
                      <el-text style=" color: rgba(255, 255, 255, 0.918); font-weight: 300; font-size: 19px;">欢迎来到</el-text>
                      <img class="logo" src="@/assets/shplogo.png">
                    </el-row>
                    <el-row>
                      <el-text style="margin-top:10px;color: rgba(255, 255, 255, 0.918); border: none !important; font-weight: 400; font-size: 23px;">专为<span style="font-weight:500;">UESTCer</span>打造的在线校园交流平台</el-text>
                    </el-row>
                </el-card>
              </el-col>
              <el-col :span="9">
                <el-card shadow="hover" style="height: 150px; border-radius: 10px; margin-left: 120px; background-image: url('src/assets/uestcPoster.png'); background-size: cover;">
                  <!-- <img
                    src="@/assets/uestc.png"
                    class="image"
                  /> -->
                </el-card>
              </el-col>
            </el-row>
            <el-row class="center">
              <statistics></statistics>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup>
import navigator from "@/components/home/navigator.vue"
import statistics from "@/components/home/statistics.vue"
// import carousel from "@/components/home/carousel.vue"
const name = 'HomeView';
</script>

<style scoped>


.page{
  height: 100%;
}
.el-progress--line {
  width: 150px;
}
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 64px;
    height:24px;
    padding-left: 10px;
    padding-top: 1px;
  }


  .image {
    width: 200px;
    height: 100px;
    margin-top: 10px;
    margin-left: 70px;
    object-fit: cover;
    display:block;
  }
  .poster1{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>