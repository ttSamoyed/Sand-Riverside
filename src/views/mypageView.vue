<template>
    <div class="center">
        <el-row>
            <usr_card></usr_card>
        </el-row>
    </div>
    <div class="center">
        <el-row>
            <top_nav @post="label='1';loadMyBlog();" @interaction="label='2'" @settings="label='3'" @manage="label='4'"></top_nav>
        </el-row>
    </div>
    <div class="center">
        <div class="main">
            <ul class="infinite-list" style="overflow: auto" v-loading="loading" element-loading-text="Loading...">
                <div v-if="label=='1'">
                    <post_card v-for="(post,index) in posts" :key="post.postID" :p="post"></post_card>
                </div>  
                <div v-if="label=='2'">
                    
                    <message_card></message_card>

                </div>
                <div v-if="label=='3'">
                    <setting_card></setting_card>
                </div>
                <div v-if="label=='4'">
                    <div class="center">
                        <el-text style="padding-top:50px;font-size: 15px;">你不是沙河畔版主 请联系河畔管理员以获得管理权限</el-text>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import usr_card from '../components/mypage/usr_card.vue';
import top_nav from '../components/mypage/top_nav.vue'
import post_card from '../components/mypage/post_card.vue';
import message_card from '../components/mypage/message_card.vue';
import setting_card from "../components/mypage/setting_card.vue";
import DataService from '../components/services/DataService';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
const label = ref('1')
const loading = ref(true)
const posts=ref({})

const loadMyBlog = async () => {
    try {  
        loading.value = true;  
        let response;  
        response = await DataService.Get_My_Blogs();  
    // postID: "", title: "1", content: "", author__userID: "1", author__username: "1"
    //  Search_Blogs( plate__plateID, title, content, author__username, tags__name, plate__name, is_essence, page = 1, page_size = 10) {
        console.log('response=',response);  
        loading.value = false;  
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

const loadMyInteraction = async () => {
    try {  
        loading.value = true;  
        let response;  
        response = await DataService.Get_My_Blogs();  
    // postID: "", title: "1", content: "", author__userID: "1", author__username: "1"
    //  Search_Blogs( plate__plateID, title, content, author__username, tags__name, plate__name, is_essence, page = 1, page_size = 10) {
        console.log('response=',response);  
        loading.value = false;  
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
  // 初始化  
    loadMyBlog();
});  

</script>

<style scoped>
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main{
    margin-top: 10px;
    width: 900px;
    height: 485px;
    border: 1px solid #b4b2b251;
    border-radius: 5px;
}

.infinite-list {
  height: 485px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

</style>