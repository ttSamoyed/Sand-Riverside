<template>
    <div class="comment_group">
        <div class="info">
            <div style="
            display: flex;
            align-items: center;">
            <div style="margin-left: 40px;" v-if="c.parent!= null"></div>
            <el-avatar class="wide-avatar" :src="c.author.avatar">usr</el-avatar>
            <span style="margin-left: 15px;">{{ c.author.username }}</span>
            <span v-if="c.parent !== null" style="margin-left: 3px;">回复 {{c.reply_to.username}}</span> <el-text type="info" style="scale: 0.9;text-align: right;">{{ formattedTime }}</el-text>
            </div>
            <div class="icon_buttons">

                <el-button type="text" class="icon-button" @click = "showReplyBox = showReplyBox?false:true;ph()"><el-icon  size="20"><ChatLineRound /></el-icon>
                  <span v-if = "show_reply_number" style="font-size: large;">{{ c.reply_count }}</span>
                </el-button>

                <el-button v-if = "!has_liked" type="text" class="icon-button"  @click = "Clikc_Like_Comment"><el-icon  size="23"><ArrowUpBold /></el-icon>
                  <span style="font-size: large;">{{ c.like_count }}</span>
                </el-button>
                <el-button v-else type="text" class="icon-button"  @click = "Clikc_Like_Comment"><el-icon  size="23"><CaretTop/></el-icon>
                  <span style="font-size: large;">{{ c.like_count }}</span>
                </el-button>
                
                <el-button v-if = "Show_delete_Icon" type="text" style="margin-left: 15px;" @click = "Show_delete_Box = true"><el-icon  size="20"><Delete /></el-icon></el-button>
                
            </div>
        </div>

        <div class="comment_main">
            <p v-if="c.parent!=null" style="margin-left: 40px;">{{ c.content }}</p>
            <p v-else>{{ c.content }}</p>
        </div>

        <div v-if="showReplyBox" class="replybox">
            <el-input v-model="input_reply" :placeholder="ph" style="margin-right: 10px;"/>
            <el-button :disabled="!hasInput" type = "primary" round @click="Reply_Comment">提交回复</el-button>
        </div>
      
    </div>

    <el-dialog v-model="Show_delete_Box" title="提示" width="350px">
      <span>您确认要删除此条评论吗？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="Show_delete_Box = false">取消</el-button>
        <el-button type="primary" @click="Delete_Comment" >删除</el-button>
      </span>
  </template>
</el-dialog>
    
</template>



<script setup>
import { defineProps,onMounted,ref,computed } from 'vue';
import DataService from "@/components/services/DataService";
import { async } from '@kangc/v-md-editor';
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
  id1: Number, // ID1 = post.value.author.userID;
  id2: Number, // ID2 = response2.data.plate.moderators[0].userID;
});
const { c, id1, id2 } = props;

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
const input_reply = ref('');
const showReplyBox = ref(false);
const show_reply_number = ref(false);
if (c.parent === null){
  show_reply_number.value = true;
}

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



//点赞评论
const has_liked = ref(false);
has_liked.value = c.has_liked;


const Clikc_Like_Comment = async() => {
  const status = localStorage.getItem('status');
  if (status) {
    if(has_liked.value){
    has_liked.value = false;
    c.like_count -= 1;
    const response = await DataService.Unlike_Comment(c.commentID);
    console.log("取消点赞返回状态：" + response.status);
    }
    else{
    has_liked.value = true;
    c.like_count += 1;
    const response = await DataService.Like_Comment(c.commentID);
    console.log("点赞返回状态：" + response.status);
    }
    }else{
      ElMessage({
        type: "error",
        message: "您还没有登录，请先登录！",
      });
    }

  

}

//删除评论，博客作者，评论作者，管理员可以删
const Show_delete_Icon = ref(false);
const Show_delete_Box = ref(false);


const s = localStorage.getItem('status');
if (s) {
  const u = JSON.parse(localStorage.getItem('user'));
  if(u.userID === c.author.userID || 3===u.groups[1] || u.userID === id1 || u.userID === id2)
    Show_delete_Icon.value = true;
  }else{
    ElMessage({
      type: "error",
      message: "您还没有登录，请先登录！",
    });
  }


const Delete_Comment = async() => {
  console.log("删除评论");
  const response = await DataService.Delete_Comment(c.commentID);
  console.log("删除ID为"+c.commentID+"的评论："+response.status);
  Show_delete_Box.value = false;
}

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
    margin-top: -10px;
    margin-left: 97px;
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