<template>
    <div class="center">
        <div class="info">
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
                    <el-input v-model="name" placeholder="请输入用户名"></el-input>
                </el-col>
                <el-col span="8" style="margin-left: 100px;">
                    <el-text> 性别 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 30px;">
                    <el-input v-model="sex" placeholder="请输入性别"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col span="8">
                    <el-text> 学院 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 45px;">
                    <el-input v-model="school" placeholder="请选择学院"></el-input>
                </el-col>
                <el-col span="8" style="margin-left: 100px;">
                    <el-text> 学校 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 30px;">
                    <el-input v-model="university" placeholder="请输入学校"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <map_select style="margin-left: -36px;"></map_select>
            <el-divider></el-divider><el-row>
                <el-col span="8">
                    <el-text> 签名 </el-text>
                </el-col>
                <el-col span="16" style="margin-left: 45px;">
                    <el-input v-model="sign" style="width: 500px;" placeholder="请输入签名"></el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <div class="center">
                    <el-space wrap>
                        <el-button type="primary" plain round>修改信息</el-button>
                        <el-button plain round>修改密码</el-button>
                    </el-space>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import map_select from '../mypage/map_select.vue'
const name = ref('ShpUsr');
const school = ref('计算机科学与工程学院');
const sex = ref('男')
const university = ref('UESTC')
const sign = ref('Be Strong, be humble.')

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