<template>
  <div class="history">
    <mt-header title="历史记录" fixed style="z-index=10">
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <div v-for="el in arr" :key="el.id">
      <div v-if="el.artType == '0'">
        <router-link :to="`/details/${el.artId}`">
          <div class="st1">
            <div class="title" v-html="el.title"></div>
            <div class="type">文章</div>
            <div class="date" v-html="el.date"></div>
          </div>
        </router-link>
        <p @click="del(el.id)" class="del">删除</p>
      </div>
      <div v-if="el.artType == '1'">
        <router-link :to="`/audiodetails/${el.artId}`">
          <div class="st1" >
            <div class="title" v-html="el.title"></div>
            <div class="type">音频</div>
            <div class="date" v-html="el.date"></div>
          </div>
        </router-link>
        <p class="del" @click="del(el.id)">删除</p>
      </div>
      
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      arr: [],
      artType: "",
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
      getData(){
          this.$axios
      .get("getRecord", { params: { phone: this.$store.state.phone } })
      .then((arr) => {
        console.log(arr);
        this.arr = arr.map((el) => {
          el.date = new Date(el.updatedAt).toLocaleDateString();
          return el;
        });
      });
      },
    back() {
      this.$router.go(-1);
    },
    del(id) {
      this.$axios
        .get("delHistory", {
          params: { phone: this.$store.state.phone, id },
        })
        .then(() => {
          Toast('删除成功')
          this.getData()
        });
    },
  },
};
</script>
<style lang="less" scoped>
.history {
  a,
  a:visited {
    text-decoration: none;
    color: black;
  }
  padding-top: 50px;
  width: 100%;
  .st1 {
    display: flex;
    border: 1px solid rgb(196, 193, 193);
    height: 100px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    .title {
      font-size: 20px;
      width: 200px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .del {
      display: inline-block;
      width: 100%;
    text-align: center;
    margin: 0;
    background: red;
    color: white;
    font-size: 20px;
    margin-bottom: 30px;
  }
}
</style>