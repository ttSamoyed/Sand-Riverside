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
        <el-col :span="9">
          <el-form
            ref="form"
            :model="{username,email,password,confirmpassword,code}"
            :rules="rules"
            status-icon
            label-position="top"
            label-width="100px"
            max-width="800px"
          >
            <h2 class="register_title">欢迎加入<span style="color: rgb(53, 104, 235);">沙河畔</span></h2>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="username" placeholder="用户名长度为1-10，由数字、字母、汉字组成"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="email" placeholder="请填写您的邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="password"  type="password" placeholder="密码长度为1-15，由数字、字母组成"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmpassword">
              <el-input v-model="confirmpassword"  type="password" placeholder="请确认您的密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="code">
              <el-input v-model="code" placeholder="请输入验证码"></el-input>
              <el-button  style="margin-top: 10px" round plain size="large" :disabled="!disabled" @click="sendCode">发送验证码</el-button>
              <el-tag  v-if="!disabled"  type="success" style="margin-top: 10px ">{{ countdownTime }}秒后重新发送</el-tag>
            </el-form-item>
            <el-form-item >
              <el-col :span="24" style="text-align: center;">
                <el-button round plain type="info" size="large" @click="submit" >注册</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
        </el-row>
        </div>

    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import DataService from '@/components/services/DataService'
import { useStore} from 'vuex'
//import router from '@/router';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const form=ref(null)
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '用户名只能包含数字、字母、汉字', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
    { pattern:/^[a-zA-Z0-9]+$/, message:'密码只能包含数字、字母', trigger:'blur'}
  ],
  confirmpassword:[
    { required:true, message:'请再次输入密码', trigger:'blur'},
    { validator:(rule,value,callback)=>{
      if(value!==password.value){
        callback(new Error('两次输入的密码不一致'))
      }else{
        callback()
      }
    },trigger:'blur'}
  ],
  captcha: [
  { required: true, message: '请输入验证码', trigger: 'blur' },
  { min: 6, max: 6, message: '长度为6位数字', trigger: 'blur' }
  ]
}
const store=useStore()
const router = useRouter()
const password=ref('')
const username=ref('')
const email=ref('')
const confirmpassword=ref('')
const code=ref('')
const realcode=ref('')

const postData = async () => {
  try {
    const response = await DataService.Register(username.value,password.value,email.value,code.value);
    console.log(response.data);
    store.commit("Register", response.data);
    
    if (response.data.status==='success') {
        ElMessage.success('注册成功！');
       // window.location.reload();
       router.push({ path: '/login' });
    }
    if (response.data.status==='failed') {
    ElMessage.warning('验证码错误或用户名重复！')
    }
  } catch (error) {
    console.error(error);
    ElMessage.warning('注册失败！')
  }
};

const submit = () => {
  if (!username.value || !password.value || !email.value||!code.value) {
    ElMessage.warning('Please fill in all the required fields');
    return;
  }

  if (password.value !== confirmpassword.value) {
    ElMessage.warning('Password and Confirm Password do not match');
    return;
  }
//  console.log(userData);
  postData();
};


const countdown=ref(null);
const countdownTime=ref(60);
const disabled=ref(true);

const sendCode = async () => {
      if (!email.value) {
        ElMessage.warning('Please fill the email field');
        return;
      }

      // 实现发送验证码的逻辑，例如调用后端接口
      console.log('发送验证码');
      const reponse=await DataService.Get_Register_Code(email.value);
      console.log("realcode=",reponse);
      disabled.value=false;
      // 开始倒计时
      countdown.value = setInterval(() => {
        countdownTime.value--;
      //  console.log("countdowntime=",countdownTime.value);
        if (countdownTime.value <= 0) {
          clearInterval(countdown.value);
          countdown.value = null;
         // console.log("现在置零");
          countdownTime.value = 60;
          disabled.value=true;
        }
      }, 1000);
    };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
form {
    background-color: var(--el-fill-color);
    opacity: 0.9;
    padding: 20px;
    margin: 50px;
    border-radius: 10px;
    width: 500px;
    margin-top: 16vh;
}
.register_title {
  font-size: 25px;
  color: var(--el-text-color);
  font-family:  'San Francisco';
  font-weight: 450;
  text-align: center;
  margin-bottom: 15px;
}
.register {
    margin-top: 8vh;
    margin-bottom: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.register input[type=text], input[type=password] {
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 5px;
    background-color: white;
    border:rgb(214, 214, 214) solid;
    font-size: 16px;
    width: 100%;
}

input[type="submit"] {
    margin-top: 10px;
    margin-bottom: 20px;
    color: rgb(150, 150, 150);
    background-color: white;
    border-radius: 25px / 25px; /* 将按钮变为圆形 */
    width: 60px; /* 设置按钮宽度和高度相等 */
    height: 40px;
    font-size: 12px; /* 设置字体大小 */
    border: 1.5px solid rgb(190, 190, 190);
    transition: background-color 0.2s ease-in-out;
  }

  input[type="submit"]:hover{
    background-color: rgb(190, 190, 190);
    color: white;
  }

::placeholder {
    font-family:  'San Francisco';
    color: #999;
  }
.login_register{
    font-family:  'San Francisco';
    font-size: 10px;
    color: rgb(150, 150, 150);
    text-align: center;
}

</style>