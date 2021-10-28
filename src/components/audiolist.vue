<template>
  <div
    class="audiolist"
    :style="`background:url('${url}images/bg3.png');height:${winH}px`"
  >
    <div class="serch" @click="tosearch">
      <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
      </mt-search>
    </div>

    <mt-navbar
      style="position:'fixed',top:'50px'"
      v-model="selected"
      
    >
      <mt-tab-item id="0" value="one">心经</mt-tab-item>
      <mt-tab-item id="1" value="two">金刚经</mt-tab-item>
      <mt-tab-item id="2" value="three">水浒传</mt-tab-item>
      <mt-tab-item id="3" value="four">大话西游</mt-tab-item>
    </mt-navbar>
    <mt-tab-container :style="`height: ${winH}px`" v-model="selected">
      <mt-tab-container-item :style="`height: ${winH}px`" id="0">
        <mt-loadmore
          class="one"
          :top-method="loadTop"
          ref="loadmore1"
          style="height: 100%; overflow: auto"
        >
          <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
          >
          <router-link v-for="el in list1" :key="el.id" :to="`/audiodetails/${el.id}`">
            <li>
              <p class="tit" v-html="el.title"></p>
              <p class="time" v-html="el.time"></p>
            </li>
          </router-link>
            
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>

      <mt-tab-container-item  :style="`height: ${winH}px`" id="1">
        <mt-loadmore
          :top-method="loadTop"
          ref="loadmore2"
          style="height: 100%; overflow: auto"
        >
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="1"
          infinite-scroll-immediate-check="false"
        >
        <router-link v-for="el in list2" :key="el.id" :to="`/audiodetails/${el.id}`">
          <li>
            <p class="tit" v-html="el.title"></p>
            <p class="time" v-html="el.time"></p>
          </li>
        </router-link>
        </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item :style="`height: ${winH}px`" id="2">
        <mt-loadmore
          :top-method="loadTop"
          ref="loadmore3"
          style="height: 100%; overflow: auto"
        >
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="1"
          infinite-scroll-immediate-check="false"
        >
        <router-link v-for="el in list3" :key="el.id" :to="`/audiodetails/${el.id}`">
          <li>
            <p class="tit" v-html="el.title"></p>
            <p class="time" v-html="el.time"></p>
          </li>
        </router-link>
        </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item :style="`height: ${winH}px`" id="3">
        <mt-loadmore
          :top-method="loadTop"
          ref="loadmore4"
          style="height: 100%; overflow: auto"
        >
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="2"
          infinite-scroll-immediate-check="false"
        >
        <router-link v-for="el in list4" :key="el.id" :to="`/audiodetails/${el.id}`">
          <li>
            <p class="tit" v-html="el.title"></p>
            <p class="time" v-html="el.time"></p>
          </li>
        </router-link>
        </ul>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      loading: false,
      value: "",
      selected: this.$store.state.audioSelect,
      url: this.$store.state.url,
      winH: this.$store.state.screenH - 150,
      start1: 0,
      start2: 0,
      start3: 0,
      start4: 0,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
    };
  },
  mounted() {
    this.getaudio();
  },
  watch: {
    selected(old,value) {      
        // console.log(old);  
        // console.log(value); 
         this.$store.commit("audioSelect", this.selected); 
        if(old<value){
          return
        } 
        else{
          // this.getaudio()
          this.loadTop();
        }
        // this.loadMore()
        // this.getaudio()
    }},
  methods: {
    tosearch() {
      this.$router.push("/searchaudio");
    },
    loadTop() {
       switch (this.selected) {
        case "0":
          this.start1 = 0; 
          this.list1=[]        
          this.getaudio(() => {
            
            this.loading = false;
          });
          this.$refs.loadmore1.onTopLoaded();
          break;
           case "1":
          this.start2 = 0; 
          this.list2=[]        
          this.getaudio(() => {
            
            this.loading = false;
          });
          this.$refs.loadmore2.onTopLoaded();
          break;
           case "2":
          this.start3 = 0; 
          this.list3=[]        
          this.getaudio(() => {
            
            this.loading = false;
          });
          this.$refs.loadmore3.onTopLoaded();
          break;
           case "3":
          this.start4 = 0; 
          this.list4=[]        
          this.getaudio(() => {
            
            this.loading = false;
          });
          this.$refs.loadmore4.onTopLoaded();
          break;
       }
      
    },
    loadMore() {
      this.loading = true;
      let start=''
      switch (this.selected) {
        case "0":
          start=this.start1+10
          this.start1=start
          console.log(start);
          break;
        case "1":
          start=this.start2+10
          this.start2=start
          console.log(start);
          break;
        case "2":
          start=this.start3+10
          this.start3=start
          break;
        case "3":
          start=this.start4+10
          this.start4=start
          break;

        default:
          "0";
          break;
      }
      this.getaudio()
      this.loading = false;
    },
    // getId() {
      
    //   console.log(this.start1);
    //   this.getaudio();
    //   console.log(this.selected);
    // },
    
    getaudio(fun) {
      let dataType = "";
      let start = "";
      switch (this.selected) {
        case "0":
          dataType = "one";
          start = this.start1;
          break;
        case "1":
          dataType = "two";
          start = this.start2;
          break;
        case "2":
          dataType = "three";
          start = this.start3;
          break;
        case "3":
          dataType = "four";
          start = this.start4;
          break;

        default:
          "0";
          break;
      }
      const params = { params: { dataType, start, pageSize: 10 } };
      this.$axios.get("getAudio", params).then((arr) => {
        if(arr.length==0){
          Toast('没有更多了')
          return
        }
        switch (this.selected) {
          case "0":
            let temp = arr.map((el) => {
              el.time = new Date(el.updatedAt).toLocaleDateString();
              return el;
            });
            this.list1=[...this.list1,...temp]
            break;
          case "1":
            let temp1 = arr.map((el) => {
              el.time = new Date(el.updatedAt).toLocaleDateString();
              return el;
            });
            this.list2=[...this.list2,...temp1]
            break;
          case "2":
            let temp2 = arr.map((el) => {
              el.time = new Date(el.updatedAt).toLocaleDateString();
              return el;
            });
            this.list3=[...this.list3,...temp2]
            break;
          case "3":
            let temp3 = arr.map((el) => {
              el.time = new Date(el.updatedAt).toLocaleDateString();
              return el;
            });
            this.list4=[...this.list4,...temp3]
            break;

          default:
            "0";
            break;
        }
      });
      if(fun)fun
    },
  },
};
</script>
<style lang="less" scoped>
.audiolist {
  a,a:visited{
    text-decoration: none;
    color: rgba(104, 78, 29, 0.788);
  }
  padding: 100px 0 150px;
  height: 100%;
  overflow-y: auto;
  .mint-navbar {
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 50px;
  }
  .mint-search {
    top: 0;
    height: 55px;
    width: 100%;
    position: fixed;
    z-index: 2;
  }
  
  ul {
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