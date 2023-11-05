<template>
<div class="post">
    <el-row>
        <span class="title">
            {{ post.title }}
        </span>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-col :span="6">
            <img src="@/assets/login3.png" class="image"/>
        </el-col>
        <el-col :span="18">
                <el-row>
                    <el-space wrag>
                        <el-avatar :size="20" shape="square">
                            <el-icon><UserFilled /></el-icon>
                        </el-avatar>
                        <el-text type="info">{{ post.username }}</el-text>
                    </el-space>
                    
                </el-row>
                <el-row style="margin-top: 10px;width: 100%;">
                    <el-text size="large">
                      {{post.introduction}}
                    </el-text>
                </el-row>
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-button  plain >
            <el-icon size="16"><CaretTop /></el-icon>
            {{post.likes}}
        </el-button>
        <el-button  plain>
            <el-icon size="16"><Collection /></el-icon>
        </el-button>
        <span class="view_com">
            <el-space wrag>
                <el-icon><ChatRound /></el-icon>{{post.comments}}
                <el-icon style="margin-left: 10px;"><View></View></el-icon>{{ post.view }}
            </el-space>
        </span>
    </el-row>
</div>
</template>

<script setup>
import {ref} from 'vue';
const post = {
    'title':'帖子名',
    'introduction':'简介',
    'likes':1234,
    'comments':666,
    'view':999,
}
</script>

<style scoped>
.post{
    height: 220px;
    width: 800px;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.title{
    margin-top: 10px;
    font-weight: 500;
}

.image {
    width: 180px;
    height: 130px;
    border-radius: 5px;
    object-fit: cover;
    display:block;
  }

.view_com{
    margin-top: 4px;
    margin-left: 25px;
    color: #727070cd;
    font-size: 15px;
}
  
</style>
