<template>
    <div class="comment_group">
        <div class="info">
            <el-avatar :size="30" :src="props.avatar">usr</el-avatar>
            <p style="margin-left: 3px;">熊磊</p>
            <p style="margin-left: 3px;">{{ props.user_name }}</p>
            <el-text type="info" style="scale: 0.9;margin-left: 600px;">{{ time }}</el-text>
        </div>
        <div class="comment_main">
            <el-text style="margin-left: 3px;">很有帮助，谢谢</el-text>
            <p>{{ props.message }}</p>
        </div>
    </div>
    
</template>

<script setup>
import { defineProps,ref } from 'vue';
const time = ref('2023-9-20')

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

</script>

<style scoped>

.comment_group {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #e3e3e3;
    margin-top: 20px;
    margin-left: -35px !important;
}
.info {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    font-weight: 500;
    margin-left: 20px;
    padding-left: 20px;
    margin-top: 20px;
    padding-top: 1px;
    padding-bottom: 3px;
    border-left: 3px solid dodgerblue;
}
.comment_main {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: light;
    margin-top: 4px;
    margin-left: 73px;
    text-align: start;
    font-size: 13px;
}
</style>