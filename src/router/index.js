import { createRouter, createWebHashHistory } from 'vue-router'
import loginView from '../views/loginView.vue'
import homeView from '../views/homeView.vue'
import hotView from '../views/hotView.vue'
import perfectView from '../views/perfectView.vue'
import postView from '../views/postView.vue'
import mypageView from '../views/mypageView.vue'
import registerView from '../views/registerView.vue'
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
        path: '/post',
        name: 'post',
        component: postView,
    },
    {
        path: '/mypage',
        name: 'mypage',
        component:mypageView,
    },
    {
        path: '/userRegister',
        name: 'userRegister',
        component: registerView
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  
  
// 路由配置...

export default router