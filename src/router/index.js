import { createRouter, createWebHashHistory } from 'vue-router'
import loginView from '../views/loginView.vue'
import homeView from '../views/homeView.vue'
import hotView from '../views/hotView.vue'
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
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  
  
// 路由配置...

export default router