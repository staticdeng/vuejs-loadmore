<template>
  <div>
    <div class="loadmore-head">
      <div class="text">{{ language === 'zh-CN' ? '下拉刷新上拉加载' : 'pull up and pull down' }}</div>
      <div class="lan" @click="changeLanguage">{{ language === 'zh-CN' ? 'English' : 'Chinese' }}</div>
    </div>
    <div class="wrap">
      <vue-loadmore 
        :on-refresh="onRefresh" 
        :on-loadmore="onLoad"
        :finished="finished"
        :error.sync="error"
        ref="loadmoreRef"
      >
        <ul class="list-ul">
          <li class="list-li" v-for="(item, index) of list" :key="item">{{ language === 'zh-CN' ? '测试数据' : 'This is data' }} {{ index + 1 }}</li>
        </ul>
      </vue-loadmore>
    </div>
  </div>
</template>

<script>
// import VueLoadmore from '../../packages/index';
import { locale } from '../../packages/index'
export default {
  name: 'app',
  // components: {
  //   VueLoadmore,
  // },
  data() {
    return {
      list: [],
      page: 1,
      finished: false,
      error: false,
      language: 'en-US'
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    initData() {
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.error = false;
    },
    onRefresh(done) {
      this.initData();
      this.fetch();

      done();
      // 如果请求数据撑不起整个页面，可以手动调用checkSroll
      setTimeout(() => {
        this.$refs.loadmoreRef.checkSroll();
      }, 1500);
    },

    onLoad(done) {
      if (this.page <= 10) {
        this.fetch();
      } else {
        // all data loaded
        this.finished = true;
      }
      if (this.page === 3) {
        this.error = true;
      }
      
      done();
    },

    fetch() {
      for (let i = 0; i < 15; i++) {
        this.list.push(this.list.length + 1);
      }
      this.page++;
    },

    changeLanguage() {
      this.language = this.language === 'zh-CN' ? 'en-US' : 'zh-CN';
      
      // 切换语言
      locale.use(this.language);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="scss">
@import './assets/reset';
.wrap{
  padding: 20px;
  margin-top: 25px;
  // margin-top: 100px;
  // overflow: auto;
  // height: 500px;
}
.loadmore-head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;
  overflow: hidden;
  min-width: 30px;
  height: 45px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
  z-index: 2;
  .text {
    font-size: 17px;
    font-weight: 500;
    line-height: 45px;
  }
  .lan {
    position: absolute;
    right: 12px;
    bottom: 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
.list-ul {
  .list-li {
    height: 50px;
    margin-bottom: 10px;
    font-size: 13px;
    color: #323233;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ebedf0;
  }
}
</style>
