<template>
  <div class="audio">
    <mt-header title="音频" fixed>
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <img :src="`${url}${arr.smSrc}`">
    <p v-html="arr.title"></p>
    <AudioPlayer ref="audio" @ended="playNext"  @play-prev='playPrev' @play-next='playNext' :audioList="music" />
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  name:'music',
  
  data() {
    return {
      url:this.$store.state.url,
      arr: [],
      music:[],
      id:this.$route.params.id ,
      islogin:this.$store.state.islogin,
      isrecord:false,
      title:''
    };
  },
  computed:{
    
  },
  mounted() {
    setTimeout(el=>{
      this.isrecord=true
    },5000);
    this.getdata();    
  },
  methods: {
    getdata(){
      this.$axios
      .get("getAudioId", { params: { id:this.id  } })
      .then((arr) => {
        console.log(arr);
        this.title=arr.title
        this.arr=arr
        arr.date=new Date(arr.updatedAt).toLocaleDateString()
        this.music=[arr.url]
        this.$refs.audio.pause()  
        this.$refs.audio.currentTime=0
        setTimeout(()=>{
          this.$refs.audio.play() 
        },100)
      });
    },
    back() {
      if(this.islogin==true){
        if(this.isrecord==true){
        console.log('record');
        console.log(this.$store.state.select);
        const params={ params:{title:this.title,artType:this.$store.state.subId,artId:this.$route.params.id,phone:this.$store.state.phone} };
        this.$axios.get('addRecord',params).then(()=>{
          this.$router.push('/subject');
        })
      }else{
        this.$router.push('/subject');
      } 
      }else{
        this.$router.push('/subject');
      }     
    },
    playPrev(){
      if(this.id==1){
        Toast('这是第一条')
      }else{
        
        this.id--;
        this.getdata();        
      }
    },
    playNext(){
      if(this.id==45){
        Toast('这是最后一首咯')
        return
      }
      this.id++;
      this.getdata();
      
    }
  },
};
</script>
<style lang="less" scoped>
.audio {
  align-items: center;
  padding-top: 50px;
 img{
   width: 100%;
   height: 260px;
 }
 p{
   text-align: center;
   font-size: 22px;
 }
 .audio-player{
   margin-top: 20px;
   padding: 0 5px;
 }
}
</style>
