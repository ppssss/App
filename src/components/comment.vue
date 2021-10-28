<template>
  <div class="comment">
    <mt-header title="评论" fixed>
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
    </mt-header>
    <ul>
      <li v-for="el in CommentArr" :key="el.id">
        <span class="top">
          用户：
          <span
            class="name"
            v-html="el.nickName"
          ></span>
          <span v-html="el.date"></span>
        </span>
        <p v-html="el.comment"></p>
        
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: this.$store.state.url,
      CommentArr: [],
    };
  },
  mounted() {
    let artId = this.$route.params.id;
    const params = { params: { artId,artName:this.$store.state.artName} };
    console.log(params);
    this.$axios.get("getComment", params).then((arr) => {
      // console.log(arr);
      this.CommentArr = arr.map((el) => {
        el.date = new Date(el.updatedAt).toLocaleDateString();
        return el;
      });
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.comment {
  padding-top: 50px;
  ul {
    padding: 0;
    li {
      list-style: none;
      padding: 15px 10px;
      border-bottom: 1px solid rgb(199, 192, 192);
      .top {
        display: flex;
        justify-content: space-between;
        color: rgb(112, 110, 110);
        font-size: 14px;
        .name{
            margin-left: -220px;
        }
      }
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>