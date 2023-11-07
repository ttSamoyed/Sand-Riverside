<template>

      <el-card :body-style="{ padding: '0px' }" style="border-radius: 5px;" >
        <img v-if="p.coverImg"
          :src="p.coverImg"
          class="image"
        />
        <img
          src="@/assets/login3.png"
          class="image"
        />
        <div style="padding: 10px">
          <el-text style="font-size: 17px; font-weight: 500;">{{p.title}}</el-text>
          <div class="bottom">
            <el-text type="info" style="zoom: 0.9;">{{readableDate}}</el-text>
            <el-button type="primary" class="button" @click="router.push({name:'post',params: {postid:p.postID}})" round plain>浏览</el-button>
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
  width: 310px;
  height: 300px;
  object-fit: cover;
  display:block;
}
</style>