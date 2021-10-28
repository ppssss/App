<template>
  <div class="index">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="0"> 小说 </mt-tab-item>
      <mt-tab-item id="1"> 听书 </mt-tab-item>
      <mt-tab-item id="2"> 视频 </mt-tab-item>
      <mt-tab-item id="3"> 我的 </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
          <Swipe/>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
          <Audiolist/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">        
          <Video v-bind:isstop="isstop"></Video>     
      </mt-tab-container-item>
      <mt-tab-container-item id="3">        
        <Mine/>        
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Swipe from '../components/swipe.vue';
import Video from '../components/video1.vue';
import Login1 from '../components/login.vue';
import Mine from '../components/mine.vue';
import Audiolist from '../components/audiolist.vue';


export default {
  components: { Swipe,Video,Login1,Mine,Audiolist },
  mounted(){
    this.selected=this.$store.state.subId
  },
  data() {
    return {
      selected:this.$store.state.subId,
      islogin:this.$store.state.islogin,
      isstop:false
    };
  },
  watch:{
    selected(now){
      this.$store.commit("changeId", now); 
      this.isstop=!this.isstop
    }
  }
};
</script>
<style scoped lang="less">
.index {
  height: 100%;
  .mint-tabbar {
    position: fixed;
    z-index: 2;
    bottom: 0;
    /deep/ .mint-tab-item-label {
      font-size: 18px;
    }
    .mint-tab-item{
      padding: 11px 0;
    }
    .mint-tab-item.is-selected {
      color: rgb(248, 87, 87);
      font-weight: bold;
    }
  }
}

</style>
