<template>
    <div class="top-bar">
      <div>
        <img class="icon" src="@/assets/shpicon.png">
        <img class="logo" src="@/assets/shplogo.png">
      </div>
      <div class="spacer"></div>
      <div class="nav-links">
        <router-link to="/"><el-link>主页</el-link></router-link>
        <router-link to="/hot"><el-link>热门</el-link></router-link>
        <router-link to="/perfect"><el-link>精华</el-link></router-link>
        <router-link to="/aboutUS"><el-link>关于我们</el-link></router-link>
        <router-link to="/login" v-if="isLogin==false"><el-link>登录</el-link></router-link>
      </div>
      <div class="search-box">

        <el-input
          v-model="content" 
          size="default"
          placeholder="搜一搜，发现校园新鲜事"
          :prefix-icon="Search" @blur="searchByblur"
          @keyup.enter="search"
        />
      </div>
      <div class="dark">
        <Dark></Dark>
      </div>
      <div class="message">
        <el-button text>
          <router-link to="/writePost" v-if="isLogin">
            <el-icon size="22" style="margin-top:2.5px;color: var(--el-color-primary);"><Edit /></el-icon>
          </router-link>
        </el-button>
        <el-button text @click="drawer = true" v-if="isLogin">
          <el-icon size="22" style="color: var(--el-color-success);"><ChatDotSquare /></el-icon>
        </el-button>
      </div>
      <div class="user" >
        <a href="https://github.com/ttSamoyed/Sand-Riverside" style="margin-right: 20px;">
                <img style="height:30px;" 
                src="@/assets/github.png"
                alt="Fork me on GitHub" >
        </a>
        <el-dropdown v-if="isLogin">
          <el-avatar  @click="handleAvatarClick" :size="30" :src="user.avatar" shape="square"/>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-avatar v-else @click="handleAvatarClick" :size="30" shape="square">
          <el-icon :size="20"><Avatar /></el-icon>
        </el-avatar>
      </div>
    </div>
    <el-drawer
      v-model="drawer"
      title="消息"
      :direction="rtl"
      size="22%"
    >
    <!-- <el-text>还没有新消息，去参与互动吧 🥳</el-text> -->
    <message v-for="(notification,index) in notifications" :key="notification.id" :n="notification"></message>
  </el-drawer>
</template>

<script setup>
import Dark from './dark.vue'
import { computed, ref,onMounted,watchEffect } from 'vue';
import { Search, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import message from '../home/message.vue'
import { useLocalStorage } from '@vueuse/core'
import DataService from "@/components/services/DataService.js";
import { async } from '@kangc/v-md-editor';

const router = useRouter();
const notifications = ref({})

const state = useStore().state
const user = JSON.parse(localStorage.getItem('user'))

const isLogin = useLocalStorage('status', false)
const loading=ref(true)
const avatar = state.user.avatar;

const content = ref('')
const drawer = ref(false)

console.log('>>>isLogin', isLogin);
console.log('>>>user', user);

const logOut = async () => {
  try {
    await DataService.Logout();
    localStorage.clear();
    router.push({ path: '/' });
    ElMessage.success('退出登录成功');
    window.location.reload();
  } catch (error) {
    console.error('Failed to log out:', error);
    ElMessage.error('退出登录失败');
  }
}

const handleAvatarClick = () => {
  if (localStorage.getItem('status')) {
      console.log('跳转到mypage')
      router.push({path:'/mypage'})
  }
  else {
      router.push({path:'/login'})
  }
}

const searchByblur=()=>{
    search()
}
const search=()=>{
    router.push({name:'search',query:{content:content.value}})
    content.value=''
}

const loadNotification = async () => {
    if (localStorage.getItem('status')) {
      try {
        loading.value = true
        let response;
        response = await DataService.Get_Notification_List();
        console.log('response=', response);
        notifications.value = response.data.results
        console.log('notification',notifications.value)
        loading.value = false;
      }
      catch (error) {        
        loading.value = false;  
        ElMessage.error('获取信息失败，请检查网络并重新登录');  
        localStorage.clear();
        console.error(error);  
    }  
  }
}

onMounted(async () => {  
    loadNotification();
});  


</script>


<style scoped>
   /* Reset the default style */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Style the top bar */
  .top-bar {

    /* background-color: white; */
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 20px;
    border-bottom: 1px solid #b4b2b251;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
  
  /* Style the logo */
  .logo {
    width: 80px;
    height:auto;
    padding-bottom: 4.5px;
    padding-left: 5px;
  }

  
  .icon {
    width: 40px;
    height:auto;
    padding-top:3px;
    padding-bottom: 3px;
    padding-right: 6px;
    border-right: 2px solid #b4b2b251;
  }
  /* Style the navigation links */
  .nav-links a {
    font-weight: 400;
    margin-left: 25px;
    text-decoration: none;
    order: 1;
    font-family: 'Courier New', Courier, monospace;
  }

  
  /* Style the search box */
  .search-box {
    display: flex;
    min-width: 280px;
    align-items: center;
    font-weight: 300;
    order: 2;
  }
  
  .user{
    order:2;
    margin-right: -20px;
    padding: 10px;
  }

  .spacer {
    order: 2;
    flex-grow: 1; /* 让 spacer 元素占据剩余宽度 */
  }

  .message {
    padding-left: 10px;
    margin-right:7px;
    order: 2;
  }

  .dark{
    margin-left: 30px;
    padding-left: 20px;
    margin-right:-10px;
    order: 2;
    border-left: 1px solid #b4b2b251;
  }

</style>