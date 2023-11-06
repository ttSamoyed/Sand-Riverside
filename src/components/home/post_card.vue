<template>
<div class="post" @click="router.push({name:'post',params: {postid:p.postID}})">
    <el-row>
      <span class="title">{{ p.title }}</span>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="6">
        <img v-if="p.coverImg" :src="p.coverImg" class="image" />
        <img v-else src="@/assets/login3.png" class="image" />
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-space wrap>
            <el-avatar :size="20" shape="square">
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
    <el-row style="margin-top: 10px;">
      <el-button plain>
        <el-icon size="16"><CaretTop /></el-icon>
        {{ p.like_count }}
      </el-button>
      <el-button plain>
        <el-icon size="16"><Collection /></el-icon>
      </el-button>
      <span class="view_com">
        <el-space wrap>
          <el-icon><ChatRound /></el-icon>{{ p.comments }}
          <el-icon style="margin-left: 10px;"><View></View></el-icon>{{ p.views }}
        </el-space>
      </span>
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
</script>

<style scoped>
.post{
    height: 220px;
    width: 800px;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
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
    margin-left: 25px;
    color: #727070cd;
    font-size: 15px;
}
  
</style>
