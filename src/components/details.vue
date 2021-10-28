<template>
  <div class="detail">
    <mt-header title="详情" fixed>
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="change">
      <div class="left" @click="pre"></div>
      <div class="right" @click="next"></div>
    </div>
    <div class="body">
      <p class="title" v-html="title"></p>
      <section v-html="content"></section>
    </div>
    <div class="bottom">
      <input v-model="value" placeholder="说点什么" @keyup.enter="comment" />
      <div class="sent" @click="comment"></div>
      <div class="icon" @click="tocomment"></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      artId:this.$route.params.id,
      arr: [],
      value: "",
      isrecord:false,
      islogin:this.$store.state.islogin,   
      artName:this.$store.state.artName,
      title:'',
      content:'' ,
      toplength:this.$store.state.toplength,
      // imgArr:[]
    };
  },
  mounted() {
    setTimeout(el=>{
      this.isrecord=true
    },5000)
    this.getArt()
  },
  methods: {
    getArt(){
      const params = { params:{artId:this.artId,artName:this.artName} };
    console.log(params);
    this.$axios.get("getArt", params).then((arr) => {
      console.log(arr);
      if(arr==''){
        Toast('没有更多了')
        console.log(this.artId);
      }else{
        arr[0].content = arr[0].content.replace(
        /\{\{imgUrl\}\}/g,
        this.$store.state.url
      );
      // this.arr = arr;
      this.title=arr[0].title
      this.content=arr[0].content
      this.arr=arr
      }
      
      
    });
    },
    back() {
      if(this.islogin==true){
        if(this.isrecord==true){
        console.log('record');
        console.log(this.$store.state.select);
        const params={ params:{artName:this.artName,title:this.title,artType:this.$store.state.subId,artId:this.$route.params.id,phone:this.$store.state.phone} };
        this.$axios.get('addRecord',params).then(()=>{
          this.$router.push('/subject');
        })
      }else{
        this.$router.replace(`/topic/${this.artName}`);
      }
      }else{
        this.$router.replace(`/topic/${this.artName}`);
      }      
      
    },
    comment() {
      if(this.$store.state.islogin==false){
        Toast('请先登录')
      }else{
        if (this.value == "") {
        Toast("请输入内容");
      } else {
          let params={params:{artName:this.artName,artId:this.artId,phone:this.$store.state.phone,nickName:this.$store.state.name,comment:this.value}};
          this.$axios.get('comment',params).then(arr=>{
              this.$router.push('/comment/'+this.artId)
          })
      }
      }      
    },
    tocomment(){
        this.$router.push('/comment/'+this.artId)
    },
    pre(){
      if(this.artId==1){
        Toast('这是第一章')
      }else{
        this.artId--;
        this.getArt()
        console.log(this.artId);
      }
    },
    next(){
      // console.log(this.toplength);
      // console.log(this.artId);
     if(this.artId==this.toplength){
       Toast('最后一章')
     }else{
       this.artId++;
      this.getArt()
     }      
    }
  },
};
</script>
<style lang="less" scoped>
.detail {
  .mint-header {
    width: 100%;
    top: 0;
    z-index: 10;
    background-color: rgb(214, 63, 63);
  }
  .change{
    position: fixed;
    width: 100%;
    height: 30px;
    background: rgb(250, 211, 127);
    top: 40px;
    display: flex;
    justify-content: space-around;
    .left{
      height: 30px;
      width: 30px;
      background: url("../assets/icon/lrow.png") no-repeat;
      background-size: 100%;
      margin-left: 20px;
    }
    .right{
      height: 30px;
      width: 30px;
      background: url("../assets/icon/rrow.png") no-repeat;
      background-size: 100%;
      margin-left: 20px;
    }
  }
  .body {
    background: rgb(250, 211, 127);
    padding: 60px 8px;
    text-align: center;
    p.title {
      font-size: 22px;
      font-weight: bold;
    }
    /deep/ img {
      width: 100%;
      height: 150px;
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    border-top: 1px solid grey;
    position: fixed;
    background: white;
    bottom: 0;
    align-items: center;
    display: flex;
    justify-content: space-around;
    input {
      border-color: rgb(211, 209, 209);
      padding-left: 30px;
      border-radius: 8px;
      align-items: center;
      height: 25px;
      background: url("../assets/icon/comment.png") no-repeat;
      background-size: 20px 20px;
    }
    .icon {
      display: inline-block;
      height: 30px;
      width: 30px;
      background: url("../assets/icon/message.png") no-repeat;
      background-size: 100%;
      margin-left: 20px;
    }
    .sent {
      height: 30px;
      width: 30px;
      background: url("../assets/icon/sent.png") no-repeat;
      background-size: 100%;
      margin-left: -60px;
    }
  }
}
</style>