import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{
      userid:null,
      username:null,
      useravatar:null,
    },
    status:false
  },
  getters: {
      
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.status = true
    },
    Register(state,responce){
      state.user.userid=responce.id
      state.user.username=responce.username
    },
    setAvatar(state,avatar){
      state.user.useravatar=avatar
    },
    setUser_name(state,username){
      state.user.username=username
    }
  },
  actions: {
  },
  modules: {
  }
})
