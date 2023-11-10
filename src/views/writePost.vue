<template>
  <div class="post-editor">
    <el-form ref="form" :model="post" label-width="40px">
      <el-form-item>
        <el-text>标题{{ params.user_id }}</el-text>
        <el-input
          :rows="1"
          type="textarea"
          placeholder="请输入标题"
          style="width: 400px;margin-left: 18px;font-size: 15px; line-height: 24px;"
          v-model="post.title"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-text>封面</el-text>
        <el-divider direction="vertical"></el-divider>
        <!-- action="#" -->
        <!-- <el-button type="primary" >点击上传</el-button> -->
        <!-- <input   
        type="file"  enctype="multipart/form-data" style="display:none;" accept="image/jpeg,image/png" @change="uploadFile2">

        > -->
        <input type="file" ref="loadfile" enctype="multipart/form-data" style="display:block;" accept="image/png, image/jpeg"
        @change="uploadFile">

          <el-icon><Plus /></el-icon>
          <template #file="{ file }" >
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              jpg files with a size less than 500kb
            </div>
          </template>
      
        <el-dialog v-model="dialogVisible">
          <el-text>预览图片</el-text>
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width: 100%;"/>
        </el-dialog>

        <!-- <el-input
          :rows="1"
          type="textarea"
          placeholder="请输入帖子封面照片的url"
          v-model="post.cover"
        ></el-input> -->

      </el-form-item>

      <el-form-item>
        <el-text>板块</el-text>
        <el-divider direction="vertical"></el-divider>
        <el-select v-model="post.plate" placeholder="请选择板块" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-text>内容</el-text>
        <v-md-editor
          ref="editor"
          v-model="post.content"
          height="450px"
        ></v-md-editor>
      </el-form-item>

      <el-form-item style="margin-left: 44%">
        <el-button type="primary" round @click="submitpost ">发布</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts" setup>

import DataService from '@/components/services/DataService';  
import { ref,computed } from "vue";
import { defineProps } from "vue";
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import type { UploadProps } from 'element-plus'

import type { UploadFile, UploadUserFile } from 'element-plus'
let fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const disabled2 = ref(true)
const uploadRef = ref()
const loadfile = ref(null);

const router = useRouter();

const fileInput = ref<HTMLInputElement>()
const uploadFile = () =>{
	// 当点击button按钮后会触发此事件
	// 作用就是打开文件上传弹框
  //fileInput.value?.click()

      // 创建一个新的 FormData 对象
      const formData = new FormData();
  // 将上传的文件附加到 FormData 对象中，使用 'avatar' 作为字段名
  formData.append('coverImg', loadfile.value.files[0]);
 // formData.append( 'type', "file");
  // 将 FormData 对象赋值给 ImageData
  ImageData.value = formData;
  console.log("loaffile=",ImageData.value);
  if (ImageData.value.has('coverImg')) {
  console.log('FormData 不为空');
} else {
  console.log('FormData 为空');
}
   }

const handleRemove = (file: UploadFile) => {
 // console.log(file);

  uploadRef.value.clearFiles()
  fileList.value = []
  disabled2.value = true;
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
 
}

const handleUpload = (response, rawFile, file:UploadFile) => {
    // 将 disabled2 置为 false
    console.log(file)
    disabled2.value = false;
  };
 

const headers = computed(() => {
    const accessToken = localStorage.getItem('access_token');
    return {
          Authorization: `Bearer ${accessToken}`,
    };
  });

  const ImageData = ref()
 
 
// 上传之前
const beforeAvatarUpload = async (rawFile) => {
  if (rawFile.type !== "image/jpeg"&&rawFile.type !== "image/png"&&rawFile.type !== "image/jpg") {
    ElMessage({
      showClose:true,
      message:'图片只能是JPG或PNG格式！',
      type:'warning'
    });
    return;
  }
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage({
      showClose:true,
      message:'图片大小不能超过5MB！',
      type:'warning'
    });
    return;
  }

};

