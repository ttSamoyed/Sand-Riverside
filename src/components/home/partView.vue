<template>
    <div class="post_list" id="target">
        <el-row>
        <el-col :span="19" style="padding-left: 45px;" v-loading="loading" element-loading-text="Loading...">
          <div class="nopost" v-if="posts.length==0">
            <el-text style="font-size:16px;">这个板块还没有帖子捏😯！快去发一篇吧</el-text>
          </div>
            <post_card v-for="(post,index) in posts" :key="post.postID" :p="post"></post_card>
            <el-backtop :right="100" :bottom="100" />
        <div class="center">
          <el-divider></el-divider>
          <el-pagination v-model:currentPage="currentPage"
           layout="prev, pager, next" :total="totalcounts" :page-size="5"
           @current-change="loadBlogs"
           />
        </div>    
        </el-col>
        <el-col :span="5">
            <div class="info">
                <el-row>
                <span class="smalltitle">{{ name[index["p"]] }}</span>
                </el-row>
                <el-row style="margin-top: 3px;">
                <el-space>
                    <el-text class="banzhu">板块由</el-text>
                    <el-avatar v-if="adminavatar" :size="20" :src="adminavatar" shape="square"/>
                    <el-avatar v-else :size="20" shape="square"><el-icon :size="20"><Avatar /></el-icon></el-avatar>
                    <el-text class="banzhu">{{ admin }}</el-text>
                    <el-text class="banzhu">管理</el-text>
                </el-space>
                </el-row>
            </div>
        </el-col>
        </el-row>
    </div>
</template>


<script setup>  
import { ElTimeline, ElTimelineItem, ElCard, ElMessage } from 'element-plus';  
import { ref, onMounted, watchEffect } from 'vue';  
import DataService from '@/components/services/DataService';  
import { useRoute } from 'vue-router';  
import post_card from "@/components/home/post_card.vue"  
import { defineProps } from 'vue';  
import { async } from '@kangc/v-md-editor';
  
const loading = ref(true)  
const name = ['','水手之家','校园热点','校园活动','失物招领','二手买卖','鹊桥','话心','就业创业','出国留学','保研考研']  
const index = defineProps(['p']);  
const admin = ref('管理员')  
const adminavatar=ref(null);
const posts = ref({})  
const content = ref(useRoute().query.content)
const totalcounts = ref()
const currentPage =ref(1)

const loadBlogs = async() => {
  try {  
    //回到顶部
    target.scrollIntoView();
    loading.value = true;  
    let response;  
    response = await DataService.Search_Blogs({plate__plateID:index["p"], page:currentPage.value});  
   // postID: "", title: "1", content: "", author__userID: "1", author__username: "1"
   //  Search_Blogs( plate__plateID, title, content, author__username, tags__name, plate__name, is_essence, page = 1, page_size = 10) {

        //Get_Plate_Detail(plateid)

    console.log(index["p"]);  
    console.log('response=',response);  
    loading.value = false;  
    posts.value = response.data.results;  
    totalcounts.value = response.data.count;
    console.log('posts=',posts.value)  
  } catch (error) {        
    loading.value = false;  
    ElMessage.error('获取信息失败，请检查网络并确认登录状态');  
    console.error(error);  
  }  
}
  
onMounted(async () => {  
  loadBlogs();
});  
  
const getinf = async () => {
  // 初始化  
  try {  
    loading.value = true;  
    let response;  
    response = await DataService.Search_Blogs({plate__plateID:index["p"], page_size:4});  
    console.log(index["p"]);  
    console.log('response=',response);  
    loading.value = false;  
    posts.value = response.data.results;  
    totalcounts.value = response.data.count;
    console.log('posts=',posts.value) ;
    const response2 = await DataService.Get_Plate_Detail(index["p"]);
    if( response2.data.plate.moderators.length!=0)
    {
      admin.value=response2.data.plate.moderators[0].username;
      const response3 = await DataService.Get_Personal_Info(response2.data.plate.moderators[0].userID);
      adminavatar.value=response3.data.user_info.avatar;
    }
    else{
      admin.value="管理员";
      adminavatar.value=null;
    }
  
     
  } catch (error) {        
    loading.value = false;  
    ElMessage.error('获取信息失败，请检查网络并确认登录状态');  
    console.error(error);  
  }  
};

watchEffect((on) => {  
  on(() => {  
    currentPage.value = 1;
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
.nopost{
  text-align:center;
  margin-top:30px;
}

</style>