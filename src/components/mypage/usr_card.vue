<template>
    <div class="usr_card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="150" :src="AvatarUrl" shape="square"/>
                </el-col>
                <el-col :span="17">
                    <div style="padding-left: 20px;">
                        <el-row>
                        <el-space wrap size="small">
                            <span class="usrname">ShpUsr</span>
                            <el-divider direction="vertical"></el-divider>
                            <el-text style="zoom:0.9; font-weight: 400;">Be Strong, be humble.</el-text>
                        </el-space>
                        </el-row>
                        <el-row>
                        <el-space wrap>
                            <el-text size="small" style="space"> 计算机科学与工程学院 </el-text>
                            <el-text size="small">  @ UESTC </el-text>
                        </el-space>
                        </el-row>
                        <el-row>
                            <el-space wrap size="1"> 
                                <el-text size="small"> 中国 </el-text>
                                <el-text size="small"> · </el-text>
                                <el-text size="small"> 四川 </el-text>
                                <el-text size="small"> · </el-text>
                                <el-text size="small"> 成都 </el-text>
                            </el-space>
                        </el-row>
                        <el-row>
                            <el-space wrap>
                                <el-text size="small" type="info">2023-9-10</el-text>
                                <el-text size="small" type="info">加入沙河畔</el-text>
                            </el-space>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div style="padding-top: 45px;"></div>
                    <el-row class="center">
                        <el-icon size="30"><UserFilled /></el-icon>
                    </el-row>
                    <el-row class="center" style="margin-top: 10px;">
                        <el-text style="width: 100%; font-size: 5px; font-weight: 300; text-align: center;">普通用户</el-text>
                    </el-row>
                </el-col>
            </el-row>
        </div>
</template>

<script setup>
import { ref } from 'vue'
const AvatarUrl = ref("https://img0.baidu.com/it/u=2050198963,701666245&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501")
</script>

<style scoped>

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
    font-weight: 500;
    font-family: PingFang SC;
}

</style>
