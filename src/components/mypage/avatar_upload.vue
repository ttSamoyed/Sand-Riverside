<template>
    <el-upload
      class="avatar-uploader"
      :action="url"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      <el-text>{{ headers }}</el-text>
    </el-upload>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref,computed } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  
  import type { UploadProps } from 'element-plus'
  //"http://124.222.42.111:8000/api/profile/" + userid + '/'
  const imageUrl = ref('')
  const props = defineProps({
  userid: {
    type: Number
  }
  })
  const headers = computed(() => {
    const accessToken = localStorage.getItem('access_token');
    return {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
    };
  });
  const url = computed(() => {
  return "http://124.222.42.111:8000/api/profile/" + props.userid + '/'
    })

  
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
        ) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    }
    
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
  }

  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>
  
