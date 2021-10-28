<template>
  <div class="swipe" :style="`background:url('${url}images/bg3.png')`">
    <div class="serch" @click="tosearch">
      <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
      </mt-search>
    </div>

    <mt-navbar style="position:'fixed',top:'50px'" v-model="selected" @click.native="getId">
      <mt-tab-item id="0" value='xh'>玄幻</mt-tab-item>
      <mt-tab-item id="1" value='lz'>励志</mt-tab-item>
      <mt-tab-item id="2" value='tl'>推理</mt-tab-item>
      <mt-tab-item id="3" value='zz'>战争</mt-tab-item>
      <mt-tab-item id="4" value='kh'>科幻</mt-tab-item>
      <mt-tab-item id="5" value='yq'>言情</mt-tab-item>
    </mt-navbar>
    <mt-swipe
      :show-indicators="false"
      :style="`height: ${screeH}px`"
      ref="swipeWrapper"
      @change="change"
      :defaultIndex="defaultIndex"
      :auto="0"
    >
      <mt-loadmore
        class="one"
        :top-method="loadTop"
        ref="loadmore"
        style="height: 100%; overflow: auto"
      >
        <div
          class="art"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="card" v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <p v-html="el.title"></p>
              <p class='hot'>1009万热度</p>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
      <mt-loadmore
        class="two"
        :top-method="loadTop"
        ref="loadmore1"
        style="height: 100%; overflow: auto"
      >
        <ul
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
          class="audio"
        >
          <li v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <span v-html="el.title"></span>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
      <mt-loadmore
        class="one"
        :top-method="loadTop"
        ref="loadmore2"
        style="height: 100%; overflow: auto"
      >
        <div
          class="art"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="card" v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <p v-html="el.title"></p>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
      <mt-loadmore
        class="one"
        :top-method="loadTop"
        ref="loadmore3"
        style="height: 100%; overflow: auto"
      >
        <div
          class="art"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="card" v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <p v-html="el.title"></p>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
      <mt-loadmore
        class="one"
        :top-method="loadTop"
        ref="loadmore4"
        style="height: 100%; overflow: auto"
      >
        <div
          class="art"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="card" v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <p v-html="el.title"></p>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
      <mt-loadmore
        class="one"
        :top-method="loadTop"
        ref="loadmore5"
        style="height: 100%; overflow: auto"
      >
        <div
          class="art"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="card" v-for="el in list" :key="el.id">
            <router-link :to="`/topic/${el.title}`">
              <img :src="`${url}artTypeImg/${el.imgSrc}`" />
              <p v-html="el.title"></p>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
    </mt-swipe>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      screeH: this.$store.state.screenH - 135,
      url: this.$store.state.url,
      value: "",
      selected: this.$store.state.select,
      defaultIndex: this.$store.state.select - 0,
      loading: false,
      list: [],
      curpage:0      
    };
  },
  mounted() {
    this.getArt();
    
  },
  methods: {
    loadTop() {
      this.list = [];
      switch (this.selected) {
        case "0":
          console.log(0); 
          this.curpage0 = 0;         
          this.getArt(() => {
            this.$refs.loadmore.onTopLoaded();
            this.loading = false;
          });
          break;
        case "1":
          this.curpage1 = 0;
          this.getArt(() => {
            this.$refs.loadmore1.onTopLoaded();
            this.loading = false;
          });
          break;
        case "2":
          this.curpage2 = 0;
          this.getArt(() => {
            this.$refs.loadmore2.onTopLoaded();
            this.loading = false;
          });
          break;
          case "3":
            this.curpage3 = 0;
          this.getArt(() => {
            this.$refs.loadmore3.onTopLoaded();
            this.loading = false;
          });
          break;
          case "4":
            this.curpage4 = 0;
          this.getArt(() => {
            this.$refs.loadmore4.onTopLoaded();
            this.loading = false;
          });
          break;
          case "5":
            this.curpage5 = 0;
          this.getArt(() => {
            this.$refs.loadmore5.onTopLoaded();
            this.loading = false;
          });
          break;
      }
    },
    tosearch() {
      this.$router.push("/search2");
    },
    loadMore() {      
    },
    getArt(fun) {
      let artType='';
      switch (this.selected) {
        case '0':
          artType='xh'
          break;
          case '1':
          artType='lz'
          break;
          case '2':
          artType='tl'
          break;
          case '3':
          artType='zz'
          break;
          case '4':
          artType='kh'
          break;
          case '5':
          artType='yq'
          break;
      }
      const params = {
        params: {
          artType:artType,
          start: this.curpage * 10,
          pageSize: 50,
        },
      };
      this.$axios.get("getIndexArt", params).then((arr) => {
        // console.log(arr);
        if (arr.length == 0) {
          this.loading = false;
          Toast("到底了");
        } else {
          this.list = [...this.list, ...arr];       
        }
      });
      if (fun) fun();
    }, 
    change(i) {
      this.selected = i + "";
      this.$store.commit("changeSelect", this.selected);
    },
    getId() {
      this.defaultIndex = this.selected - 0;
      this.$refs.swipeWrapper.swipeItemCreated();
      this.$store.commit("changeSelect", this.selected);
      this.curpage == 0;
    },
  },
  watch: {
    selected() {      
        this.list=[]
        this.getArt();      
    },
    
  },
};
</script>
<style scoped lang="less">
.swipe {
  padding-top: 110px;
  background-size:100% 100% ;
  a,
  a:visited {
    text-decoration: none;
    color: black;
  }
  .mint-search {
    top: 0;
    height: 55px;
    width: 100%;
    position: fixed;
    z-index: 2;
  }
  .mint-navbar {
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 50px;
  }
  .mint-swipe {
    text-align: center;
    .one {
      .art {
        width: 100%;
        .card {
          padding: 20px 0;
          margin-top: 0;
          display: inline-block;
          width: 47%;
          border-bottom: 1px solid rgb(194, 191, 191);
          img {
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
            &.hot{
              color: rgb(170, 167, 167);
              font-size: 14px;
            }
          }
        }
      }
    }
    .two {
      .audio {
        padding: 0;
        li {
          list-style: none;

          align-items: center;
          text-align: left;
          padding: 8px 3px;
          border-bottom: 1px solid rgb(206, 202, 202);
          a {
            width: 100%;
            display: flex;
            align-items: center;
            img {
              flex: 3;
              height: 100px;
              width: 150px;
              border-radius: 4px;
            }
            span {
              flex: 7;
              height: 100%;
              font-size: 20px;
              padding-left: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
