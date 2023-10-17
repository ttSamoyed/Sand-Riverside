<template>
    <el-card shadow="hover" class="card">
        <el-text class="gradient-text">数说河畔</el-text>
        <div style="height: 10px;"></div>
        <el-row style="width: 100%;">
        <el-col :span="6">
            <el-statistic title="活跃用户 💻" :value="268500" />
        </el-col>
        <el-col :span="6">
            <el-statistic :value="138">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                    🧑🏻‍💻 性别比例 👩🏻‍💻
                </div>
            </template>
            <template #suffix>/100</template>
            </el-statistic>
        </el-col>
        <el-col :span="6">
            <el-statistic title="帖子总数 💌" :value="172000" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="互动总数 🫧" :value="562">
            <template #suffix>
                <el-icon style="vertical-align: -0.125em">
                <ChatLineRound />
                </el-icon>
            </template>
            </el-statistic>
        </el-col>
        </el-row>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { ChatLineRound, Male } from '@element-plus/icons-vue'
  </script>
  
  <style scoped>
  .el-col {
    text-align: center;
  }
  .card {
    margin-top: 30px;
    width: 83%;
    border-radius: 10px;
  }
  
  .gradient-text {
    zoom: 0.9;
  font-weight:500;
  background: linear-gradient(40deg, rgb(58,103,237), rgb(118,168,225));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }


  </style>
  