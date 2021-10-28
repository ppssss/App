<template>
  <div class="store">
    <mt-header title="购买记录" fixed style="z-index=10">
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="card" v-for="el in list" :key="el.id">
      <router-link :to="`/topic/${el.artName}`">
        <p class="tit" v-html="el.artName"></p>
      <p v-html="el.date"></p>
      </router-link>
      
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      list: [],
      url: this.$store.state.url,
      out_trade_no: this.$route.query.out_trade_no,
      rs: "",
      code: "",
      artName:this.$store.state.artName,
      phone:this.$store.state.phone
    };
  },
  mounted() {
   
      this.$axios.get("getstore", {params:{phone:this.phone}}).then((rs) => {        
        this.list=rs.map(el=>{
          el.date=new Date(el.updatedAt).toLocaleDateString()
          return el
        })     
      });
    },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.store {
  
  padding: 50px 20px;
  .mint-search {
    top: 0;
    height: 55px;
    width: 100%;
    position: fixed;
    z-index: 2;
  }
  .card{
     margin: 15px 0;
     padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgb(150, 147, 147);
    .tit{
      font-size: 20px;
    }
  }
}
</style>