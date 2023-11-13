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
        <div class="main" v-loading="loading" element-loading-text="Loading...">
            <ul class="infinite-list" style="overflow: auto" v-loading="loading" element-loading-text="Loading..." id="target">
                <div v-if="label=='1'">
                    <post_card v-for="(post,index) in posts" :key="post.postID" :p="post"></post_card>
                    <div class="center">
                        <el-divider></el-divider>
                        <el-pagination v-model:currentPage="currentPage"
                        layout="prev, pager, next" :total="totalcounts" :page-size="10"
                        @current-change="loadMyBlog"
                        />
                    </div>
                </div>  
                <div v-if="label=='2'">
                    <div class="center" v-if="totalcountsMessage==0">
                        <el-text style="padding-top:50px;font-size: 15px;">您还没有新消息哦！多多发帖吧</el-text>
                    </div>
                    <div v-else>
                        <message_card v-for="(notification,index) in notifications" :key="notification.id" :n="notification"></message_card>
                        <div class="center">
                            <el-divider></el-divider>
                            <el-pagination v-model:currentPage="currentPageMessage"
                            layout="prev, pager, next" :total="totalcountsMessage" :page-size="4"
                            @current-change="loadNotification"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="label=='3'">
                    <setting_card></setting_card>
                </div>
                <div v-if="label=='4'">
                    <managePart v-if="user.groups.length==2 && user.groups[1]==3"></managePart>
                    <div class="center" v-else>
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
import managePart from '../components/mypage/managePart.vue';
import { ref, onMounted, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { ElMessage } from 'element-plus';
const label = ref('1')
const loading = ref(true)
const posts = ref({})
const notifications = ref({})
const totalcounts = ref()
const currentPage = ref(1)
const currentPageMessage = ref(1)
const totalcountsMessage = ref()
const user = useLocalStorage('user', {})

const toTop = () => {
      document.documentElement.scrollTop = 0;
}

const loadMyBlog = async () => {
    try { 
        target.scrollIntoView();
        toTop(); 
        loading.value = true;  
        let response;  
        response = await DataService.Get_My_Blogs(currentPage.value);  
    // postID: "", title: "1", content: "", author__userID: "1", author__username: "1"
    //  Search_Blogs( plate__plateID, title, content, author__username, tags__name, plate__name, is_essence, page = 1, page_size = 10) {
        console.log('response=',response);  
        loading.value = false;  
        posts.value = response.data.results;  
        totalcounts.value = response.data.count;
        console.log('posts=', posts.value)  
        console.log('post0=',posts.value[0])
    }
    catch (error) {        
        loading.value = false;  
        ElMessage.error('Failed to fetch data. Please try again.');  
        console.error(error);  
    }  
}

const loadNotification = async () => {
    try {
        toTop();
      target.scrollIntoView(); 
      loading.value = true
      let response;
      response = await DataService.Get_Notification_List(currentPageMessage.value,4);
      console.log('response=', response);
        notifications.value = response.data.results
        totalcountsMessage.value = notifications.value[notifications.value.length-1].unread_count;
        console.log('notification总数',totalcountsMessage.value)
      console.log('notification',notifications.value)
      loading.value = false;
    }
    catch (error) {        
      loading.value = false;  
      ElMessage.error('此页面无法加载，请稍后重试');  
      console.error(error);  
  }  
}

onMounted(async () => {  
    // 初始化  
    loadMyBlog();
    loadNotification();
    console.log('user',user.value)
});  

watch(label.value, () => {
 currentPage.value = 1;
 currentPageMessage.value = 1;
 console.log('labelchangeto', label.value)
 loadMyBlog();
 loadNotification();
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