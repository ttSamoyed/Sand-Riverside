<template>
    <div class="center">
        <div class="info" v-loading="loading" element-loading-text="Loading...">
            <el-row class="center">
                <div class="title">
                    个人信息
                </div>
            </el-row>
            <el-row>
                <el-col span="8">
                    <el-text> 用户名 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 30px;">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-col>
                <el-col span="8" style="margin-left: 100px;">
                    <el-text> 性别 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 30px;">
                    <el-input v-model="user.sex" placeholder="请输入性别"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
                <el-col span="8">
                    <el-text> 头像 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 80px;">
                    <avatar_upload :userid="user.userID"></avatar_upload>
                </el-col>
            <el-divider></el-divider>
            <el-row>
                <el-col span="8">
                    <el-text> 学院 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 45px;">
                    <el-input v-model="user.major" placeholder="请选择学院"></el-input>
                </el-col>
                <el-col span="8" style="margin-left: 100px;">
                    <el-text> 学校 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 30px;">
                    <el-input v-model="user.college" placeholder="请输入学校"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <map_select style="margin-left: -36px;"></map_select>

            <el-divider></el-divider><el-row>
                <el-col span="8">
                    <el-text> 签名 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 45px;">
                    <el-input v-model="user.status" style="width: 500px;" placeholder="请输入签名"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <div class="center">
                    <el-space wrap>
                        <el-button type="primary" plain round @click="updateInfo()">修改信息</el-button>
                        <el-button plain round>修改密码</el-button>
                    </el-space>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import map_select from '../mypage/map_select.vue'
import DataService from '@/components/services/DataService'
import avatar_upload from './avatar_upload.vue';
const state = useStore().state
const loading = ref(true)
const user = ref({
    address: null,
    avatar: null,
    birth_date: null,
    college: null,
    date_joined: null,
    email: null,
    groups: null,
    is_active: null,
    is_superuser: false,
    last_login: null,
    major: null,
    phone: null,
    sex: null,
    status: null,
    stuID: null,
    userID: null,
    username: null,
})

const getPersonalInfo = async () => {
    const status = localStorage.getItem('status');
    if (status) {
        loading.value = false;
        const u = JSON.parse(localStorage.getItem('user'));
        console.log('userID:', u.userID)
        const response = await DataService.Get_Personal_Info(u.userID);
        if (response.data.status === 'failed') {
            console.log('status=',response.data.status)
            ElMessage.error('登录已经失效，请重新登录！');
            router.push({path:'/login'})
        }
        else {
            console.log('status=',response.data.status)
            user.value = response.data.user_info;
            console.log('userinfonew:', user.value)
            console.log('username:',user.value.username)
        }
        return;
    }
    else {
        ElMessage.error('您还没有登录，请先登录！');
        router.push({path:'/login'})
    }
};

const updateInfo = async () => {
    console.log('user=',user.value)
    console.log('userid=',user.value.userID)
    const responce = await DataService.Update_Personal_Info(user.value.userID, user.value.sex, user.value.status, user.value.stuID, user.value.college, user.value.major, user.value.birth_date, user.value.address, user.value.phone)
    console.log(responce);
    if (responce.status === 'success') {
        ElMessage.success('修改成功！')
    }
    ElMessage.warning('修改失败！')
}

onMounted(getPersonalInfo)

</script>

<style scoped>

.title{
    margin-bottom: 20px;
  font-weight:700;
  background: linear-gradient(40deg, rgb(58,103,237), rgb(118,168,225));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.info{
    margin-top: 20px;
    width: 700px;
}

</style>