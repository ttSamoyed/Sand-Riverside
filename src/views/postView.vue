<template>
    <div class="page">
        <div class="box-card" v-loading="loading" element-loading-text="Loading...">
        <el-card :body-style="{ padding: '0px' }">
            <template #header>
                <img v-if="post.coverImg" :src="post.coverImg" class="image"/>
                <img v-else src="@/assets/login3.png" class="image"/>
                <div class="card-header">
                    <div class="card-header1">
                    <div class="title">
                        <el-row class="row">
                        <h2>{{ post.title }}</h2>
                        <!--编辑帖子和删除帖子-->
                        <div style="margin-left: 10px;">
                          <el-button
                            v-if="post.author.userID==myIdentity.userID"
                            circle
                            text
                            style="margin-left: 15px"
                            type="primary"
                            @click="showEditBox = true"
                          >
                            <el-icon size="20"><Edit /></el-icon>
                          </el-button>
                          <el-button
                            v-if="post.author.userID==myIdentity.userID || myIdentity.groups[1]==3"
                            circle
                            text
                            type="danger"
                            @click="showDeleteBox = true"
                            ><el-icon size="20"><Delete /></el-icon
                          ></el-button>
                        </div>
                        </el-row>
                        <el-row style="margin-top: -10px;">
                            
                        <el-text>分类：</el-text>
                        <el-tag effect="plain"><el-icon><Flag /></el-icon> {{ post.plate.name }} </el-tag>
                        <el-text style="margin-left: 10px;">创建时间：</el-text>
                        <el-tag type="info" effect="plain"><el-icon><Clock /></el-icon> {{post.created}}</el-tag>
                        <el-tag type="success"  effect="dark" style="margin-left: 15px;">精华</el-tag>
                        <!-- v-if="p.is_essence" -->
                        </el-row>
                        <el-row class="row">
                        <el-avatar v-if="post.author.avatar" :size="30" :src="post.author.avatar"></el-avatar>
                        <el-avatar v-else :size="30"><el-icon><Avatar /></el-icon></el-avatar>
                        <el-text class="author">
                             {{post.author.username}}
                        </el-text>
                        <!--编辑帖子、删除帖子和设为精华帖子-->
                        <div v-if="true">
                          <el-button v-if="showEditBox1"
                            circle
                            text
                            style="margin-left: 15px"
                            type="primary"
                            @click="showEditBox = true "
                          >
                            <el-icon><Edit /></el-icon>
                          </el-button>
                          <el-button v-if="showDeleteBox1"
                            circle
                            text
                            type="danger"
                            @click=" showDeleteBox= true "
                            ><el-icon><Delete /></el-icon
                          ></el-button>
                          <el-button v-if="setperfect1"
                            circle
                            text
                            type="success"
                            @click=" setperfect= true "
                          ><el-icon v-if="post.is_essence"><StarFilled /></el-icon 
                        ><el-icon v-if="!post.is_essence"><Star /></el-icon
                          >
                      </el-button>
                       
                        </div>

                        </el-row>
                    </div>
                    <div class="info">
                        <span><el-icon><ArrowUpBold /></el-icon> {{ post.like_count }}  </span>
                        <span><el-icon><ChatRound /></el-icon> {{ comments.length }} </span>
                        <span style="border: none;"><el-icon><View /></el-icon>  {{ post.views }} </span>
                    </div>
                    </div>
                </div>
            </template>
            <!-- 帖子内容，用v-md-editor -->
            <v-md-editor :model-value="post.content" mode="preview"></v-md-editor>

            <div style="padding: 25px">
            <el-text></el-text>
            </div>
        </el-card>
    </div>
    <!-- 评论 -->
    <div class="box-card">
      <el-card
        v-loading="loading"
        element-loading-text="Loading..."
      >
        <!-- 评论头 展示点赞、评论按钮 -->
        <template #header>
          <div class="card-header">
            <h3>
              <div class="comment">

                <!-- 评论输入框 -->
                <el-icon style="margin-right: 20px;"><ChatRound/></el-icon>
                <el-input
                  v-model="newComment"
                  autosize
                  placeholder="发表一条评论吧"
                  type="textarea"
                  style="margin-right: 25px;"
                />
                <!-- 评论按钮 -->
                <el-button :disabled="!hasInput"
                  text
                  round
                  style="
                  border: 1.5px solid rgb(203, 201, 201);
                  width: 55px;
                  margin-right: 15px;
                  "
                  @click="handleCommentClick"
                >
                <span>评论</span>
                </el-button>

                <!-- <el-button
                  v-else
                  text
                  round
                  style="
                  border: 1.5px solid rgb(230, 230, 230);
                  background-color: rgba(21, 142, 228, 0.244);
                  width: 55px;
                  margin-right: 15px;
                  "
                >
                <span style="color: white;">评论</span>
                </el-button> -->

                  <!-- 点赞按钮 -->
                  <el-button
                  v-if = "isActive==false"
                    round
                    @click="toggleActive"
                    style="
                       border: 1.5px solid rgb(203, 201, 201);
                    "
                  >
                    <el-icon style="font-size: 20px; color: "
                      ><CaretTop
                    /></el-icon>
                    <span style="color: ;">赞同 {{ post.likes }}</span>
                  </el-button>
                  
                  <el-button
                  v-else
                    round
                    @click="toggleActive"
                    style="
                      border: 1.5px solid rgb(203, 201, 201);
                      background-color: rgb(29, 132, 234);
                    "
                  >
                    <el-icon style="font-size: 20px; color: rgb(255, 255, 255)"
                      ><CaretTop
                    /></el-icon>
                    <span style="color: rgb(255, 255, 255);">已赞同 {{ post.likes }}</span>
                  </el-button>

                  
              </div>
            </h3>
          </div>
        </template>

        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul class="list" :infinite-scroll-disabled="disabled">
          <!-- 评论静态测试 -->
          <!-- <postComment
                :message='写得好'
                :user_name='杨波'
                :avatar='h'
                ></postComment>
                <postComment
                :message='写得好'
                :user_name='杨波'
                :avatar='h'
                ></postComment> -->
            <!-- 调用评论子模块 -->
            <postComment v-for="(comment,index) in comments" :key="comment.commentID" :c="comment"></postComment>
           
          </ul>
        </div>
      </el-card>
    </div>
  </div>
  


    <el-dialog v-model="dialogVisible" title="评论" width="40%">
      <el-input
        v-model="newComment"
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 10 }"
        placeholder="快来给我留言吧！"
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitComment"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  
    <el-dialog v-model="showDeleteBox" title="提示" width="350px">
      <span>您确认要删除这篇帖子吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDeleteBox = false">取消</el-button>
          <el-button type="primary" @click="handleDeleteAndNavigate" >删除</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="setperfect" title="提示" width="350px">
      <span>您要将这篇帖子设为精华贴吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setperfect = false">取消</el-button>
          <el-button type="primary" @click="handleset" >确定</el-button>
        </span>
      </template>
    </el-dialog>
  
    <el-dialog v-model="showEditBox" title="编辑帖子" width="90%">
      <writePost
        :post_id="Number(postId)"
        :user_id="user_id"
        :title="post.title"
        :description="post.description"
        :content="post.content"
        :type="post.type_name"
        :onClose="handleChildClose"
      ></writePost>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DataService from "@/components/services/DataService";
