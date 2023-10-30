<template>
    <el-badge :value="1" class="item" type="primary">
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 5px;" >
          <img
            src="@/assets/login3.png"
            class="image"
          />
          <div style="padding: 10px">
            <el-text style="font-size: 17px; font-weight: 500;">2023各学院保研情况</el-text>
            <div class="bottom">
              <el-text type="info" style="zoom: 0.9;">2023年9月13日</el-text>
              <el-button type="primary" class="button" @click="router.push({name:'post'})" round plain>浏览</el-button>
            </div>
          </div>
        </el-card>
    </el-badge>
    
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.image {
    width: 310px;
    height: 300px;
    object-fit: cover;
    display:block;
  }
</style>