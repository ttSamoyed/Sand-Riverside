<template>
    <el-badge :value="1" class="item" type="primary">
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 5px;" >
          <img
            src="@/assets/login3.png"
            class="image"
          />
          <div style="padding: 10px">
            <span style="font-weight: 300;">2023各学院保研情况</span>
            <div class="bottom">
              <time class="time">2023年9月13日</time>
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