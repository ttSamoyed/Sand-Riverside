<template>
  <div class="message">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="15">
          <el-row>
            <el-space wrap>
              <el-avatar :size="25" :icon="UserFilled"/>
              <span style="zoom:0.95;font-weight: 500;">杨波</span>
              <el-divider direction="vertical"></el-divider>
              <el-text style="zoom:0.85; font-weight: 400;">Be Strong, be humble.</el-text>
            </el-space>
          </el-row>
          <el-row style="margin-top: 6px;margin-left: 31px;">
            <el-space wrap>
                <el-text style="zoom:1;font-size:xx-small;">点赞了你的帖子</el-text>
                <el-text type="info" style="zoom:1;font-size:xx-small;">人工智能模型与挑战</el-text>
            </el-space>
          </el-row>
      </el-col>
      <el-col :span="3">
        <el-row style="margin-top: 10px;">
          <el-button round>
            <el-icon><Pointer /></el-icon>
            <span style="zoom: 0.85;font-weight: 350;">查看</span>
          </el-button>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-text style="zoom: 0.9;" info> 2023-9-10 </el-text>
        </el-row>
      </el-col>
    </el-row>
    <el-divider style="margin-left:70px;width: 750px;"></el-divider>
  </div>
  </template>
  
  <script setup>
  import { UserFilled } from '@element-plus/icons-vue'
  </script>
  
  <style scoped>
  .message{
    margin-top: 30px;

  }
    
  </style>
  