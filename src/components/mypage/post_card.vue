<template>
<div class="post" @click="router.push({name:'post',params: {postid:p.postID}})">
    <el-row class="side" @click="router.push({name:'post',params: {postid:p.postID}})">
      <span class="title">{{ p.title }}</span>
      <el-tag type="error" v-if="p.is_essence" effect="dark">精华</el-tag>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-col :span="6">
            <img src="@/assets/login3.png" class="image"/>
        </el-col>
        <el-col :span="18">
                <el-row>
                        <el-space>
                        <el-avatar v-if="p.author.avatar" :size="25" :src="p.author.avatar" shape="square"></el-avatar>
                        <el-avatar v-else :size="25" shape="square">
                            <el-icon><UserFilled /></el-icon>
                        </el-avatar>
                        <el-text style="scale:0.95" type="info">{{ p.author.username }}</el-text>
                    </el-space>                                 
                </el-row>
                <el-row style="margin-top: 10px;width: 100%;">
                    <el-text size="large">
                        {{ p.content }}
                    </el-text>
                </el-row>
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px; width: 100%; display: flex; justify-content: space-between; align-items: center;">
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
import { defineProps } from 'vue';
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
    width: 800px;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--el-border-color);
    transition: margin-left 0.5s ease;
}

.post:hover{
margin-left: 60px;
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
    margin-top: 4px;
    color: #727070cd;
    font-size: 15px;
}
  
.side{
  display: flex; justify-content: space-between; align-items: center;
}

</style>
