<template>
    <el-badge :value="1" class="item" type="primary">
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 5px;" >
          <img
            src="@/assets/login3.png"
            class="image"
          />
          <div style="padding: 10px">
            <el-text style="font-size: 17px; font-weight: 500;">{{post.title}}</el-text>
            <div class="bottom">
              <el-text type="info" style="zoom: 0.9;">{{post.createdtime}}</el-text>
              <el-button type="primary" class="button" @click="router.push({name:'post',params: {postid:post.id}})" round plain>浏览</el-button>
            </div>
          </div>
        </el-card>
    </el-badge>
    
</template>
<!-- //热门页面 -->
<script setup>
import { useRouter } from 'vue-router';
import {ref}  from 'vue';
const router = useRouter();
const post=ref({
  title:'标题',
  createdtime:'创建时间',
  id:1,
})

</script>

<style scoped>
.image {
    width: 310px;
    height: 300px;
    object-fit: cover;
    display:block;
  }
</style>