let file;
// 上传成功回调
const handleAvatarSuccess = async (response,rawFile) => {
     // 上传成功后的处理逻辑
      // 可以从 response 中获取上传成功后的图片 URL 地址
     //if (response.status === 200) 
      
        // 上传成功，response.data.url 中包含了图片的URL地址
        post.value.cover  = response.post.coverImg;
        // 对获取的图片URL地址做进一步处理，比如显示到界面上
        console.log(response)
        console.log("cover.url=",post.value.cover)

      //  console.log(file.type)

        
  console.log("cover.url=",post.value.cover)

 if (post.value.cover.endsWith('.jpg')) {
  fetch(post.value.cover)
  .then(response => response.blob())
  .then(blob => {
    file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    // 现在 file 就是一个 File 对象，可以用于上传或其他操作
    console.log("file",file);
  });
  console.log('URL ends with .jpg');
} else {
  console.log('URL does not end with .jpg');
}
    
    // const response = await DataService.Update_User_Avatar(user.value.userID,rawFile)

// 在这里可以使用 file 变量
       
};





const options = [
  {
    value: "1",
    label: '成电校园：水手之家',
  },
  {
    value: 2,
    label: '成电校园：校园热点',
  },
  {
    value: 3,
    label: '成电校园：校园活动',
  },
  {
    value: 4,
    label: '生活信息：失物招领',
  },
  {
    value: 5,
    label: '生活信息：二手买卖',
  },
  {
    value: 6,
    label: '情感专区：鹊桥',
  },
  {
    value: 7,
    label: '情感专区：话心',
  },
  {
    value: 8,
    label: '未来可期：就业创业',
  },
  {
    value: 9,
    label: '未来可期：出国留学',
  },
  {
    value: 10,
    label: '未来可期：保研考研',
  },
]


const params = defineProps({
  post_id: {
    type: Number,
    default: 16,
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
    type:String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  plate: {
    type: String,
    default: "1",
  },
  onClose: Function,
});
const post = ref({
  post_id:params.post_id,
  title: params.title,
  cover: params.cover,
  content: params.content,
  plate: params.plate,
});
const submitpost = async (res, uploadFile) => {


  
  console.log("post=",post.value);
  console.log("uploadfile=",uploadFile);
  if(ImageData.value)
  console.log("Imagedata=",ImageData.value);
  
  if(post.value.title==''||post.value.content==''){
    ElMessage.warning('请输入标题和内容！')
  }
  else
  {
    if (params.post_id === 16) {
    const responce = await DataService.Publish_Blog(
      post.value.title,
      post.value.content,
      post.value.plate
    );

    post.value.post_id=responce.data.post.postID;

    console.log("发布返回：",responce.data);
    if( ImageData.value )
    {    
      console.log("这里更新封面",file);
        const responce2 = await DataService.Upload_Blog_Cover(
        post.value.post_id,
        ImageData.value,
      );
      console.log("封面：",responce2.data);
    }
      
    ElMessage.success('发布成功！');
    console.log("postid=",post.value.post_id);
    router.push({ name: 'post', params: { postid: post.value.post_id } });


  } 
  else {
    if (ImageData.value) {
      console.log("这里更新封面2",file);
      const responce = await DataService.Upload_Blog_Cover(
        post.value.post_id,
        ImageData.value,
      );
      console.log("更新封面的回复",responce.data);
    }
    if ((post.value.content !== params.content)||(post.value.title !== params.title)||post.value.plate !== params.plate) {
      const responce = await DataService.Update_Blog(
        post.value.post_id,
        post.value.title,
        post.value.content ,
        post.value.plate
      );
      console.log(post.value.content)
      console.log(responce.data);
    }
    ElMessage.success('修改成功！');
   // window.location.reload();
  }
  
  }
};
</script>

  
<style scoped>
.post-editor {
  width: 100%;
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
  