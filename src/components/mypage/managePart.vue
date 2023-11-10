<template>
    <div class="center">
        <div class="info" v-loading="loading" element-loading-text="Loading...">
        <el-row>
          <!-- <el-col span="14">
            <el-space wrap>
              <el-divider direction="vertical"></el-divider>
                <el-text> 板块 </el-text>
                <el-divider direction="vertical"></el-divider>
                <el-select v-model="type" placeholder="请选择板块" size="large">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>
                <el-divider direction="vertical"></el-divider>
              </el-space>
          </el-col> -->
          <el-col span="10">
            <el-space wrap>
                <el-text> 用户 </el-text>
                <el-divider direction="vertical"></el-divider>
                <div class="search-box">
                    <el-input
                    v-model="content" 
                    size="large"
                    placeholder="搜索沙河畔用户"
                    :prefix-icon="Search"
                    @keyup.enter="SearchUser"
                    />
                </div>
            </el-space>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- 参考我的页面风格，生成一段代码用于展示用户列表，补充悬浮显示用户信息的功能 -->
        <el-row>
            <el-col :span="24">
                <el-table :data="users" border style="width: 100%">
                  <el-table-column prop="username" label="用户名" width="120">
                    <template #default="{row}">
                      <el-popover
                        placement="top-start"
                        title="详细信息"
                        :width="300"
                        trigger="hover"
                      >
                      <div v-html="`用户名: ${row.username} </br> 性别: ${row.sex} <br> 
                      邮箱: ${row.email} <br> 用户组: ${row.groups} <br>
                      学院: ${row.major} <br> 学校: ${row.college} <br>`"></div>
                      <template #reference>
                        <el-text v-if="row.is_active">{{ row.username }}</el-text>
                        <el-text type="danger" v-else>{{ row.username }}</el-text>
                      </template>
                      </el-popover>
                        <!-- <el-tooltip effect="dark" :content="`用户名: ${row.username}, 性别: 邮箱: ${row.email}, 用户组: ${row.groups}`" placement="top">
                            <span>{{ row.username }}</span>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180">
                    </el-table-column>
                    <el-table-column prop="groups" label="用户组" width="120">
                      <template #default="{row}">
                        <div v-if="row.is_active">
                          <el-text v-if="row.groups.length==1">普通用户</el-text>
                          <el-text v-if="row.groups.length==2&&row.groups[1]==2">版主</el-text>
                          <el-text v-if="row.groups.length==2&&row.groups[1]==3">河畔管理员</el-text>
                        </div>
                        <el-text type="danger" v-else>已封禁</el-text>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template #default="{row}">
                            <el-button v-if="row.is_active" type="danger" plain size="small" @click="banUser(row)">封禁</el-button>
                            <el-button v-if="row.is_active" type="primary" plain size="small" @click="dialogVisible=true;selected_row=row;console.log(selected_row)">设为版主</el-button>
                            <el-button v-else type="primary" plain size="small" @click="UnbanUser(row)">解除封禁</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="center">
          <el-divider></el-divider>
          <el-pagination v-model:currentPage="currentPage"
          layout="prev, pager, next" :total="totalcounts" :page-size="5"
          @current-change="loadUser"
          />
        </div>
        </div>
    </div>
    <!-- 写一个对话框 在点击设置版主时打开 用于选择板块，板块内容从options里面得到，授予用户该板块版主 -->
    <el-dialog
      title="设置版主"
      v-model="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
    <el-space wrap>
              <el-divider direction="vertical"></el-divider>
                <el-text> 选中用户 </el-text>
                <el-divider direction="vertical"></el-divider>
                <el-input v-model="selected_row.username" disabled></el-input>
    </el-space>
    <el-divider></el-divider>
    <el-space wrap>
              <el-divider direction="vertical"></el-divider>
                <el-text> 板块 </el-text>
                <el-divider direction="vertical"></el-divider>
                <el-select v-model="type" placeholder="请选择板块" size="large">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>
                <el-divider direction="vertical"></el-divider>
    </el-space>
    <el-divider></el-divider>
    <div class="center">
      <el-button @click="AppointModerator">授予版主</el-button>
    </div>
    </el-dialog>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataService from '../services/DataService';
import { ElMessage } from 'element-plus';


const currentPage = ref(1)
const totalcounts = ref()
const type = ref('')
const content = ref('')
const dialogVisible = ref(false)
const Search = ref('')
const loading = ref(false)
const users = ref([])
const selected_row = ref({})

const banUser = async (row) => {
  try {
    loading.value = true;
    let response;
    response = await DataService.Ban_User(row.userID,false);
    console.log('response=',response);
    ElMessage.success('封禁成功');
    loadUser();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
const UnbanUser = async (row) => {
  try {
    loading.value = true;
    let response;
    response = await DataService.Ban_User(row.userID,true);
    console.log('response=',response);
    ElMessage.success('解封成功');
    loadUser();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
const SearchUser = async () => {
  try {
    loading.value = true;
    let response;
    console.log('search:', content.value)
    currentPage.value = 1;
    response = await DataService.Search_Users({page:currentPage.value,page_size:5,username:content.value});
    console.log('response=',response);
    users.value = response.data.results;
    totalcounts.value = response.data.count;
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
const AppointModerator = async () => {
  try {
    loading.value = true;
    let response;
    console.log('user=', selected_row.value.userID)
    console.log('type=', type.value)
    response = await DataService.Appoint_Moderator(Number(type.value),selected_row.value.userID);
    console.log('response=', response);
    dialogVisible.value = false;
    ElMessage.success('授予版主成功');
    loadUser();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}

const options = [
  {
    value: '1',
    label: '水手之家',
  },
  {
    value: '2',
    label: '校园热点',
  },
  {
    value: '3',
    label: '校园活动',
  },
  {
    value: '4',
    label: '失物招领',
  },
  {
    value: '5',
    label: '二手买卖',
  },
  {
    value: '6',
    label: '鹊桥',
  },
  {
    value: '7',
    label: '话心',
  },
  {
    value: '8',
    label: '就业创业',
  },
  {
    value: '9',
    label: '出国留学',
  },
  {
    value: '10',
    label: '保研考研',
  },
]
const loadUser = async () => {
    try {
        loading.value = true;
        let response;
        response = await DataService.Get_All_Users(currentPage.value,5);
        console.log('response=',response);
      users.value = response.data.results;
      totalcounts.value = response.data.count;
        loading.value = false;
    } catch (error) {
        console.log(error);
        loading.value = false;
    }
}
const handleClose = () => {
  dialogVisible.value = false;
};
onMounted(async () => {
    loadUser();
});
</script>

<style scoped>
.title{
    margin-bottom: 20px;
  font-weight:700;
  background: linear-gradient(40deg, rgb(58,103,237), rgb(118,168,225));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;

}


.info{
    margin-top: 20px;
    width: 700px;
}
.password-dialog .input-section {
  margin-bottom: 20px;
}

</style>