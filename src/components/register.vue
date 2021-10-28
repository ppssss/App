<template>
  <div class="register">
    <mt-header title="注册" fixed>
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <form @submit.prevent="submit">
      <mt-field
        label="用户名"
        placeholder="请输入6-8位用户名"
        :attr="{ pattern: '\\S{6,8}', required: true }"
        v-model="obj.username"
        ><b>*</b></mt-field
      >
      <mt-field
        label="邮箱"
        placeholder="请输入邮箱"
        :attr="{ pattern: '\\w+@\\w+\\.(\\w+\\.)?[a-z]+', required: true }"
        type="email"
        v-model="obj.email"
        ><b>*</b></mt-field
      >
      <mt-field
        label="密码"
        placeholder="请输入密码"
        :attr="{ pattern: '\\S{3,6}', required: true }"
        type="password"
        v-model="obj.password"
        ><b>*</b></mt-field
      >
      <mt-field
        label="确认密码"
        placeholder="请输入确认密码"
        :attr="{ pattern: '\\S{3,6}', required: true }"
        type="password"
        v-model="repassword"
        ><b>*</b></mt-field
      >
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        :attr="{ pattern: '1\\d{10}', required: true }"
        type="tel"
        v-model="obj.phone"
        ><b>*</b></mt-field
      >      
      <mt-field
        label="生日"
        placeholder="请输入生日"
        type="date"
        v-model="obj.birthday"
      ></mt-field>
      
      <div class="btn">
        <button>提交</button>
        <button type="reset">重置</button>
      </div>
    </form>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import qs from "qs"
export default {
  methods: {
    submit() {
      if (this.repassword === this.obj.password) {
        const parmas=qs.stringify(this.obj)
        console.log(parmas);
        this.$axios.post('insertuse',parmas).then(str=>{
          if(str=='false'){
            Toast("手机号已被注册")
            return
          }else{
            this.$router.go(-1);
          }
        })
        
      } else {
        Toast("两次密码不一致！");
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      obj: {
        username: "",
        email: "",
        phone: "",
        password: "",
        birthday: "",
      },
      repassword: "",
    };
  },
};
</script>

<style lang="less">
.register {
    padding-top: 50px;
  .mint-cell-wrapper {
    background-size: 100% 1px;
  }
  b {
    display: inline-block;
    color: red;
    padding-top: 5px;
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