import postComment from "@/components/post/postComment.vue";
import writePost from "../views/writePost.vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core'


const router = useRouter();


const storedUser = ref(null);
const route = useRoute();
const postId = ref(route.params.postid);
const myIdentity = JSON.parse(localStorage.getItem('user'))

const post = ref({
  title:'标题',
  plate:{plateID:1,name:'水手之家'},
  tags:[],
  created:'创建时间',
  content:'内容',
  postID: 1,
  like_count: 0,
  views: 0,
  coverImg: null,
  collect_count: 0,
  is_essence: false,
  author:{userID:1,username:'',avatar:'',status:''},
})

const user = ref({
    username: '用户名',
    useravatar: 'https://img2.baidu.com/it/u=3513073338,239101075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    usersex: 1,
    userhome: '中国·四川·成都',
    usersign: '此用户很懒，还没有设置签名',
    userschool: '计算机科学与工程学院',
    userrole: 1,
    userdate: '2023-9-1',
})

const isActive = ref(false);
const dialogVisible = ref(false);
const showDeleteBox = ref(false);
const showEditBox = ref(false);
const setperfect=ref(false)
const showDeleteBox1 = ref(false);
const showEditBox1 = ref(false);
const setperfect1=ref(false)
const loading = ref(false);
const disabled = computed(() => loading.value);
const newComment = ref("");
const commentNumber = ref(0);
const coverImgAbs = ref('');
const comments = ref({});  

