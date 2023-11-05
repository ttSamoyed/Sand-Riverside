// 导入 axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://124.222.42.111:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 发送请求前的拦截器
apiClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;  // 设置 Authorization 头部
  }
  return config;
});

const Login_apiClient = axios.create({
  // 设置后端 API 的基础 URL
  baseURL: "http://124.222.42.111:8000/api",
  // 设置请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 定义一个用于获取数据的函数
export default {
  // 登录
  Login(username, password) {
    return Login_apiClient.post('/login/', { username, password });
  },

  // 注册
  Register(username, password, email) {
    return Login_apiClient.post('/register/', { username, password, email });
  },

  // 退出登录
  Logout() {
    return apiClient.post('/logout/');
  },

//#region 个人账户

  // TODO: 其实我后端加了 /0/ 为对自己的账户操作, 前端需要对应修改吗

  // 获取个人详细信息
  Get_Personal_Info(userid) {
    const url = '/profile/' + userid + '/';
    return apiClient.get(url);
  },

  // 修改个人信息
  Update_Personal_Info(userid, sex, avatar, status, stuID, college, major, birth_date, address, phone) {
    const url = '/profile/' + userid + '/';
    return apiClient.patch(url, { sex, avatar, status, stuID, college, major, birth_date, address, phone });
  },

  // 管理员修改个人信息 可以在这里 封禁/解封 用户
  Manage_Personal_Info(userid, sex, avatar, status, stuID, college, major, birth_date, address, phone) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { sex, avatar, status, stuID, college, major, birth_date, address, phone, is_active});
  },

  // 封禁/解封 用户
  Ban_User(userid, is_active) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { is_active });
  },

  // 获取所有用户列表及简略信息
  Get_All_Users() {
    return apiClient.get('/user/list/', {
      params: {
        page: page, // 页码
        page_size: page_size // 每页数量
      }
    });
  },

  // 获取用户头像
  Get_User_Avatar(userid) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.get(url);
  },

  // 修改用户头像
  Update_User_Avatar(userid, avatar) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.post(url, { avatar }); // 上传文件
  },

  // 删除用户头像
  Delete_User_Avatar(userid) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.delete(url);
  },

  // 修改密码
  Update_Password(userid, old_password, new_password) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { old_password, new_password });
  },

  // 注销账户
  Delete_Account(userid) {
    const url = '/profile/' + userid + '/';
    return apiClient.delete(url);
  },

//#region 个人账户


//#region 博客


  // 获取所有博客列表及简略信息
  Get_All_Blogs() {
    return apiClient.get('/post/list/', {
      params: {
        page: page, // 页码
        page_size: page_size // 每页数量
      }
    });
  },

 //#region 博客






 
// 以下是原有的函数, 待修改后删除
  Select_All_My_Blogs() {

  },

  Select_All_Blogs() {
    return apiClient.get('/post/list/');
  },

  // Select_Conditional_Blogs(title) {
  //   return apiClient.post('/SCB', { title: title });
  // },
  isInputRight(name, password) {
    return Login_apiClient.post('/Login_Judge', { name, password });
  },
  SelectBlog(user_id, blog_id) {
    return apiClient.post('/SB', { user_id: user_id, blog_id: blog_id });
  },
  select_profile(id) {
    return apiClient.post('/SP', { user_id: id });
  },
  insertComment(user_id, blog_id, content) {
    return apiClient.post('/IC', { user_id: user_id, blog_id: blog_id, content: content });
  },

  Update_Likes(user_id, blog_id, user_like) {
    return apiClient.post('/UL', { user_id: user_id, blog_id: blog_id, user_like: user_like });
  },
  insertBlog(user_id, type_name, description, title, content) {
    return apiClient.post('/IB', { user_id: user_id, type_name: type_name, description: description, title: title, content: content });
  },
  UpdatePhone(user_id, phone) {
    return apiClient.post('/UP', { user_id: user_id, phone_number: phone });
  },
  UpdateAvatar(user_id, avatar) {
    return apiClient.post('/UA', { user_id: user_id, avatar: avatar });
  },
  UpdateEmail(user_id, email) {
    return apiClient.post('/UE', { user_id: user_id, email: email });
  },
  UpdateName(user_id, user_name) {
    return apiClient.post('/UN', { user_id: user_id, user_name: user_name });
  },
  search_my_blogs(user_id) {
    return apiClient.post('/SMB', { user_id: user_id });
  },
  Update_blog_Content(blog_id, user_id, content) {
    return apiClient.post('/UBC', { blog_id: blog_id, user_id: user_id, content: content });
  },
  Update_blog_Title(blog_id, user_id, title) {
    return apiClient.post('/UBTitle', { blog_id: blog_id, user_id: user_id, title: title });
  },
  Update_blog_Type(blog_id, user_id, type_name) {
    return apiClient.post('/UBType', { blog_id: blog_id, user_id: user_id, type_name: type_name });
  },
  Update_blog_Description(blog_id, user_id, description) {
    return apiClient.post('/UBD', { blog_id: blog_id, user_id: user_id, description: description });
  },
  delete_blog(blog_id, user_id) {
    return apiClient.post('/DB', { blog_id: blog_id, user_id: user_id });
  }
};
