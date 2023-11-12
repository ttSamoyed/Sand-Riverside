<template>
      <el-card :body-style="{ padding: '0px' }" style="border-radius: 5px;" @click="router.push({name:'post',params: {postid:p.postID}})">
        <img v-if="p.coverImg"
          :src="p.coverImg"
          class="image"
        />
        <img v-else
          src="@/assets/login3.png"
          class="image"
        />
        <div style="padding: 10px">
          <div class="title">
            <el-text style="font-size: 17px; font-weight: 500;">{{p.title}}</el-text>
            <el-tag><el-icon><Guide /></el-icon>{{ p.plate.name }}</el-tag>
          </div>
          <div class="bottom">
            <el-text type="info" style="zoom: 0.9;">{{readableDate}}</el-text>
            <el-space>
              <el-avatar v-if="p.author.avatar" :size="25" :src="p.author.avatar" shape="square"></el-avatar>
                        <el-avatar v-else :size="25" shape="square">
                            <el-icon><UserFilled /></el-icon>
                        </el-avatar>
              <el-text type="info">{{ p.author.username }}</el-text>
            </el-space>
          </div>
        </div>
      </el-card>
  
</template>
<!-- //热门页面 -->
<script setup>
import { useRouter } from 'vue-router';
import {ref}  from 'vue';
const router = useRouter();
const props = defineProps({
  p: Object, // 指定p属性的类型
});
const { p } = props;
const date = new Date(p.created)
const readableDate = date.toLocaleString()
</script>

<style scoped>
.item {
  margin-left:50px;
  mardin-bottom:30px;
}
.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display:block;
}
.title {
  margin-bottom:10px;
  display: flex; justify-content: space-between; align-items: center;
}
.bottom {
  display: flex; justify-content: space-between; align-items: center;
}
.el-card{
  transition: margin-left 0.5s ease;
}
.el-card:hover{
margin-left: 15px;
color: rgb(18, 126, 233);
}
</style>