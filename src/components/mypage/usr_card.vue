<template>
    <div v-loading='loading' class="usr_card" element-loading-text="Loading...">
            <el-row>
                <el-col :span="4">
                    <el-tooltip content="点击更换头像" placement="top">
                        <el-upload
                        class="avatar_uploader"
                        :action="url"
                        :data="ImageData"
                        :show-file-list="false" 
                        :headers="headers"
                        method="post"
                        :auto-upload="true"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        name="avatar"
                        >
                        <el-avatar v-if="user.avatar" :size="150" :src="user.avatar" shape="square"/>
                        <el-avatar v-else :size="150" shape="square"><el-icon :size="130"><Avatar /></el-icon></el-avatar>
                        </el-upload>
                    </el-tooltip>
                </el-col>
                <el-col :span="16">
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
                <el-col :span="4">
                    <div style="padding-top: 45px;"></div>
                    <div v-if="user.groups">
                        <div v-if="user.groups.length==1 && user.groups[0]==1">
                            <el-row class="center">
                                <el-icon size="30"><UserFilled /></el-icon>
                            </el-row>
                            <el-row class="center" style="margin-top: 10px;">
                                <el-text style="width: 100%; font-weight: 500; text-align: center;">普通用户</el-text>
                            </el-row>
                        </div>
                        <div v-if="user.groups.length==2 && user.groups[1]==2">
                            <el-row class="center">
                                <el-icon size="30"><Guide /></el-icon>
                            </el-row>
                            <el-row class="center" style="margin-top: 10px;">
                                <el-text style="width: 100%; font-weight: 500; text-align: center;">版主</el-text>
                            </el-row>
                        </div>
                        <div v-if="user.groups.length==2 && user.groups[1]==3">
                            <el-row class="center">
                                <el-icon size="30"><HelpFilled /></el-icon>
                            </el-row>
                            <el-row class="center" style="margin-top: 10px;">
                                <el-text style="width: 100%; font-weight: 500; text-align: center;">河畔管理员</el-text>
                        </el-row>
                    </div>
                    </div>
                </el-col>
            </el-row>
        </div>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue'
import { ElMessage } from 'element-plus'
import DataService from '../services/DataService';
import { useRouter } from 'vue-router';
const loading = ref(true)
const router = useRouter()
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
const headers = computed(() => {
    const accessToken = localStorage.getItem('access_token');
    return {
          Authorization: `Bearer ${accessToken}`,
    };
  });
const url = computed(() => {
    return "http://124.222.42.111:8000/api/user/avatar/" + user.value.userID + '/'
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
            user.value.date_joined=response.data.user_info.date_joined.slice(0,10);
            localStorage.setItem('user', JSON.stringify(response.data.user_info))
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

const ImageData = ref()
 
 
// 上传之前
const beforeAvatarUpload = async (rawFile) => {
  if (rawFile.type !== "image/jpeg"&&rawFile.type !== "image/png"&&rawFile.type !== "image/jpg") {
    ElMessage({
      showClose:true,
      message:'图片只能是JPG或PNG格式！',
      type:'warning'
    });
    return;
  }
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage({
      showClose:true,
      message:'图片大小不能超过5MB！',
      type:'warning'
    });
    return;
  }
  ImageData.value = new FormData();
  // 'avatar'是修改后的字段名
    ImageData.value.append('avatar', rawFile);
    console.log('ImageData=',ImageData.value)
    // const response = await DataService.Update_User_Avatar(user.value.userID,rawFile)
};
 
// 上传成功回调
const handleAvatarSuccess = async (res, uploadFile) => {
    user.value.avatar = URL.createObjectURL(uploadFile.raw);
    console.log(user.value.avatar);
};


onMounted(getPersonalInfo);
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
