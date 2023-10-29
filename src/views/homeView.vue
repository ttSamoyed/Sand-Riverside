<template>
    <el-row :gutter="30" class="page">
        <!-- 左侧导航栏 -->
        <el-col :span="4">
            <navigator @itemSelected="handleItemSelected"></navigator>
        </el-col>
        <!-- 右侧板块 -->
        <el-col :span="20">
          <ul class="infinite-list" style="overflow: auto; height: 696px;">
              <!-- 沙河畔主页 -->
              <aboutShp v-if="index=='0'"></aboutShp>
              <!-- 按板块查看帖子列表 -->
              <partView v-if="index!='0'" :p=index></partView>
          </ul>
        </el-col>
    </el-row>
</template>

<script setup>
import navigator from "@/components/home/navigator.vue"
import aboutShp from "@/components/home/aboutShp.vue"
import partView from "../components/home/partView.vue";
import { ref } from "vue";

const index = ref('0')
const handleItemSelected = (newIndex) => {
  index.value = newIndex; // 更新父组件的selectedIndex
};
</script>

<style scoped>

.page{
  margin-top: -20px !important;
  height: 700px;
}

.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info{
  margin-left: 20px;
  padding-left: 20px;
  margin-top: 20px;
  padding-top: 1px;
  padding-bottom: 3px;
  border-left: 3px solid dodgerblue;
}
.smalltitle{
  font-weight: 500;
  font-size: 24px; 
}

.banzhu{
  font-size: 12px;
}

</style>