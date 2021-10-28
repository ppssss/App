<template>
  <div class="home">
    <img alt="Vue logo" :src="`${url}images/redlogo.jpeg`">
    
  </div>
</template>

<script>
export default{
  data(){
    return{
      url:this.$store.state.url
    }
  },
  mounted(){
    setTimeout(_=>{
      this.$router.replace('/subject')
    },3000)
  },
  methods:{
   
  }
}
</script>
<style scoped lang="less">
.home{
  height: 100%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  img{
    width: 100%;
    height: 250px;
  }
}
</style>
