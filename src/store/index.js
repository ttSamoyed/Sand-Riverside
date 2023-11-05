
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      address: null,
      avatar: null,
      birth_date: null,
      college: null,
      date_joined: null,
      email: null,
      groups: null,
      is_active: null,
      is_superuser: false,
      last_login: null,
      major: null,
      phone: null,
      sex: null,
      status: null,
      stuID: null,
      userID: null,
      username: null,
    },
    isLogin: false,
    access_token: null,
    fresh_token: null,
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLogin = true
    },
    Register(state,responce){
      state.user.id=responce.id
      state.user.user_name=responce.user_name
    },
    setAvatar(state,avatar){
      state.user.avatar=avatar
    },
    setUser_name(state,user_name){
      state.user.user_name=user_name
    },
    setToken(state, access_token, fresh_token) {
      state.access_token = access_token
      state.fresh_token = fresh_token
    }
  },
  actions: {
  },
  modules: {
  }
})
