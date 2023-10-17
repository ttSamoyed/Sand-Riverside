<template>
    <div class="main">
        <el-row>
        <div class="logo-main">
            <div class="dec-line">
                <img class="icon" src="@/assets/shpicon.png">
                <img class="logo" src="@/assets/shplogo.png">
            </div>
        </div>
        </el-row>
        <el-row class="center">
            <el-text class="welcome">Welcome back, UESTCer</el-text>
        </el-row>

        <div class="center">
            <div class="input-square">
                <el-row gutter='30' class="padding-bottom">
                    <el-col span='4'>
                        <el-text>用户名</el-text>
                    </el-col>   
                    <el-col span="20">
                        <el-input
                        v-model="input1"
                        style="width: 260px;"
                        placeholder="Username"
                        :prefix-icon="Search"
                        />
                    </el-col>
                </el-row>

                <el-row gutter='45' class="padding-bottom">
                    <el-col span='4'>
                        <el-text>密码</el-text>
                    </el-col>   
                    <el-col span="20">
                        <el-input
                        v-model="input2"
                        style="width: 260px;"
                        placeholder="Password"
                        :prefix-icon="Search"
                        />
                    </el-col>
                </el-row>

                <el-row>
                    <div class="center">
                        <el-button class="button" type="primary" size="large" circle>
                            <el-icon><Avatar /></el-icon>
                        </el-button>
                    </div>
                </el-row>
        </div>

        </div>
        
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>

<style scoped>

.welcome{
    font-size: 50px;
    font-weight: 800;
    background: linear-gradient(80deg, rgb(118,188,250), rgb(171,70,246));
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
}
.main{
    margin-top: -20px;
    margin-bottom: -20px;
    height: 106%;
}

.dec-line{
    padding-left: 45px;
    padding-right: 45px;
    padding-bottom: 20px;
    border-bottom: 2.5px solid rgb(47,102,233);
}

.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo-main{
    margin-top: 110px;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
  .logo {
    width: 85px;
    height:auto;
    padding-bottom: 4.5px;
    padding-left: 5px;
  }

  
  .icon {
    width: 38px;
    height:auto;
    padding-top:3px;
    padding-bottom: 3px;
    padding-right: 5px;
    border-right: 2px solid #b4b2b251;
  }

  .input-square{
    width: fit-content;
    /* border: 2.5px solid rgba(47, 103, 233, 0.555); */
    border-radius: 10px;
    padding: 60px 20px;
  }

  .padding-bottom{
    padding-bottom: 30px;
  }
  .button{
    margin-top: 20px;
  }
</style>