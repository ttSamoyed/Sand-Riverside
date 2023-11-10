<template>
    <el-row style="margin-bottom: 10px;" class="center">
        <el-text class="gradient-text">UI Designed By</el-text>
        <div style="width: 10px;"></div>
        <el-tag round effect="dark"  style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; border: none !important; background: linear-gradient(45deg,  rgb(142,97,246), rgb(128,178,247));">Kristian</el-tag>
    </el-row>
    <el-row class="poster1">
        <el-col :span="10">
        <el-card shadow="hover" style="height: 200px; border-radius: 10px;  background: linear-gradient(30deg,  rgb(4, 139, 250), rgb(66, 199, 247), rgb(19, 195, 248));">
            <el-row style="margin-top:30px;">
                <el-text style=" color: rgba(255, 255, 255, 0.918); font-weight: 400; font-size: 19px;">欢迎 👏</el-text>
            </el-row>
            <el-row>
                <el-text style="margin-top: 10px; color: rgba(255, 255, 255, 0.918); font-weight: 400; font-size: 19px;">这里是</el-text>
                <img class="logo2" src="@/assets/shpicon.png">
                <img class="logo" src="@/assets/shplogo.png">
            </el-row>
            <el-row>
                <el-text class="gradient-text2">为<span style="margin-left: 10px; margin-right:10px; font-weight:500;">UESTCer</span>打造的在线校园交流平台</el-text>
            </el-row>
        </el-card>
        </el-col>
        <el-col :span="10">
        <el-card shadow="hover" style="height: 200px; border-radius: 10px; margin-left: 120px; background-image: url('src/assets/uestcPoster.png'); background-size: cover;">
            <!-- <img
            src="@/assets/uestc.png"
            class="image"
            /> -->
        </el-card>
        </el-col>
    </el-row>
    <el-row class="center" style="min-width: 1000px;">
        <statistics></statistics>
    </el-row>
    <el-row class="poster1">
        <el-col :span="9">
        <el-card shadow="hover" style="height: 250px; border-radius: 10px; margin-left: 0px;
            background-image: url('src/assets/basketball.png'); background-size: cover;">
            <el-row>
            <el-text class="smalltitle2">体育文化</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">竞技者之家</el-text>
            </el-row>
        </el-card>
        </el-col>
        <el-col :span="11">
        <el-card shadow="hover" style="height: 250px; border-radius: 10px; margin-left: 20px;
            background-image: url('src/assets/musicpost.png'); background-size:cover">
            <el-row>
            <el-text class="smalltitle2">音乐流行</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">声动校园</el-text>
            </el-row>
        </el-card>
        </el-col>
    </el-row>
    <el-row class="poster1" style="margin-top: 15px;">
        <el-col :span="13">
        <el-card shadow="hover" style="height: 200px; border-radius: 10px; margin-left: 0px;
            background-image: url('src/assets/tech.jpg'); background-size: cover;">
            <el-row>
            <el-text class="smalltitle2">科技前沿</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">数码玩家社区</el-text>
            </el-row>
        </el-card>
        </el-col>
        <el-col :span="7">
        <el-card shadow="hover" style="height: 200px; border-radius: 10px; margin-left: 20px;
            background-image: url('src/assets/campus.png'); background-size:cover">
            <el-row>
            <el-text class="smalltitle2">校园生活</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">热点追踪</el-text>
            </el-row>
        </el-card>
        </el-col>
    </el-row>
    <el-row class="poster1" style="margin-top: 15px; margin-bottom: 10px;">
        <el-col :span="9">
        <el-card shadow="hover" style="height: 400px; border-radius: 10px; margin-left: 0px;
            background-image: url('src/assets/heart.jpg'); background-size: cover;">
            <el-row>
            <el-text class="smalltitle2">情感专区</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">鹊桥/话心</el-text>
            </el-row>
        </el-card>
        </el-col>
        <el-col :span="11">
        <el-card shadow="hover" style="height: 400px; border-radius: 10px; margin-left: 20px;
            background-image: url('src/assets/future.png'); background-size:cover">
            <el-row>
            <el-text class="smalltitle2">筑梦未来</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">保考研/</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">出国/</el-text>
            </el-row>
            <el-row>
            <el-text class="largetitle">就业</el-text>
            </el-row>
        </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import statistics from "@/components/home/statistics.vue"
const name = 'HomeView';
</script>
<style scoped>
.smalltitle{
  font-weight: 500;
  color: white;
  font-size: 1px;
  background: linear-gradient(30deg, rgb(26, 168, 127),rgb(25, 185, 238), rgb(171,70,246));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
}
.smalltitle2{
  font-weight: 600;
  color: white;
  font-size: 1px;
  background: linear-gradient(30deg, rgb(222, 113, 133),rgb(234, 87, 224), rgb(226, 75, 77));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
}

.largetitle{
  font-weight: 400;
  color: white;
  font-size: 30px;
}
.page{
  margin-top: -20px !important;
  height: 700px;
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
    padding-left: 3px;
    padding-top: 1px;
    margin-top: 10px;
  }
  .logo2 {
    width: 30px;
    height:24px;
    padding-left: 10px;
    padding-top: 1px;
    margin-top: 10px;
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
    min-width: 1050px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .gradient-text2{
    margin-top:10px;
    border: transparent !important;
    font-size: 25px;
    font-weight:400;
    color: white;
  }

  
</style>