<template>
    <div class="post_list" >
        <el-row>
        <el-col :span="19" style="padding-left: 45px;">

            <post_card v-for="(post,index) in posts" :key="post.postID" :p="post"></post_card>
            
        </el-col>
        <el-col :span="5">
            <div class="info">
                <el-row>
                <span class="smalltitle">{{ name[index["p"]] }}</span>
                </el-row>
                <el-row style="margin-top: 3px;">
                <el-space>
                    <el-text class="banzhu">板块由</el-text>
                    <el-avatar :size="20" shape="square">
                    <el-icon><UserFilled /></el-icon>
                    </el-avatar>
                    <el-text class="banzhu">{{ admin }}</el-text>
                    <el-text class="banzhu">管理</el-text>
                </el-space>
                </el-row>
            </div>
        </el-col>
        </el-row>
    </div>
</template>

<!-- <script setup>
import { ElTimeline, ElTimelineItem, ElCard, ElMessage } from 'element-plus';
import { ref, onMounted,watch } from 'vue';
import DataService from '@/components/services/DataService';
import { useRoute } from 'vue-router';
import post_card from "@/components/home/post_card.vue"
import { defineProps } from 'vue';

const loading = ref(true)
const name = ['','水手之家','校园热点','校园活动','失物招领','二手买卖','鹊桥','话心','就业创业','出国留学','保研考研']
const index = defineProps(['p']);
const admin = ref('管理员')
const posts = ref({})

onMounted(async () => {
  //初始化
    try {
      loading.value = true;
      
      let response;
      response = await DataService.Search_Blogs(index["p"]);
      console.log(index["p"]);
      console.log('response=',response);
      loading.value = false;
      posts.value = response.data.results;
      console.log('posts=',posts.value)
    }
    catch (error) {      
      loading.value = false;
      ElMessage.error('Failed to fetch data. Please try again.');
      console.error(error);
    }
});

</script> -->

<script setup>  
import { ElTimeline, ElTimelineItem, ElCard, ElMessage } from 'element-plus';  
import { ref, onMounted, watchEffect } from 'vue';  
import DataService from '@/components/services/DataService';  
import { useRoute } from 'vue-router';  
import post_card from "@/components/home/post_card.vue"  
import { defineProps } from 'vue';  
  
const loading = ref(true)  
const name = ['','水手之家','校园热点','校园活动','失物招领','二手买卖','鹊桥','话心','就业创业','出国留学','保研考研']  
const index = defineProps(['p']);  
const admin = ref('管理员')  
const posts = ref({})  
  
onMounted(async () => {  
  // 初始化  
  try {  
    loading.value = true;  
    let response;  
    response = await DataService.Search_Blogs(index["p"]);  
    console.log(index["p"]);  
    console.log('response=',response);  
    loading.value = false;  
    posts.value = response.data.results;  
    console.log('posts=',posts.value)  
  } catch (error) {        
    loading.value = false;  
    ElMessage.error('Failed to fetch data. Please try again.');  
    console.error(error);  
  }  
});  
  
const getinf = async () => {
  // 初始化  
  try {  
    loading.value = true;  
    let response;  
    response = await DataService.Search_Blogs(index["p"]);  
    console.log(index["p"]);  
    console.log('response=',response);  
    loading.value = false;  
    posts.value = response.data.results;  
    console.log('posts=',posts.value)  
  } catch (error) {        
    loading.value = false;  
    ElMessage.error('Failed to fetch data. Please try again.');  
    console.error(error);  
  }  
};

watchEffect((on) => {  
  on(() => {  
    // 当 index["p"] 发生变化时，执行此处的代码...  
    console.log('index["p"] has changed');  
    // 在此处可以重新执行 DataService.Search_Blogs(index["p"]) 来获取新的数据等。 
    getinf();
  }, index["p"]);  // 监听 index["p"] 的变化  
});  
</script>


<style scoped>
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info{
  margin-left: 20px;
  padding-left: 20px;
  margin-top: 20px;
  padding-top: 1px;
  padding-bottom: 3px;
  border-left: 2.5px solid var(--el-color-primary);
}
.smalltitle{
  font-weight: 500;
  font-size: 20px; 
}

.banzhu{
  zoom: 0.8;
}

</style>