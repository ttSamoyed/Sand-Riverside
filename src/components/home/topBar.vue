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
        <router-link to="/login"><el-link>登录</el-link></router-link>
      </div>
      <div class="search-box">
        <el-input
          v-model="content" 
          size="default"
          placeholder="搜一搜，发现校园新鲜事"
          :prefix-icon="Search" @blur="searchByblur"
        />
      </div>
      <div class="dark">
        <Dark></Dark>
      </div>
      <div class="message">

        <el-button text>
          <router-link to="/writePost">
            <el-icon size="large" style="margin-top:2.5px;color: var(--el-color-primary);"><Edit /></el-icon>
          </router-link>
        </el-button>
        <el-button text @click="drawer = true">
          <el-icon size="large" style="color: var(--el-color-success);"><ChatDotSquare /></el-icon>
        </el-button>
      </div>
      <div class="user" >
        <el-avatar @click="handleAvatarClick" :size="30" :icon="UserFilled" shape="square"/>
      </div>
    </div>
    <el-drawer
      v-model="drawer"
      title="消息"
      :direction="rtl"
      size="22%"
    >
    <!-- <el-text>还没有新消息，去参与互动吧 🥳</el-text> -->
    <message></message>
    <message></message>
    <message></message>
    <message></message>
  </el-drawer>
</template>

<script setup>
import Dark from './dark.vue'
import { computed, ref } from 'vue';
import { Search, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import message from '../home/message.vue'
const router = useRouter();

const state = useStore().state
// console.log(store.state)
// const state=computed(()=>useStore().state)
const isLogin = state.isLogin;
const avatar = state.user.avatar;

const content = ref('')

const drawer = ref(false)

console.log('>>>', state.isLogin);
console.log('>>>', isLogin);
console.log('>>>user', state.user);

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
    router.push({name:'post2',query:{content:content.value}})
    content.value=''
}
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
    margin-right:10px;
    order: 2;
  }

  .dark{
    margin-left: 40px;
    padding-left: 20px;
    margin-right:-10px;
    order: 2;
    border-left: 1px solid #b4b2b251;
  }

</style>