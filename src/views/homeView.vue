<template>
    <el-row :gutter="30" class="page">
        <el-col :span="4">
            <navigator></navigator>
        </el-col>
        <el-col :span="20">
          <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto; height: 696px;">

              <aboutShp v-if="index=='1'"></aboutShp>
              <div class="post_list" v-if="index!='1'">
                <el-row>
                  <el-col :span="19" style="padding-left: 45px;">
                    <post_card></post_card>
                    <post_card></post_card>
                    <post_card></post_card>
                    <post_card></post_card>
                  </el-col>
                  <el-col :span="5">
                      <div class="info">
                        <el-row>
                          <span class="smalltitle">水手之家</span>
                          <el-icon size="28" style="margin-top: 2px; margin-left: 10px;"><Help /></el-icon> 
                        </el-row>
                        <el-row style="margin-top: 3px;">
                          <el-space>
                            <el-text class="banzhu">本板块由</el-text>
                            <el-avatar :size="20" shape="square">
                              <el-icon><UserFilled /></el-icon>
                            </el-avatar>
                            <el-text class="banzhu">杨波</el-text>
                            <el-text class="banzhu">管理</el-text>
                          </el-space>
                        </el-row>
                      </div>
                  </el-col>
                </el-row>
              </div>
          </ul>
        </el-col>
    </el-row>
</template>

<script setup>
import navigator from "@/components/home/navigator.vue"
import aboutShp from "@/components/home/aboutShp.vue"
import post_card from "@/components/home/post_card.vue"
import { ref } from "vue";

const name = 'HomeView';
const index = ref('2')
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