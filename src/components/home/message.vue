<template>
    <div class="messagebox">
        <el-row>
        <el-col :span="4">
            <el-avatar :size="40" :src="user.useravatar"/>
        </el-col>
        <el-col :span="20">
            <el-row>
            <el-space wrap>
                <span style="zoom:0.8;font-weight: 500;">{{ user.username }}</span>
                <el-divider direction="vertical"></el-divider>
                <el-text style="zoom:0.8; font-weight: 400;">{{ user.usersign }}</el-text>
            </el-space>
            </el-row>
            <el-row>
            <el-space wrap>
                <span v-if="useraction.like" style="zoom:0.8;font-size:xx-small;">点赞了你的帖子</span>
                <span v-if="useraction.comment" style="zoom:0.8;font-size:xx-small;">评论了你的帖子</span>
                <el-text type="info" style="zoom:0.8;font-size:xx-small;">{{ post.name }}</el-text>
            </el-space>
            </el-row>
        </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const user = ref({
    username: '用户名',
    useravatar: 'https://img2.baidu.com/it/u=3513073338,239101075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    usersign: '此用户很懒，还没有设置签名',
})

const useraction = ref({ like: true, comment: false });
const post = ref({
    name: '帖子名称',
    id: '1'
})


</script>