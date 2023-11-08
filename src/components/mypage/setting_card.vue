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
                <!-- <el-col span="8">
                    <el-text> 头像 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 80px;">
                    <avatar_upload :userid="user.userID"></avatar_upload>
                </el-col> -->
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

            <map_select :p="province" :c="city" :r="district" ref="mapselect" style="margin-left: -36px;"></map_select>
            <!-- 为啥这里改为map_select就不显示了 -->
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
                <div>
                <el-button type="primary" plain round @click="updateInfo">修改信息</el-button>
                <el-button type="primary" plain round @click="showPasswordDialog = true " >修改密码</el-button>
                <el-dialog title="修改密码" width="30%" v-if="true">
                <span>请输入旧密码：</span>
                <el-input v-model="oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                <br>
                <span>请输入新密码：</span>
                <el-input v-model="newPassword" type="password" placeholder="请输入新密码"></el-input>
                <br>
                <span slot="footer" class="dialog-footer">
                <el-button @click="showPasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="updatePassword">修改</el-button>
                </span>
                </el-dialog>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue'
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
const address = ref('北京市-北京市-朝阳区')

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
            address.value=response.data.user_info.address;
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



const areas = computed(() => {
  return (address.value || '').split('-') // 使用 split 方法分割字符串，并提供一个空字符串作为默认值
})

const province = computed(() => {
  return areas.value[0] // 获取省份名称
})

const city = computed(() => {
  return areas.value[1] // 获取城市名称
})

const district = computed(() => {
  return areas.value[2] // 获取区县名称
})

const mapselect=ref();

const updateInfo = async () => {
    console.log('user=',user.value)
    console.log('userid=',user.value.userID)
    const regionValue = mapselect.value.getSelectedValue().region;
    const cityValue =  mapselect.value.getSelectedValue().city;
    const provinceValue = mapselect.value.getSelectedValue().province;
    if(regionValue!=''&cityValue!=''&provinceValue!=''&(user.value.sex!='男'|user.value.sex!='女')&user.value.college!=''&user.value.major!='')
   { user.value.address = provinceValue + '-' + cityValue + '-' + regionValue;
    user.value.address=provinceValue+'-'+cityValue+'-'+regionValue;
    const responce = await DataService.Update_Personal_Info(user.value.userID, user.value.sex, user.value.status, user.value.stuID, user.value.college, user.value.major, user.value.birth_date, user.value.address, user.value.phone)
    console.log('status=',responce.status);
    if (responce.status=== 200) {
        ElMessage.success('修改成功！');
        window.location.reload();
    }
    if (responce.status=== 400|responce.status=== 500) {
    ElMessage.warning('修改失败！')
    }}
    else if(user.value.status.length>20){
        ElMessage.warning('签名太长了，重新试试吧！')
    }
    else{
        ElMessage.warning('请修改后填写正确、完整的信息！')
    }
    // //原来的
    // if (responce.status=== 200) {
    //     ElMessage.success('修改成功！')
    // }
    // else  {
    // ElMessage.warning('修改失败！')
    // }
}

const showPasswordDialog = ref(false);

const    oldPassword=ref('') 
const    newPassword=ref('') 
// console.log("dialog=",showPasswordDialog.value);
//     const oldPassword = ref('');
//     const newPassword = ref('');
//     const confirmPassword = ref('');

//     const update = () => {
//       // 更新信息的代码
//     };

//     const updatePassword = () => {
//       if (newPassword.value !== confirmPassword.value) {
//         alert('两次输入的新密码不一致');
//         return;
//       }
//       if (oldPassword.value === '正确的旧密码') { // 这里需要替换为实际的验证旧密码的逻辑
//         alert('修改成功');
//         showPasswordDialog.value = false;
//       } else {
//         alert('旧密码错误');
//       }
//     };


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
.center {
    display: flex;
    justify-content: center;
    align-items: center;

}


.info{
    margin-top: 20px;
    width: 700px;
}

</style>