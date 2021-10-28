<template>
  <div class="video" :style="`height:${screenH}px`">
    <p>热门视频</p>
    <mt-loadmore
      class="two"
      ref="loadmore1"
      style="height: 100%; overflow: auto"
    >
      <ul class="audio">
        <li v-for="(el, i) in arr" :key="el.id">
          <video-player
            ref="video"
            :options="option[i]"
            @play="onplay($event, i - 1)"
          ></video-player>
          <p v-html="el.title"></p>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  props:["isstop"],
  data() {
    return {
      url: this.$store.state.url,
      screenH: this.$store.state.screenH,
      arr: [],
      option: [],
      currentplay: null,
      sub:this.$store.state.subId
    };
  },
  
  mounted() {
    this.$axios.get("getvideo").then((arr) => {
      this.arr = arr.map((el) => {
        let temp = { sources: [{ type: "video/mp4", src: el.url }] };
        this.option = [...this.option, temp];
        return el;
      });
    });
  },
  watch: {
    isstop(){
      this.currentplay.pause()
    },
    currentplay(now, old) {
      if (old !== null) {
        old.pause();        
      } else {
        now.play();
      }
    },
  },
  methods: {
    onplay(player, index) {
      this.currentplay = player;

      // if (this.currentplay) {
      //   this.currentplay.pause();
      // }
      // if(this.currentplay ==player){
      //   this.currentplay.play();

      // }
      // this.currentplay.play();
    },
  },
};
</script>
<style lang="less" scoped>
.video {
  list-style: none;

  ul {
    padding: 0 0 80px;
  }
  text-align: center;
  .video-player {
    width: 100%;
    height: 260px;
  }
}
</style>