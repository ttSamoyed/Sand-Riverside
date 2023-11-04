<template>
    <div v-loading='loading' class="usr_card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="150" :src="user.avatar" shape="square"/>
                </el-col>
                <el-col :span="17">
                    <div style="padding-left: 20px;">
                        <el-row>
                        <el-space wrap size="small">
                            <span class="usrname">{{ user.username }} 
                                <el-icon v-if="user.sex==0" style="color: var(--el-color-primary);"><Male /></el-icon>
                                <el-icon v-if="user.sex==1" style="color: rgb(253, 165, 180);"><Female /></el-icon>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <el-text type="info" class="sign">{{ user.usersign }}</el-text>
                        </el-space>
                        </el-row>
                        <el-row>
                        <el-space wrap>
                            <el-text size="small" style="space">{{ user.major }}</el-text>
                            <el-text size="small">  @ {{ user.college }} </el-text>
                        </el-space>
                        </el-row>
                        <el-row>
                            <el-space wrap size="1"> 
                                <el-text size="small"> {{ user.address }} </el-text>
                            </el-space>
                        </el-row>
                        <el-row>
                            <el-space wrap>
                                <el-text size="small" style="color: rgb(85, 159, 243);">{{ user.date_joined }}</el-text>
                                <el-text size="small" style="color: rgb(85, 159, 243);">加入沙河畔</el-text>
                            </el-space>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div style="padding-top: 45px;"></div>
                    <div v-if="user.is_superuser!=1">
                        <el-row class="center">
                            <el-icon size="30"><UserFilled /></el-icon>
                        </el-row>
                        <el-row class="center" style="margin-top: 10px;">
                            <el-text style="width: 100%; font-size: 5px; font-weight: 300; text-align: center;">普通用户</el-text>
                        </el-row>
                    </div>
                    <div v-if="user.is_superuser==1">
                        <el-row class="center">
                            <el-icon size="30"><UserFilled /></el-icon>
                        </el-row>
                        <el-row class="center" style="margin-top: 10px;">
                            <el-text style="width: 100%; font-size: 5px; font-weight: 300; text-align: center;">河畔管理员</el-text>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
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
    usersign: '此用户很懒，没有设置签名',
})
const getPersonalInfo = async () => {
    const id = state.user.userID;
    console.log('id=',id)
    if (id === null) {
        ElMessage.error('您还没有登录，请先登录！');
        return;
    }

    else {
            console.log('userinfo:',user)
            user.value = state.user;
        loading.value = false
    }
};
onMounted(getPersonalInfo)
</script>

<style scoped>

.sign{
    zoom:0.9; 
    font-weight: 600;
    background: linear-gradient(40deg, rgb(160, 70, 211), rgb(58,103,237),  rgb(85, 159, 243));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.usr_card{
    width: 900px;
    height: 150px;
    border: 1px solid #b4b2b251;
    border-radius: 5px;
}

.usrname{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 800;
    font-family: PingFang SC;
    /* background: linear-gradient(40deg, rgb(160, 70, 211), rgb(58,103,237),  rgb(85, 159, 243));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

</style>
