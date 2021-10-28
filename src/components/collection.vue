<template>
  <div :style="`background:url('${url}images/bg2.png')`" class="collection">
    <mt-header title="我的收藏">
      <router-link to="/subject" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <ul>
      <div v-for="el in arr" :key="el.id">
        <router-link :to="`/topic/${el.artName}`" v-if="el.kind == 'art'">
          <li>
            <span class="name" v-html="el.artName"></span>
            <span>文章</span>
            <p v-html="el.time"></p>
          </li>
        </router-link>
        <router-link v-else>
          <li>
            <p v-html="el.artName"></p>
            <span>音频</span>
            <span v-html="el.time"></span>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
        iscoll:true,
      phone: this.$store.state.phone,
      url: this.$store.state.url,
      arr: [],
      kind: "",
    };
  },
  mounted() {
    this.$axios
      .get("getcollection", { params: { phone: this.phone } })
      .then((arr1) => {
        console.log(arr1);

        this.arr = arr1.map((el) => {
          el.time = new Date(el.updatedAt).toLocaleDateString();
          return el;
        });
        console.log(this.arr);
      });
  },
  // switch (key) {
  //     case value:

  //         break;

  //     default:
  //         break;
  // }
  methods: {},
};
</script>
<style lang="less" scoped>
.collection {
  height: 100%;
  background-size: 100% 100%;
  overflow: auto;
  ul {
    padding: 0;

    li {
      padding: 10px 20px;
      list-style: none;
      border-bottom: 1px solid rgb(185, 180, 180);
      span.name {
        padding-right: 50px;
        font-size: 20px;
        font-weight: bold;
      }
      p {
        color: gray;
      }
    }
  }
}
</style>