<template>
  <div class="app" :style="`height:${this.$store.state.screenH}px`">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  
};
</script>
<style>
body {
  margin: 0;
}
.app {
  margin: 0;
  padding: 0;
}
.mint-tab-item-label {
  font-size: 30px;
}
.mint-search-list {
  z-index: -2;
}
.video-js {
  height: 100%;
  width: 100%;
}
.video-js .vjs-big-play-button {
  top: 40% !important; 
  left: 40% !important;
}
.mint-tab-container{
  height: 100%;
}
</style>
