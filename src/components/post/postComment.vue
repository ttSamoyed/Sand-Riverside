<template>
    <div class="comment_group">
        <div class="info">
            <div style="
            display: flex;
            align-items: center;">
            <el-avatar class="wide-avatar" :src="c.author.avatar">usr</el-avatar>
            <span style="margin-left: 15px;">{{ c.author.username }}</span>
            <span v-if="c.parent !== null" style="margin-left: 3px;">回复 {{c.reply_to.username}}</span> <el-text type="info" style="scale: 0.9;text-align: right;">{{ formattedTime }}</el-text>
            </div>
            <div class="icon_buttons">
                <el-button type="text" class="icon-button" @click = "showReplyBox = showReplyBox?false:true;ph()"><el-icon  size="25"><ChatLineRound /></el-icon><span>{{ c.reply_count }}</span></el-button>
                <el-button type="text" class="icon-button" @click = "Like_Comment">                          <el-icon  size="28"><Top /></el-icon>{{ c.like_count }}</el-button>
                <el-button v-if = "can_delete" type="text" style="margin-left: 15px;"><el-icon  size="23"><Delete /></el-icon></el-button>
            </div>
        </div>

        <div class="comment_main">
            <!-- <el-text style="margin-left: 3px;">很有帮助，谢谢</el-text> -->
            <p>{{ c.content }}</p>
        </div>

        <div v-if="showReplyBox" class="replybox">
            <el-input v-model="input_reply" :placeholder="ph" style="margin-right: 10px;"/>
            <el-button :disabled="!hasInput" type = "primary" round @click="Reply_Comment">提交回复</el-button>
        </div>
      
    </div>
    
</template>

<script setup>
import { defineProps,onMounted,ref,computed } from 'vue';
import DataService from "@/components/services/DataService";
const time = ref('2023-9-20');



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
//时间
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

//回复评论
const can_delete = ref(true);
const input_reply = ref('');
const showReplyBox = ref(false);

const ph = computed(() => {
  const ans = "回复 " + c.author.username
  return ans;
});

const hasInput = computed(() => {
  const x = input_reply.value.trim() !== '';
  return x;
});

const Reply_Comment = async() => {
    const status = localStorage.getItem('status');
    if (status) {
      const response = await DataService.Comment_Blog(
      c.post,
      input_reply.value,
      c.commentID
    );
      console.log("回复成功"+response.data);
      input_reply.value = "";
    }else{
      ElMessage({
        type: "error",
        message: "您还没有登录，请先登录！",
      });
    }
};


// const handleCommentClick = async () => {
//   const status = localStorage.getItem('status');
//   if (status) {

//     const u = JSON.parse(localStorage.getItem('user'));
//     console.log('userID:', u.userID);
//     const response = await DataService.Comment_Blog(
//     postId.value,
//     newComment.value,
//     );
//     console.log(response.data);
//     loadcomments();
//     newComment.value = "";
//   } else {
//     ElMessage({
//       type: "error",
//       message: "您还没有登录，请先登录！",
//     });
//   }
// };

//点赞评论
const Like_Comment = () => {
    console.log('点赞评论');
}
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
    justify-content: space-between;
    font-weight: 500;
    margin-left: 20px;
    padding-left: 20px;
    margin-top: 20px;
    padding-top: 1px;
    padding-bottom: 3px;
    border-left: 3px solid dodgerblue;
}
.icon_buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
}
.info_title{
    margin-left: 3px;
}
.comment_main {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: light;
    margin-top: 4px;
    margin-left: 95px;
    text-align: start;
    font-size: 13px;
}
.replybox {
  max-width: 710px;
  min-height: 70px;
  margin-left: 85px;
  border: 1px solid #dfdfdf;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}


.wide-avatar {
    width: 40px;
  }
</style>