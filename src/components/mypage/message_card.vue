<template>
  <div class="message" v-if="n.actor">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="15">
          <el-row>
            <el-space wrap>
              <el-avatar v-if="n.actor.avatar!=null" :size="25" :src="avatar"/>
              <el-avatar v-else :size="25"><el-icon><Avatar /></el-icon></el-avatar>
              <span style="zoom:0.95;font-weight: 500;">{{ n.actor.username }}</span>
              <el-divider direction="vertical"></el-divider>
              <el-text style="zoom:0.85; font-weight: 400;">{{ n.actor.status }}</el-text>
            </el-space>
          </el-row>
          <el-row style="margin-top: 6px;margin-left: 31px;">
            <el-space wrap>
              <span style="zoom:0.9;font-size:xx-small;">{{ n.description }}</span>
              <el-text v-if="n.target.name" type="primary" style="zoom:0.9;font-size:xx-small;"> <el-text>恭喜你🎉！</el-text>{{ n.target.name }}板块 <el-text>现在由您管理，去尝试吧</el-text></el-text>
              <el-text type="primary" @click="router.push({name:'post',params: {postid:n.target.postID}})"
               style="zoom:0.9;font-size:xx-small;">{{ n.target.title }}</el-text>
            </el-space>
          </el-row>
      </el-col>
      <el-col :span="3">
        <el-row style="margin-top: 10px;">
          <el-button round @click="router.push({name:'post',params: {postid:n.target.postID}})">
            <el-icon><Pointer /></el-icon>
            <span style="zoom: 0.85;font-weight: 350;">查看</span>
          </el-button>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-text style="zoom: 0.9;" info> {{ readableDate }} </el-text>
        </el-row>
      </el-col>
    </el-row>
    <el-divider style="margin-left:70px;width: 750px;"></el-divider>
  </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { defineProps } from 'vue';

  const props = defineProps({
    n: Object, // 指定p属性的类型
  });
  const { n } = props;
  const avatar = computed(() => {
     return 'http://124.222.42.111:8000' + n.actor.avatar
  });
  
  const router = useRouter();
  const date = new Date(n.timestamp)
  const readableDate = date.toLocaleString()

  </script>
  
  <style scoped>
  .message{
    margin-top: 30px;

  }
    
  </style>
  