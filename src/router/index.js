import { createRouter, createWebHashHistory } from 'vue-router'
import loginView from '../views/loginView.vue'
import homeView from '../views/homeView.vue'
import hotView from '../views/hotView.vue'
import perfectView from '../views/perfectView.vue'
import postView from '../views/postView.vue'
import mypageView from '../views/mypageView.vue'
import registerView from '../views/registerView.vue'
import writePost from '../views/writePost.vue'
import searchView from '../views/searchView.vue'
import aboutusView from '../views/aboutusView.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: homeView,
    },
    {
        path: '/login',
        name: 'login',
        component: loginView,
    },
    {
        path: '/hot',
        name: 'hot',
        component: hotView,
    },
    {
        path: '/perfect',
        name: 'perfect',
        component: perfectView,
    },
    {
        path: '/post/:postid',
        name: 'post',
        component: postView,
    },
    {
        path: '/search',
        name: 'search',
        component: searchView,
    },
    {
        path: '/mypage',
        name: 'mypage',
        component:mypageView,
    },
    {
        path: '/userRegister',
        name: 'userRegister',
        component: registerView,
    },
    {
        path: '/writePost',
        name: 'writePost',
        component:writePost,
    },
    {
        path: '/aboutUS',
        name: 'aboutUS',
        component:aboutusView,
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  
  
// 路由配置...

export default router