//console.log([user_id.value, state.value]);

// 加载博文
const loadpost = async () => {
  loading.value = true;
  const response = await DataService.Get_Blog_Detail(postId.value);
  console.log('response=', response.data);
  console.log('status=',response.data.status)
  console.log('post=', response.data.post);
  
  if (response.data.status != 'fail') {
    loading.value = false;
    post.value = response.data.post;
    let date= new Date(post.value.created);
    let readableDate = date.toLocaleString();
    console.log('time=', readableDate);
    post.value.created = readableDate;
    isActive.value = post.value.has_liked;
    const u = JSON.parse(localStorage.getItem('user'));
    showEditBox1.value=(post.value.author.userID==u.userID);
  
    //Get_Plate_Detail(plateid)
    const response2 = await DataService.Get_Plate_Detail(post.value.plate.plateID);
    console.log('response2=',  response2);
    if( response2.data.plate.moderators.length!=0)
    {
    console.log('response2=',  response2.data.plate.moderators[0].userID);
   showDeleteBox1.value=response2.data.plate.moderators[0].userID==u.userID|post.value.author.userID==u.userID|3==u.groups[1];
    }
    else
    showDeleteBox1.value=post.value.author.userID==u.userID|3==u.groups[1];

    if( response2.data.plate.moderators.length!=0)
   setperfect1.value=response2.data.plate.moderators[0].userID==u.userID|3==u.groups[1];
    else
    setperfect1.value=3==u.groups[1];

   console.log(showEditBox1.value);
   console.log(showDeleteBox1.value);


  }
};

const handleChildClose = () => {
  showEditBox.value = false;
  loadpost();
};

//加载评论
const loadcomments = async () => {
  try {  
    loading.value = true;  
    const response = await DataService.Get_Blog_Comments(postId.value);  
    console.log('response=',response);  
    loading.value = false;  
    comments.value = response.data.comments;  
    console.log('comments=',comments.value)  
  } catch (error) {        
    loading.value = false;  
    ElMessage.error('Failed to fetch data. Please try again.');  
    console.error(error);  
  }  
};

// 初始化  
onMounted(async () => {  
  loadpost();
  loadcomments();
});  

//获取用户信息
const getPersonalInfo = async () => {
  const status = localStorage.getItem('status');
  if (status) {
    loading.value = false;
    const u = JSON.parse(localStorage.getItem('user'));
    console.log('userID:', u.userID);
    const response = await DataService.Get_Personal_Info(u.userID);
    if (response.data.status === 'failed') {
      console.log('status=', response.data.status);
      ElMessage.error('登录已经失效，请重新登录！');
      router.push({ path: '/login' });
    } else {
      console.log('status=', response.data.status);
      user.value = response.data.user_info;
      console.log('userinfonew:', user.value);
      console.log('username:', user.value.username);
    }
    return u; // 返回u的值
  } else {
    ElMessage.error('您还没有登录，请先登录！');
    router.push({ path: '/login' });
    return null; // 如果未登录，返回null或其他适当的值
  }
};

//评论功能
const hasInput = computed(() => {
    return newComment.value.trim() !== '';
  });
