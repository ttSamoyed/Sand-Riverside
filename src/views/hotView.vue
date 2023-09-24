<template>
    <div class="center">
    <el-row style="width: 100%;">
      <el-col
        v-for="(o, index) in 3"
        :key="o"
        :span="5"
        :offset="2"
      >
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 10px;">
          <img
            src="@/assets/login3.png"
            class="image"
          />
          <div style="padding: 10px">
            <span style="font-weight: 300;">2023各学院保研情况</span>
            <div class="bottom">
              <time class="time">2023年9月13日</time>
              <el-button type="primary" class="button">浏览</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
    
  </template>
  
  <script setup>

  
  </script>
  
  <style>
  .time {
    font-size: 12px;
    color: #999;
  }

  .center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    min-height: auto;
  }
  
  .image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display:block;
  }
  </style>
  