<template>
  <div  :style="`background:url('${url}images/bg3.png');height:${winH}px`" v-if="islogin" class="mine">
    <mt-header title="我的" fixed style="z-index=10">
    </mt-header>
    <img :src="`${url}images/tx.jpg`" />
    <p class="name" v-html="name"></p>
    <mt-button type="primary" size="large" @click="getRecord">我的历史</mt-button>
    <mt-button type="primary" size="large" @click="getcollcation">我的收藏</mt-button>
        <mt-button type="primary" size="large" @click="store">我的购买</mt-button>

    <mt-button type="danger" size="large" @click="logout">注销</mt-button>
  </div>
  <div v-else>
    <div class="form">
      <mt-header title="登录" fixed> </mt-header>
      <form @submit.prevent="submit">
        <mt-field
          label="账号"
          placeholder="请输入账号"
          :attr="{ pattern: '1\\d{10}', required: true }"
          v-model="obj.phone"
        ></mt-field>
        <mt-field
          label="密码"
          placeholder="请输入密码"
          :attr="{ pattern: '\\S{3,6}', required: true }"
          type="password"
          v-model="obj.password"
        ></mt-field>
        <div class="btn">
          <button type="submit">登录</button>
          <button type="reset">重置</button>
        </div>
      </form>
      <router-link class="newuse" to="/register"> 新用户注册 </router-link>
    </div>
        
  </div>
  
</template>
<script>
import { Toast } from "mint-ui";
import Qs from 'qs'

export default {
  data() {
    return {
      url: this.$store.state.url,
      winH:this.$store.state.screenH,
      phone: '',
      name:this.$store.state.name,
      islogin:this.$store.state.islogin,
      obj: {
        phone: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods:{
    
      submit() {
      this.$axios.get("login", { params: this.obj }).then((arr) => {
        if (arr.length == 0) {
          Toast("密码或账号错误");          
        } else {
            this.phone=arr[0].phone;
            this.name=arr[0].username;
            // this.$store.commit("phone", arr[0].phone);
          this.$store.commit("name", arr[0].username);
          this.$store.commit("phone", arr[0].phone);
          this.$store.commit('islogin',true)
          this.islogin=true          
        }
      });
    },
    getRecord(){
      this.$router.push('/history')
    },
    getcollcation(){
      this.$router.push('/collection')
    },
    store(){
      this.$router.push('/store')
    },
    logout(){
        this.islogin=false;
        this.obj={}
    }
  }
};
</script>
<style lang="less" scoped>
.mine {
  background-size: 100% 100%;
  height: 100%;
  padding: 50px 20px;
    a,a:visited{
        text-decoration: none;
        
    }
    button{
      margin-top: 10px;
    }
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    text-align: center;
  }
}
.form {
  padding-top: 50px;
  a.newuse{
      display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 30px;
  }
  div.btn {
    display: flex;
    justify-content: space-around;
    button {
      padding: 8px 25px;
      margin: 10px;
      border-radius: 4px;
      border: none;
      outline: none;
      background-color: rgb(52, 99, 252);
      color: white;
      &:last-child {
        background-color: transparent;
        background-color: #555;
      }
    }
  }
}
</style>