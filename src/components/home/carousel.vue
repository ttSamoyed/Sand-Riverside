<template>
    <!-- <el-carousel trigger="click" height="250px" :interval="3000" arrow="always" style="width:800px">
      <el-carousel-item v-for="item in imgList" :key="item.name">
        <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" />
      </el-carousel-item>
    </el-carousel> -->
    <el-carousel :interval="4000" type="card" width="600px" height="400px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </template>
  
<script setup>

const imgList=[
    {
        name: "icon",
        src: "@/assets/icon.png",
        title: "这是icon.png"
    },
    {
        name: "logo",
        src: "@/assets/logo.png",
        title: "这是logo.png"
    },
    {
        name: "main",
        src: "@/assets/shpicon.png",
        title: "这是bg.png"
    }
];
</script>

<style scoped>
  .el-carousel__item h3 {
    color: white;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #787879;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #0f58ac;
  }
  </style>
  