<template>
<div class="post">
    <el-row>
        <span class="title">
            机器学习，深度学习，神经网络，深度神经网络之间有何区别？
        </span>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-col :span="6">
            <img src="@/assets/login3.png" class="image"/>
        </el-col>
        <el-col :span="18">
                <el-row>
                    <el-space wrag>
                        <el-avatar :size="20" shape="square">
                            <el-icon><UserFilled /></el-icon>
                        </el-avatar>
                        <el-text type="info">王思雨</el-text>
                    </el-space>
                    
                </el-row>
                <el-row style="margin-top: 10px;width: 100%;">
                    <el-text size="large">
                    按照个人的理解，先说个人观点：机器学习>神经网络>深度学习≈深度神经网络。深度学习是基于深度神经网络的，深度神经网络和浅层神经网络都是神经网络，而机器学习是包括神经网络在内的算法。下面答主就来分解一下这几个概念。
                    </el-text>
                </el-row>
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-button  plain >
            <el-icon size="16"><CaretTop /></el-icon>
            赞同 3084
        </el-button>
        <el-button  plain>
            <el-icon size="16"><Collection /></el-icon>
        </el-button>
        <span class="view_com">
            <el-space wrag>
                <el-icon><ChatRound /></el-icon>18
                <el-icon style="margin-left: 10px;"><View></View></el-icon>20
            </el-space>
        </span>
    </el-row>
</div>
</template>

<script setup>

</script>

<style scoped>
.post{
    height: 220px;
    width: 800px;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.title{
    margin-top: 10px;
    font-weight: 500;
}

.image {
    width: 180px;
    height: 130px;
    border-radius: 5px;
    object-fit: cover;
    display:block;
  }

.view_com{
    margin-top: 4px;
    margin-left: 25px;
    color: #727070cd;
    font-size: 15px;
}
  
</style>
