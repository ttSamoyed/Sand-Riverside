<template>
    <div class="comment_group">
        <div class="info">
            <el-avatar class="wide-avatar" :size="xl" :src="c.author.avatar">usr</el-avatar>
            <!-- <p style="margin-left: 3px;">熊</p> -->
            <span style="margin-left: 15px;">{{ c.author.username }}</span>
            <span v-if="c.parent !== null" style="margin-left: 3px;">回复 {{c.reply_to.username}}</span> <el-text type="info" style="scale: 0.9;text-align: right;">{{ formattedTime }}</el-text>
        </div>
        <div class="comment_main">
            <!-- <el-text style="margin-left: 3px;">很有帮助，谢谢</el-text> -->
            <p>{{ c.content }}</p>
        </div>
    </div>
    
</template>

<script setup>
import { defineProps,ref } from 'vue';
import DataService from "@/components/services/DataService";
const time = ref('2023-9-20')

// const props = defineProps({
//   message: {
//     type: String,
//     required: true,
//   },
//   user_name: {
//     type: String,
//     required: true,
//   },
//   avatar: {
//     type: String,
//     required: true,
//   },
// });

const props = defineProps({
  c: Object, // 指定c属性的类型
});
const { c } = props;

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const senconds = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${senconds}`;
}

const lastModified = c.last_modified;
const formattedTime = formatTime(lastModified);

//寄，以为c.parent是父评论，不用管
// const loading = ref(true) 
// const father=ref('');

// const getinf = async () => {
//   if (c.parent) {
//     loading.value = true;  
//     let response;  
//     response = await DataService.Get_Comment_Detail(c.parent);  
//     console.log('response=',response);  
//     loading.value = false;  
//     father.value=response.data.message.author.username;
//     console.log('posts=',father.value); 
//   }
//   return '';
// };
// getinf();



</script>

<style scoped>

.comment_group {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--el-border-color);
    margin-top: 8px;
    margin-bottom: 10px;
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
    margin-left: 95px;
    text-align: start;
    font-size: 13px;
}

.wide-avatar {
    width: 40px;
  }
</style>