const handleCommentClick = async () => {
  const status = localStorage.getItem('status');
  if (status) {

    const u = JSON.parse(localStorage.getItem('user'));
    console.log('userID:', u.userID);
    const response = await DataService.Comment_Blog(
    postId.value,
    newComment.value,
    );
    console.log(response.data);
    loadcomments();
    newComment.value = "";
  } else {
    ElMessage({
      type: "error",
      message: "您还没有登录，请先登录！",
    });
  }
};

//点赞功能
const submitLikes = async (blogid, isLike_ornot) => {
  if (isLike_ornot === true) {
    // 调用后端API来点赞博客
    console.log("点赞后点赞数量为："+post.value.like_count);
    const responce = await DataService.Like_Blog(blogid);
    console.log('like response=',responce)
  } else {
    // 调用后端API来取消点赞博客
    console.log("取消点赞后点赞数量为："+post.value.like_count);
    const responce = await DataService.Unlike_Blog(blogid);
    console.log('unlike response=',responce)
  }
};

const toggleActive = async () => {
  const status = localStorage.getItem('status');
  if (status) {
    if (isActive.value === true) {
      isActive.value = false;
      post.value.like_count -= 1;
      await submitLikes(postId.value, false); // 调用submitLikes函数来点赞博客
    } else {
      isActive.value = true;
      post.value.like_count += 1;
      await submitLikes(postId.value, true); // 调用submitLikes函数来取消点赞博客
    }
  } else {
    ElMessage({
      type: 'error',
      message: '您还没有登录，请先登录！',
    });
  }
};
//Delete_Blog(blogid)
const deletepost=async() => {
  const responce = await DataService.Delete_Blog(post.value.postID);
  console.log('responce=',responce);
  console.log('status=',responce.status);
    if (responce.status=== 200) {
        ElMessage.success('删除成功！');
       // window.location.reload();
    }
    if (responce.status=== 400|responce.status=== 500) {
    ElMessage.warning('删除失败！')
    }

};

const handleDeleteAndNavigate=async () => {
    try {
      // 执行删除帖子的异步操作
    
      
      // 在异步操作完成后进行路由跳转
      
      console.log("现在完成了跳转！")
      await deletepost();
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  //set perfect
const handleset=async() => {
 // const responce = await DataService.设置精华(post.value.postID);
 setperfect.value=false;
  console.log('responce=',responce);
  console.log('status=',responce.status);
  
    if (responce.status=== 200) {
        ElMessage.success('设置成功！');
        post.value.is_essence=true;
       // window.location.reload();
    }
    if (responce.status=== 400|responce.status=== 500) {
    ElMessage.warning('设置失败！')
    }

};



</script>

<style scoped>

.title{
  max-width: 80%;
}
.row{
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.page {
    display: flex;
    flex-direction: column; /* 设置为竖排 */
    justify-content:center;/* 在垂直方向上居中对齐 */
    align-items: center; /* 在水平方向上居中对齐 */
}

.box-card {
  max-width: 100%;
  width:900px;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 10px;
}
.image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display:block;
    border-radius: 3px;
  }

.card-header{
  margin-top: -10px;
  margin-bottom: 0px;
}
.card-header1{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.author {
  margin-left: 5px;
  font-size: 15px;
  color: grey;
}
.comment {
  margin-top: -10px;
  display: flex;
  align-items: center; /* 设置垂直居中对齐 */

}
.comment span {
  display: flex; /* 设置为 Flex 容器 */
  justify-content: center; /* 设置水平居中对齐 */
  align-items: center; /* 设置垂直居中对齐 */
  color: grey;
}
.info span {
  font-size: small;
  margin-right: 10px;
  margin-bottom: 5px;
  color: grey;
  /* border-bottom: 2px solid rgba(150, 149, 149, 0.478); */
}
  .infinite-list-wrapper {
    height: 300px;
    text-align: center;
  }
  .infinite-list-wrapper .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  .infinite-list-wrapper .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    color: black;
  }
  .infinite-list-wrapper .list-item + .list-item {
    margin-top: 10px;
  }


.info span i {
  margin-top: 5px;
}
.info {
  margin-top: 40px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items:end;
  min-width:50px;
}
</style>