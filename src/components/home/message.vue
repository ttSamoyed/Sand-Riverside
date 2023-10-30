<template>
    <div class="messagebox">
        <el-row>
        <el-col :span="4">
            <el-avatar :size="40" :icon="UserFilled"/>
        </el-col>
        <el-col :span="20">
            <el-row>
            <el-space wrap>
                <span style="zoom:0.8;font-weight: 500;">熊磊</span>
                <el-divider direction="vertical"></el-divider>
                <el-text style="zoom:0.8; font-weight: 400;">Be Strong, be humble.</el-text>
            </el-space>
            </el-row>
            <el-row>
            <el-space wrap>
                <span style="zoom:0.8;font-size:xx-small;">点赞了你的帖子</span>
                <el-text type="info" style="zoom:0.8;font-size:xx-small;">人工智能模型与挑战</el-text>
            </el-space>
            </el-row>
        </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script setup>
import { UserFilled } from '@element-plus/icons-vue'
</script>