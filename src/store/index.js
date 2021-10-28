import Vue from 'vue'
import Vuex from 'vuex'

const screenH=document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenH,
    url:'http://192.168.37.1:1337/',
    select:'0',
    audioSelect:'0',
    phone:'',
    name:'',
    islogin:false,
    subId:'0',
    artName:'',
    toplength:'',
  },
  mutations: {
    changeSelect(state,no){
      state.select=no
    },
    audioSelect(state,no){
      state.audioSelect=no
    },
    phone(state,no){
      state.phone=no
    },
    name(state,no){
      state.name=no
    },
    islogin(state,no){
      state.islogin=no
    },
    changeId(state,no){
      state.subId=no
      console.log(this.state.subId);
    },
    artName(state,no){
      state.artName=no
    },
    oplength(state,no){
      state.toplength=no
    },
   
  },
  actions: {
  },
  modules: {
  }
})
