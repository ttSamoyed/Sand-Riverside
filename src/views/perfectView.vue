<template>
  <div class="info">
      <el-row>
        <span style="font-size:30px; font-weight:500">精华</span>
      </el-row>
  </div>
  <div  v-loading="loading">
    <div v-if="loading==false">
      <el-row v-for="row in 2" :key="row" style="padding-left: 0px; width: 100%; margin-bottom: 40px">
        <el-col v-for="col in 3" :key="col" :span="5" :offset="2">
          <div v-if="(row - 1) * 3 + col - 1 < posts.length">
            <cover_card  :p="posts[(row - 1) * 3 + col - 1]"></cover_card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import cover_card from "@/components/post/cover_card.vue"
import DataService from '../components/services/DataService';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
const loading = ref(true)
const posts=ref({})


const loadHotBlog = async () => {
  try {  
      loading.value = true;  
      let response;  
      response = await DataService.Get_Essence_Blogs(1,6);  
      console.log('response=',response);  
      loading.value = false;  
      console.log('loading=',loading.value)
      posts.value = response.data.results;  
      console.log('posts=', posts.value)  
      console.log('post0=',posts.value[0])
  }
  catch (error) {        
      loading.value = false;  
      ElMessage.error('Failed to fetch data. Please try again.');  
      console.error(error);  
  }  
} 
onMounted(async () => {  
  loadHotBlog();
});  

</script>

<style scoped>
.info{
  margin-left: 130px;
  padding-left: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-left: 3px solid var(--el-color-primary);
}

.time {
  font-size: 12px;
  color: #999;
}

.center{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display:block;
}
</style>
