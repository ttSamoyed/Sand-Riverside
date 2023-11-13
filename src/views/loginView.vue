<template>
    <div style="height: 100%;
        background-image: url('src/assets/poster.png');
        height: 93%;
        width: 100%;
        background-size:cover;
        top: 0;
        left: 0;
        position: absolute;
        margin-top: 66px;
        ">
    <div style="
            position: absolute;
            background-color: #4f505478;
            height:100%;
            width: 100%;
        ">
        <el-row style="align-items: center; justify-content: center; height:100% width:100%;">
        <el-col :span="15" >
        
        </el-col>
        <el-col :span="9">
            <el-form
            v-loading='loading'
                element-loading-text="Loading..."
                label-position="top"
                label-width="80px"
                element-loading-background="rgba(122, 122, 122, 0.1)"
                style="width: 330px !important; margin-top: 23vh;"
            >
                <h2 class="login_title">账号登录</h2>
                <el-form-item>
                    <el-input v-model="username" placeholder="请输入个人账号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-col :span="24" style="text-align: center;margin-top: 10px;">
                    <el-button circle plain type="info" @click="submit" size="large">→</el-button>
                    </el-col>
                </el-form-item>
            <div class="login_register">
                <el-space>
                    <p>还没有沙河畔账号？</p>
                    <router-link to="/userRegister" style="color:rgb(47,110,195);">注册一个</router-link>
                </el-space>
                </div>
            </el-form>
        </el-col>
        </el-row>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import DataService from '@/components/services/DataService'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store=useStore()
const password = ref('')
const username = ref('')
const loading = ref(false)

const submit = async () => {
    loading.value = true;
    const response = await DataService.Login(username.value, password.value)
    console.log(response.data)

    if (response.data.status === 'failed') {
    loading.value = false;
    ElNotification({
    title: '登录失败',
    message: '用户名或密码错误 若您确认密码 您有可能已被封号 请联系管理员',
    })
    } else {
    loading.value = false;
        store.commit("setUser", response.data.user_info)
        store.commit("setToken", response.data.access_token, response.data.fresh_token)
    console.log(response.data.user_info)

    localStorage.setItem('user', JSON.stringify(response.data.user_info))
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('refresh_token', response.data.refresh_token)
        localStorage.setItem('status', true);   
        router.push({ path: '/mypage' })
        setTimeout(() => {
            window.location.reload();
        }, 1);
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
form {
    opacity: 1;
    padding: 20px;
    margin: 50px;
    margin-top: 150px;
    border-radius: 5px;
    width: 400px !important;
    background-color: var(--el-fill-color);
    opacity: 0.9;
    /* background-color: rgba(15, 15, 16, 0.773); */
}

.login_title {
    opacity: 1;
    font-size: 20px;
    font-family:  'San Francisco';
    font-weight: 450;
    text-align: center;
    margin-bottom: 30px;
    color: var(--el-text-color)
}

input[type="submit"] {
    opacity: 1;
    margin-top: 10px;
    margin-bottom: 20px;
    color: var(--el-text-color);
    border-radius: 50%; /* 将按钮变为圆形 */
    width: 40px; /* 设置按钮宽度和高度相等 */
    height: 40px;
    font-size: 12px; /* 设置字体大小 */
    border: 1.5px solid rgb(190, 190, 190);
    transition: background-color 0.5s ease-in-out;
}
input[type="submit"]:hover{
  opacity: 0.8;
  background-color: rgb(61, 59, 59);
}

::placeholder {
    opacity: 1;
    font-family:  'San Francisco';
    color: var(--el-text-color);
  }
.login_register{
    opacity: 1;
    font-family:  'San Francisco';
    font-size: 10px;
    color: rgb(150, 150, 150);
    text-align: center;
    margin-top: 10px;
}


</style>