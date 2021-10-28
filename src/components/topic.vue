<template>
  <div class="topic">
    <mt-header :title="title" fixed>
      <mt-button slot="left" icon="back" @click.native="back">返回</mt-button>
      <mt-button slot="right" class="sc"
        ><img
          @click="collcation"
          v-if="iscoll == false"
          src="../assets/icon/start.png"
          alt=""
        />
        <img
          v-else
          @click="cancelcoll"
          src="../assets/icon/start2.png"
          alt=""
        />
      </mt-button>
    </mt-header>

    <div v-if="artName == '哈利波特'">
      <div v-if="isbay == false">
        <div class="card" v-for="el in [arr[0]]" :key="el.id">
          <router-link :to="`/details/${el.artId}`">
            <img :src="`${url}smallSrc/${el.smSrc}`" />
            <span v-html="el.title"></span>
          </router-link>
        </div>
        <p>更多内容请付费阅读...</p>
        <span class="money">¥15</span>
        <button class="pay" @click="pay">去支付</button>
      </div>
      <div v-else>
        <div class="card" v-for="el in arr" :key="el.id">
        <router-link :to="`/details/${el.artId}`">
          <img :src="`${url}smallSrc/${el.smSrc}`" />
          <span v-html="el.title"></span>
        </router-link>
      </div>
      </div>
    </div>
    <div v-else>
      <div class="card" v-for="el in arr" :key="el.id">
        <router-link :to="`/details/${el.artId}`">
          <img :src="`${url}smallSrc/${el.smSrc}`" />
          <span v-html="el.title"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      isbay: false,
      arr: [],
      url: this.$store.state.url,
      title: this.$route.params.title,
      artName: "",
      iscoll: false,
      islogin: this.$store.state.islogin,
      phone: this.$store.state.phone,
      out_trade_no: this.$route.query.out_trade_no,
    };
  },


  mounted() {
     this.$axios.get("searchstore", {params:{phone:this.phone,artName:this.title}}).then((rs) => {        
           console.log(this.phone);
           if(rs.length!==0){             
             this.isbay=true
           }
      });
    if (this.out_trade_no) {
      let params = {
        params: {
          out_trade_no: this.$route.query.out_trade_no,
          trade_no: this.$route.query.trade_no,
          // artName:this.artName
        },
      };
      this.$axios.get("queryorder", params).then((rs) => {
        let that = this;
        this.rs = rs;
        this.$axios({
          url: this.rs,
        }).then((data) => {
          that.code = data.alipay_trade_query_response.code;
          console.log(that.code);
          if (that.code == "10000") {
            console.log("success");
            console.log(this.out_trade_no);
            // this.$axios
            //   .get("addstore", {
            //     params: { artName: this.artName, phone: this.out_trade_no },
            //   })
            //   .then((rs) => {
            //     console.log(rs);
            //   });
          }
        });
      });
    }

    const params = { params: this.$route.params };
    this.$axios.get("getTopic", params).then((arr) => {
      this.artName = arr[0].artName;
      this.arr = arr;
      this.$store.commit("artName", this.arr[0].artName);
      this.$store.commit("toplength", this.arr.length);
    });
    this.$axios
      .get("getcollection", { params: { phone: this.phone } })
      .then((arr) => {
        arr.map((el) => {
          if (el.artName == this.title) {
            this.iscoll = true;
          }
        });
      });
  },
  methods: {
    pay() {
      if (this.islogin == true) {
        let num = parseInt(Math.random() * 20);
        let params = {
          params: {
            orderId: `${this.phone}${num}`,
            artName: this.artName,
            amount: "15",
          },
        };
        this.$axios.get("pay", params).then((rs) => {
          console.log(rs);
          // this.$router.push(rs)
          // window.location.href = rs;
          window.open(rs, "_blank");
          this.$axios
            .get("addstore", {
              params: { artName: this.artName, phone: this.phone },
            })
            .then((rs) => {
              console.log(rs);
              this.isbay=true
            });
        });
      } else {
        Toast("你还未登录");
      }
    },
    back() {
      this.$router.replace("/subject");
    },
    collcation() {
      if (this.islogin == true) {
        this.iscoll = true;
        console.log(this.iscoll);
        const params = {
          params: {
            kind: "art",
            artName: this.artName,
            iscoll: this.iscoll,
            phone: this.phone,
          },
        };
        this.$axios.get("collcation", params).then((el) => {
          Toast("收藏成功");
        });
      } else {
        Toast("请先登录");
      }
    },
    cancelcoll() {
      this.iscoll = false;
      console.log(this.iscoll);
      const params = { params: { artName: this.artName, iscoll: this.iscoll } };
      this.$axios.get("collcation", params).then((el) => {
        Toast("取消收藏");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.topic {
  .money {
    color: red;
    font-size: 18px;
    margin-left: 20px;
  }
  .pay {
    margin-left: 20px;
  }
  .sc {
    align-items: center;

    img {
      height: 30px;
    }
  }
  padding-top: 30px;
  a,
  a:visited {
    text-decoration: none;
  }
  .card {
    margin: 15px 0;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgb(150, 147, 147);
    a {
      display: flex;
      align-items: center;
      padding: 5px;
      img {
        height: 120px;
        width: 100px;
        flex: 4;
        border-radius: 8px;
      }
      span {
        flex: 6;
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
        color: black;
      }
    }
  }
}
</style>