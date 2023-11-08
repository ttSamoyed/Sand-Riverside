<template>
    <div class="info">
        <el-row>
            <span style="font-size:20px; font-weight:500">找到包含 {{ content }} 的文章{{ count }}篇</span>
        </el-row>
    </div>
    <el-row class="center">
        <div class="nopost" v-if="posts.length==0">
        <el-text style="font-size:16px;">未搜索到有关帖子哦😯！快去发一篇吧</el-text>
    </div>
    <post_card v-for="(post,index) in posts" :key="post.postID" :p="post"></post_card>
    </el-row>
    <div class="center">
          {{ count }}
          <el-pagination v-model:currentPage="currentPage"
           layout="prev, pager, next" :total="totalcounts" :page-size="10"
           @current-change="loadBlogs"
           />
    </div> 
</template>

<script setup>
import { ElTimeline, ElTimelineItem, ElCard, ElMessage } from 'element-plus';  
import { ref, onMounted, watchEffect } from 'vue';  
import DataService from '@/components/services/DataService';  
import { useRoute } from 'vue-router';  
import post_card from "@/components/home/post_card.vue"  
import { defineProps } from 'vue';  

const loading = ref(true)  
const posts = ref({}) 
const totalcounts = ref()
const content = ref(useRoute().query.content)
const currentPage =ref(1)

const loadBlogs = async () => {
  try {  
    loading.value = true; 
    let response;  
      response = await DataService.Search_Blogs({ title:content.value,page:currentPage.value});  
    console.log('response=',response);  
    loading.value = false;  
      posts.value = response.data.results;  
      totalcounts.value = response.data.count;
    console.log('posts=',posts.value)  
  }
  catch (error) {        
    loading.value = false;  
    ElMessage.error('Failed to fetch data. Please try again.');  
    console.error(error);  
  }  
}

onMounted(async () => {  
  // 初始化  
  loadBlogs();
});  

</script>

<style scoped>
.info{
  margin-left: 360px;
  padding-left: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-left: 3px solid var(--el-color-primary);
}
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nopost{
  text-align:center;
  margin-top:30px;
}
</style>