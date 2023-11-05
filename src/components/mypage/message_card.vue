<template>
  <div class="message">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="15">
          <el-row>
            <el-space wrap>
              <el-avatar :size="25" :src="user.useravatar"/>
              <span style="zoom:0.95;font-weight: 500;">{{ user.username }}</span>
              <el-divider direction="vertical"></el-divider>
              <el-text style="zoom:0.85; font-weight: 400;">{{ user.usersign }}</el-text>
            </el-space>
          </el-row>
          <el-row style="margin-top: 6px;margin-left: 31px;">
            <el-space wrap>
              <span v-if="useraction.like" style="zoom:0.9;font-size:xx-small;">点赞了你的帖子</span>
              <span v-if="useraction.comment" style="zoom:0.9;font-size:xx-small;">评论了你的帖子</span>
              <el-text type="info" style="zoom:0.9;font-size:xx-small;">{{ post.name }}</el-text>
            </el-space>
          </el-row>
      </el-col>
      <el-col :span="3">
        <el-row style="margin-top: 10px;">
          <el-button round>
            <el-icon><Pointer /></el-icon>
            <span style="zoom: 0.85;font-weight: 350;" @click="router.push({name:'post',params: {postId:post.id}})">查看</span>
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
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  const router = useRouter();
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
  
  <style scoped>
  .message{
    margin-top: 30px;

  }
    
  </style>
  