<template>
    <el-row :gutter="30" class="page">
        <el-col :span="5">
            <navigator></navigator>
        </el-col>
        <el-col :span="19">
            <el-row style="margin-bottom: 10px;" class="center">
              <el-text>UI Designed By</el-text>
              <div style="width: 10px;"></div>
              <el-tag round effect="dark"  style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Kristian</el-tag>
            </el-row>
            <!-- <carousel style="margin-top: 150px;"></carousel> -->
            <el-row>
              <el-col :span="8">
                <el-card shadow="hover" style="height: 130px; border-radius: 10px;  background: linear-gradient(to right, red, blue);"></el-card>
              </el-col>
              <el-col :span="16">
              </el-col>
            </el-row>
            
            
        </el-col>
    </el-row>
</template>

<script setup>
import navigator from "@/components/home/navigator.vue"
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
</style>