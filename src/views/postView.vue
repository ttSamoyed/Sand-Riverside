<template>
    <div class="page">
        <div class="box-card">
        <el-card :body-style="{ padding: '0px' }">
            <template #header>
                <img
                            src="@/assets/login3.png"
                            class="image"
                        />
                <div class="card-header">
                    <div class="card-header1">
                    <div class="title">
                        <el-row class="row">
                        <h2>2023年各学院保研情况</h2>
                        </el-row>
                        <el-row style="margin-top: -10px;">
                            
                        <el-text>分类：</el-text>
                        <el-tag effect="plain"><el-icon><Flag /></el-icon> 原创 </el-tag>
                        <el-text style="margin-left: 10px;">创建时间：</el-text>
                        <el-tag type="info" effect="plain"><el-icon><Clock /></el-icon> 2023-9-13 </el-tag>
                        </el-row>
                        <el-row class="row">
                        <el-avatar :size="30"> u </el-avatar>
                        <el-text class="author">
                             blog.user_name 
                        </el-text>
                        <!--编辑博文和删除博文-->
                        </el-row>
                    </div>
                    <div class="info">
                        <span><el-icon><ArrowUpBold /></el-icon>  12 </span>
                        <span><el-icon><ChatRound /></el-icon> 10 </span>
                        <span style="border: none;"><el-icon><View /></el-icon>  100 </span>
                    </div>
                    </div>
                </div>
            </template>
           
            <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
                <time class="time"> currentDate </time>
                <el-button text class="button">Operating</el-button>
            </div>
            </div>
        </el-card>
        </div>
    </div>
    


</template>

<script setup>

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
.info span {
  font-size: small;
  margin-right: 10px;
  margin-bottom: 5px;
  color: grey;
  /* border-bottom: 2px solid rgba(150, 149, 149, 0.478); */
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