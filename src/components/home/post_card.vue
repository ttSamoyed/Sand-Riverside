<template>
<div class="post">
    <el-row class="side" @click="router.push({name:'post',params: {postid:p.postID}})">
      <span class="title">{{ p.title }}</span>
      <el-tag type="error" v-if="p.is_essence" effect="dark">精华</el-tag>
    </el-row>
    <el-row style="margin-top: 10px;" @click="router.push({name:'post',params: {postid:p.postID}})">
      <el-col :span="6">
        <img v-if="p.coverImg" :src="p.coverImg" class="image" />
        <img v-else src="@/assets/login3.png" class="image" />
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-space wrap>
            <el-avatar v-if="p.author.avatar" :size="25" :src="p.author.avatar" shape="square"></el-avatar>
            <el-avatar v-else :size="25" shape="square">
                <el-icon><UserFilled /></el-icon>
            </el-avatar>
            <el-text type="info">{{ p.author.username }}</el-text>
          </el-space>
        </el-row>
        <el-row style="margin-top: 10px; width: 100%;">
          <el-text size="large">{{ p.content }}</el-text>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px; width: 100%; display: flex; justify-content: space-between; align-items: center;">
        <span class="view_com">
          <el-space>
            <el-tag style="scale:0.95" effect="dark"><el-icon><Guide /></el-icon>{{ p.plate.name }}</el-tag>
            <el-tag type="info" style="scale: 0.95;"> <el-icon style=" margin-right: 5px;"><Top></Top></el-icon>{{ p.like_count }}</el-tag>
            <el-tag type="info" style="scale: 0.95;"> <el-icon style=" margin-right: 5px;"><View></View></el-icon>{{ p.views }}</el-tag>
          </el-space>
        </span>
        <el-tag type="info" style="scale: 0.95;">发布于:{{ readableDate }}</el-tag>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, defineProps } from 'vue';
const router = useRouter();
const props = defineProps({
  p: Object, // 指定p属性的类型
});
const { p } = props;
const date = new Date(p.created)
const readableDate = date.toLocaleString()
</script>

<style scoped>
.post{
    height: 220px;
    min-width: 800px;
    margin-left: 30px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid var(--el-border-color);
    transition: margin-left 0.5s ease;
}

.post:hover{
margin-left: 20px;
color: rgb(18, 126, 233);
}

.title{
    margin-top: 10px;
    font-weight: 500;
}

.image {
    width: 180px;
    height: 130px;
    border-radius: 5px;
    object-fit: cover;
    display:block;
  }

.view_com{
    color: #727070cd;
    font-size: 15px;
}

.side{
  display: flex; justify-content: space-between; align-items: center;
}
  
</style>
