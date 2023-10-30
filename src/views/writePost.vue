<template>
  <div class="post-editor">
    <el-form ref="form" :model="post" label-width="40px">
      <el-form-item label="标题">
        <el-input
          :rows="1"
          type="textarea"
          placeholder="请输入标题"
          v-model="post.title"
        ></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-input
          :rows="1"
          type="textarea"
          placeholder="请输入帖子封面照片的url"
          v-model="post.cover"
        ></el-input>
      </el-form-item>

      <el-form-item label="版块">
        <el-radio-group v-model="post.type" size="default">
          <el-radio-button label="成电校园" />
          <el-radio-button label="生活信息" />
          <el-radio-button label="情感专区" />
          <el-radio-button label="未来可期" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="内容">
        <v-md-editor
          ref="editor"
          v-model="post.content"
          height="450px"
        ></v-md-editor>
      </el-form-item>

      <el-form-item style="margin-left: 44%">
        <el-button type="primary" round @click="submitpost">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script setup>
// import DataService from "@/components/services/DataService";
import { ref } from "vue";
import { defineProps } from "vue";
const params = defineProps({
  post_id: {
    type: Number,
    default: -1,
  },
  user_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "成电校园",
  },
  onClose: Function,
});
const post = ref({
  title: params.title,
  cover: params.cover,
  content: params.content,
  type: params.type,
});
const submitpost = async () => {
  console.log(post.value);
  await submit();
  console.log("submit ok");
  // if (params.post_id === -1) {
  //   router.push({path:'/post',query:{content:''}})
  // }else{
  //   router.push({name:'postPresent',params: {postId:params.post_id}})
  // }
  params.onClose();
  // 将博客内容转换为Markdown格式存储
  // 提交博客数据到后台
  // ...
};
const submit = async () => {
  if (params.post_id === -1) {
    const responce = await DataService.insertpost(
      params.user_id,
      post.value.type,
      post.value.cover,
      post.value.title,
      post.value.content
    );
    console.log(responce.data);
  } else {
    if (post.value.content !== params.content) {
      const responce = await DataService.Update_post_Content(
        params.post_id,
        params.user_id,
        post.value.content
      );
      console.log(responce.data);
    }
    if (post.value.title !== params.title) {
      const responce = await DataService.Update_post_Title(
        params.post_id,
        params.user_id,
        post.value.title
      );
      console.log(responce.data);
    }
    if (post.value.cover !== params.cover) {
      const responce = await DataService.Update_post_cover(
        params.post_id,
        params.user_id,
        post.value.cover
      );
      console.log(responce.data);
    }
    if (post.value.type !== params.type) {
      const responce = await DataService.Update_post_Type(
        params.post_id,
        params.user_id,
        post.value.type
      );
      console.log(responce.data);
    }
  }
};
</script>

  
<style scoped>
.post-editor {
  width: 80%;
  height: 90%;
  margin: 0 auto;
}
.el-form {
  width: 100%;
  height: 100%;
  margin-left: 0px;
  margin-top: 0px;
  border-color: #e6e6e6;
}
</style>
  