<template>
  <div class="search" :style="`height:${screenH}px`">
    <!-- form作用是在手机小键盘上将enter变化search -->
    <mt-header style="background: white" title="搜索">
      <router-link to="/subject" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-search
      v-model="value"
      placeholder="请输入搜索内容"
      @keyup.native.enter="search"
      show
    >
    </mt-search>
    <div class="art">
      <div class="card" v-for="el in arr" :key="el.id">
        <router-link :to="`/topic/${el.title}`">
          <img :src="`${url}artTypeImg/${el.imgSrc}`" />
          <p v-html="el.title"></p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      screenH: this.$store.state.screenH - 90,
      url: this.$store.state.url,
      value: "",
      arr: [],
    };
  },
  methods: {
    search() {
      if (this.value === "") {
        Toast("请输入内容");
        return;
      }
      this.$axios.get("select?keyword=" + this.value).then((arr) => {
        console.log(arr);
        if (arr.length == 0) {
          Toast("没有更多了~~");
          return;
        }
        this.arr = arr;
      });
    },
  },
};
</script>
<style scoped lang='less'>
.search {
  text-align: center;
  a,
  a:visited {
    text-decoration: none;
    color: black;
  }
  .mint-header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    background-color: white;
  }
  .mint-search {
    margin-top: 40px;
    height: 55px;
    .mint-search-list {
      position: relative;
    }
  }
  .art {
    width: 100%;
    z-index: 10;

    .card {
      padding: 5px;
      margin-top: 0;
      display: inline-block;
      width: 47%;
      background: rgb(243, 239, 239);
      img {
        height: 200px;
        height: 200px;
        width: 70%;
        box-shadow: 1px 2px 10px black;
      }
      p {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
