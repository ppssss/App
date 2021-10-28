<template>
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
    <router-link to="/register"> 新用户注册</router-link>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import Qs from 'qs'

export default {
  data() {
    return {
      obj: {
        phone: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    
    submit() {
      this.$axios.get("login", { params: this.obj }).then((arr) => {
        if (arr.length == 0) {
          Toast("密码或账号错误");          
        } else {
          this.$store.commit("phone", arr[0].phone);
          this.$store.commit("name", arr[0].username);
          console.log(arr[0].phone);
          this.$store.commit('islogin',true)
        }
      });
    },
  },
};
</script>
<style scoped lang='less'>
.form {
  .pay{
    padding: 100px 0;
  }
  padding-top: 50px;
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