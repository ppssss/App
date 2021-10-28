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
    <ul class="art">
      <li v-for="el in arr" :key="el.id">
        <router-link :to="`/audiodetails/${el.id}`">
          <p class="tit" v-html="el.title"></p>
          <p class='time' v-html="el.time"></p>
        </router-link>
      </li>
    </ul>
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
      this.$axios.get("searchaudio?keyword=" + this.value).then((arr) => {
        console.log(arr);
        if (arr.length == 0) {
          Toast("没有更多了~~");
          return;
        }
        this.arr = arr.map((el) => {
              el.time = new Date(el.updatedAt).toLocaleDateString();
              return el;
            });
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
    
    padding: 0;
    li {
      padding: 0 10px;
      list-style: none;
      border-bottom: 1px solid rgb(170, 166, 166);
      .tit {
        font-size: 18px;
      }
      .time {
        color: gray;
      }
    }
  }
}
</style>
