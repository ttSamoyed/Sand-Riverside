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
  /**
   * 登录
   * @param {String} username
   * @param {String} password
   * @returns 登录结果和 Token
   * @description 登录成功后, 会将 access_token 和 refresh_token 保存到本地
   */
  Login(username, password) {
    return Login_apiClient.post('/login/', { username, password });
  },

  /**
   * 注册
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @returns 注册结果和 Token
   */
  Register(username, password, email) {
    return Login_apiClient.post('/register/', { username, password, email });
  },

  /**
   * 刷新 Token
   * @param {String} refresh_token
   * @returns access_token
   */
  Refresh_Token() {
    const refreshToken = localStorage.getItem('refresh_token');
    return Login_apiClient.post('/refresh/', { refresh: refreshToken });
  },

  /**
   * 登出
   * @returns 登出结果
   * @description 登出后, 会清除本地的 access_token 和 refresh_token
   */
  Logout() {
    return apiClient.post('/logout/');
  },


  //#region 个人账户

  // TODO: 其实我后端加了 /0/ 为对自己的账户操作, 前端需要对应修改吗

  /**
   * 获取个人详细信息
   * @param {Number} userid
   * @returns 个人详细信息
   */
  Get_Personal_Info(userid) {
    const url = '/profile/' + userid + '/';
    return apiClient.get(url);
  },


  /**
   * 修改个人信息
   * @param {Number} userid
   * @param {String} sex
   * @param {File} avatar
   * @param {String} status
   * @param {String} stuID
   * @param {String} college
   * @param {String} major
   * @param {String} birth_date
   * @param {String} address
   * @param {String} phone
   * @param {Boolean} is_active
   * @returns 修改个人信息结果
   */
  Update_Personal_Info(userid, sex, avatar, status, stuID, college, major, birth_date, address, phone) {
    const url = '/profile/' + userid + '/';
    return apiClient.patch(url, { sex, avatar, status, stuID, college, major, birth_date, address, phone });
  },


  /**
   * 管理员修改个人信息
   * @param {Number} userid
   * @param {String} sex
   * @param {File} avatar
   * @param {String} status
   * @param {String} stuID
   * @param {String} college
   * @param {String} major
   * @param {String} birth_date
   * @param {String} address
   * @param {String} phone
   * @param {Boolean} is_active
   * @returns 管理员修改个人信息结果
   */
  Manage_Personal_Info(userid, sex, avatar, status, stuID, college, major, birth_date, address, phone) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { sex, avatar, status, stuID, college, major, birth_date, address, phone, is_active });
  },


  /**
   * 封禁/解封 用户
   * @param {Number} userid
   * @param {Boolean} is_active
   * @returns 封禁/解封 用户结果
   */
  Ban_User(userid, is_active) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { is_active });
  },


  /**
   * 获取所有用户列表及简略信息
   * @param {Number} page - 页码
   * @param {Number} page_size - 每页数量
   * @returns 所有用户列表及简略信息
   */
  Get_All_Users(page, page_size) {
    return apiClient.get('/user/list/', {
      params: {
        page: page, // 页码
        page_size: page_size // 每页数量
      }
    });
  },

  /**
   * 获取用户头像
   * @param {Number} userid
   * @returns 用户头像 URL
   */
  Get_User_Avatar(userid) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.get(url);
  },

  /**
   * 修改用户头像
   * @param {Number} userid
   * @param {File} avatar
   * @returns 修改用户头像结果
   */
  Update_User_Avatar(userid, avatar) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.post(url, { avatar });
  },


  /**
   * 删除用户头像
   * @param {Number} userid
   * @returns 删除用户头像结果
   */
  Delete_User_Avatar(userid) {
    const url = 'user/avatar/' + userid + "/";
    return apiClient.delete(url);
  },

  /**
   * 修改密码
   * @param {Number} userid 
   * @param {string} old_password 
   * @param {string} new_password 
   * @returns 修改密码结果
   */
  Update_Password(userid, old_password, new_password) {
    const url = '/profile/' + userid + '/';
    return apiClient.post(url, { old_password, new_password });
  },

  /**
   * 删除用户的账户
   * @param {Number} userid 
   * @returns 删除用户的账户结果
   */
  Delete_Account(userid) {
    const url = '/profile/' + userid + '/';
    return apiClient.delete(url);
  },

  //#region 个人账户


  //#region 博客


  /**
   * 获取博客详情
   * @returns {JSON} - 返回所有博客列表
   */
  Get_All_Blogs() {
    return apiClient.get('/post/list/', {
      params: {
        page: page, // 页码
        page_size: page_size // 每页数量
      }
    });
  },

  /**
   * 搜索博客
   * @param {string} post_id - 博客ID关键字
   * @param {string} title - 标题关键字
   * @param {string} content - 内容关键字
   * @param {string} author__userID - 作者用户ID关键字
   * @param {string} author__username - 作者用户名关键字
   * @param {string} tags__name - 标签名称关键字
   * @param {string} plate__plateID - 板块ID关键字
   * @param {string} plate__name - 板块名称关键字
   * @param {boolean} is_essence - 是否为精华博客关键字
   * @param {number} page - 页码
   * @param {number} page_size - 每页数量
   * @returns {JSON} - 返回搜索结果
   */
  Search_Blogs(post_id, title, content, author__userID, author__username, tags__name, plate__plateID, plate__name, is_essence, page, page_size) {
    return apiClient.get('/post/list/', {
      params: {
        post_id: post_id,
        title: title,
        content: content,
        author__userID: author__userID,
        author__username: author__username,
        tags__name: tags__name,
        plate__plateID: plate__plateID,
        plate__name: plate__name,
        is_essence: is_essence,
        page: page,
        page_size: page_size
      }
    });
  },

  //#region 博客







  // 以下是原有的函数, 待修改后删除
  Select_All_My_Blogs() {
    return apiClient.get('/post/list/');
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
