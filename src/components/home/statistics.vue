<template>
    <el-card shadow="hover" class="card">
        <el-text style="zoom:0.9;">数说河畔</el-text>
        <div style="height: 10px;"></div>
        <el-row style="width: 100%;">
        <el-col :span="6">
            <el-statistic title="活跃用户" :value="268500" />
        </el-col>
        <el-col :span="6">
            <el-statistic :value="138">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                男女比例
                <el-icon style="margin-left: 4px" :size="12">
                    <Male />
                </el-icon>
                </div>
            </template>
            <template #suffix>/100</template>
            </el-statistic>
        </el-col>
        <el-col :span="6">
            <el-statistic title="帖子总数" :value="172000" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="互动总数" :value="562">
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

  </style>
  