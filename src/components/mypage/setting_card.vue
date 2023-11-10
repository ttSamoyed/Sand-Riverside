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
                    <avatar_upload :userID="user.userID"></avatar_upload>
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
            <el-divider></el-divider>

            <el-row>
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
                <el-dialog 
                  v-model="showPasswordDialog"
                  title="修改密码" 
                  width="30%"
                  :before-close="handleClose"
                  custom-class="password-dialog"
                >
                    <div class="input-section">
                        <span class="input-label">请输入旧密码：</span>
                        <el-input v-model="input_oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                    </div>
                    <div class="input-section">
                        <span class="input-label">请输入新密码：</span>
                        <el-input v-model="newPassword" type="password" placeholder="请输入新密码"></el-input>
                    </div>
                    <div class="input-section">
                        <span class="input-label">请再次输入新密码：</span>
                        <el-input v-model="confirmPassword" type="password" placeholder="请输入再次新密码"></el-input>
                    </div>
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

//获取个人信息
const getPersonalInfo = async () => {
    const status = localStorage.getItem('status');
    if (status) {
        loading.value = false;
        const u = JSON.parse(localStorage.getItem('user'));
        console.log('userID:', u.userID);
        console.log('u里面的信息为：', u);

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


//处理户籍信息
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

//修改个人信息
const mapselect=ref();
const updateInfo = async () => {
    console.log('user=',user.value)
    console.log('userID=',user.value.userID)
    const regionValue = mapselect.value.getSelectedValue().region;
    const cityValue =  mapselect.value.getSelectedValue().city;
    const provinceValue = mapselect.value.getSelectedValue().province;
    if(((regionValue!=''&cityValue!=''&provinceValue!='')|(regionValue==''&cityValue==''&provinceValue==''))&(user.value.sex=='男'|user.value.sex=='女')&user.value.college!=''&user.value.major!='')
   { 
    if(user.value.address=='--')
   { user.value.address = provinceValue + '-' + cityValue + '-' + regionValue;
   }
    const responce = await DataService.Update_Personal_Info(user.value.userID, user.value.sex, user.value.status, user.value.stuID, user.value.college, user.value.major, user.value.birth_date, user.value.address, user.value.phone)
    console.log('status=',responce.status);
    if (responce.status=== 200) {
        ElMessage.success('修改成功！');
        window.location.reload();
    }
    if (responce.status=== 400||responce.status=== 500||responce.status=== 404) {
    ElMessage.warning('修改失败！')
    }}
    else if(user.value.status!=null&&user.value.status.length>20){
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
const input_oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


const updatePassword = async() => {
    if (newPassword.value !== confirmPassword.value) {
        alert('两次输入的新密码不一致');
        return;
    }
    else{
        const response = await DataService.Update_Password(input_oldPassword.value,newPassword.value);
        console.log("返回数据为：" + JSON.stringify(response.data));
        //status : "failed"  message:"wrong password"
        if (response.data.status === "failed"){
           if(response.data.message === "wrong password"){
            alert("旧密码输入错误");
            input_oldPassword.value = "";
           }
           else{
            let messages = response.data.message; // 将字符串解析为数组
            messages = messages.replace(/'\s*,\s*'/g, '\n');
            let newStr = messages.slice(2, -2);
            alert("新密码不符合规范，可能存在下面的问题：\n" + newStr);
            newPassword.value = "";
            confirmPassword.value = "";
           }
        }
        else{
            alert('修改成功');
            input_oldPassword.value = "";
            newPassword.value = "";
            confirmPassword.value = "";
            showPasswordDialog.value = false;
        }


    }

};


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
.password-dialog .input-section {
  margin-bottom: 20px;
}

.password-dialog .input-label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.password-dialog .dialog-footer {
  display: flex;
  justify-content: flex-end;
}

</style>