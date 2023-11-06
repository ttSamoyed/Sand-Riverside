<template>
    <div class="page">
        <div class="box-card" v-loading="loading">
        <el-card :body-style="{ padding: '0px' }">
            <template #header>
                <img v-if="post.coverImg" :src="post.coverImg" class="image"/>
                <img v-else src="@/assets/login3.png" class="image"/>
                <div class="card-header">
                    <div class="card-header1">
                    <div class="title">
                        <el-row class="row">
                        <h2>{{ post.title }}</h2>
                        </el-row>
                        <el-row style="margin-top: -10px;">
                            
                        <el-text>分类：</el-text>
                        <el-tag effect="plain"><el-icon><Flag /></el-icon> {{ post.plate.name }} </el-tag>
                        <el-text style="margin-left: 10px;">创建时间：</el-text>
                        <el-tag type="info" effect="plain"><el-icon><Clock /></el-icon> {{post.created}}</el-tag>
                        </el-row>
                        <el-row class="row">
                        <el-avatar v-if="post.author.avatar" :size="30" :src="post.author.avatar"></el-avatar>
                        <el-avatar v-else :size="30"><el-icon><Avatar /></el-icon></el-avatar>
                        <el-text class="author">
                             {{post.author.username}}
                        </el-text>
                        <!--编辑帖子和删除帖子-->
                        <div v-if="true">
                          <el-button
                            circle
                            text
                            style="margin-left: 15px"
                            type="primary"
                            @click="showEditBox = true"
                          >
                            <el-icon><Edit /></el-icon>
                          </el-button>
                          <el-button
                            circle
                            text
                            type="danger"
                            @click="showDeleteBox = true"
                            ><el-icon><Delete /></el-icon
                          ></el-button>
                        </div>

                        </el-row>
                    </div>
                    <div class="info">
                        <span><el-icon><ArrowUpBold /></el-icon> {{ post.like_count }}  </span>
                        <span><el-icon><ChatRound /></el-icon> {{ post.comment }} </span>
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
                <span
                  ><el-icon><ChatRound /></el-icon
                ></span>
                <span>
                  <el-button
                    v-if="isActive"
                    text
                    round
                    @click="toggleActive"
                    style="
                      background-color: rgb(90, 156, 248);
                      color: white;
                      width: 55px;
                    "
                  >
                    <el-icon style="font-size: 20px; color: white"
                      ><CaretTop
                    /></el-icon>
                    {{ post.like }}
                  </el-button>
                  <el-button
                    v-else
                    text
                    round
                    @click="toggleActive"
                    style="
                      border: 1.5px solid rgb(203, 201, 201);
                      color: rgb(165, 162, 162);
                      width: 55px;
                    "
                  >
                    <el-icon style="font-size: 20px; color: rgb(165, 162, 162)"
                      ><CaretTop
                    /></el-icon>
                    {{ post.like }}
                  </el-button>
                  <el-button
                    text
                    round
                    style="
                      border: 1.5px solid rgb(203, 201, 201);
                      color: rgb(165, 162, 162);
                      width: 55px;
                    "
                    @click="handleCommentClick"
                  >
                    评论
                  </el-button>
                </span>
              </div>
            </h3>
          </div>
        </template>
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul class="list" :infinite-scroll-disabled="disabled">
            <postComment
                :message='写得好'
                :user_name='杨波'
                :avatar='h'
              ></postComment>
              <postComment
                :message='写得好'
                :user_name='杨波'
                :avatar='h'
              ></postComment>
            <div v-for="(comment, id) in post.comments" :key="id">
              <!-- 调用评论子模块 -->
              <postComment
                :message="comment.content"
                :user_name="comment.user_name"
                :avatar="comment.avatar"
              ></postComment>
            </div>
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
          <el-button type="primary" @click="deletepost">删除</el-button>
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
import postComment from "../components/post/postComment.vue";
import writePost from "../views/writePost.vue";
import { useStore } from "vuex";

// const state = computed(() => useStore().state);
// const user_id = computed(() => state.value.user.id);
const route = useRoute();
const postId = ref(route.params.postid);

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
const loading = ref(false);
const disabled = computed(() => loading.value);
const newComment = ref("");
const commentNumber = ref(0);
const coverImgAbs = ref('');
//console.log([user_id.value, state.value]);

//评论功能
const submitComment = async () => {
  console.log(state);
  //把内容存储到后端，下面这句用于测试 逻辑写好后请删除
  console.log("已经提交评论:", newComment.value);
  const responce = await DataService.insertComment(
    user_id.value,
    postId.value,
    newComment.value
  );
  console.log(responce.data);
  loadpost();
  //请只改这上面
  //清空评论内容(防止下次点开时会有)
  newComment.value = "";
  //关闭对话框
  dialogVisible.value = false;
};
const handleChildClose = () => {
  showEditBox.value = false;
  loadpost();
};
//点赞功能
const toggleActive = () => {
  if (user_id.value === null) {
    ElMessage({
      type: "error",
      message: "您还没有登录，请先登录！",
    });
  } else {
    submitLikes();
    if (isActive.value === true) {
      //点赞数+1，请同步到后端
      isActive.value = false;
      post.value.like -= 1;
    } else {
      //点赞数-1，请同步到后端
      isActive.value = true;
      post.value.like += 1;
    }
  }
};
const submitLikes = async () => {
  const responce = await DataService.Update_Likes(
    user_id.value,
    postId.value,
    !isActive.value
  );
  console.log(responce.data);
};
const handleCommentClick = () => {
  if (user_id.value === null) {
    ElMessage({
      type: "error",
      message: "您还没有登录，请先登录！",
    });
  } else {
    dialogVisible.value = true;
  }
};

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
  }
  // commentNumber.value = post.value.comments.length;
  // isActive.value = post.value.isActive;
};

onMounted(loadpost);

// const deletepost = async () => {
//   const responce = await DataService.delete_post(postId.value, user_id.value);
//   console.log(responce.data);
//   router.push({ name: "MyPage" });
// };

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
  justify-content: space-between; /* 将子元素分别排列在容器的最左边和最右边 */
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