<template>
  <div class="wrap">
    <vue-loadmore 
      :on-refresh="onRefresh" 
      :on-loadmore="onLoad"
      :finished="finished"
      :error.sync="error"
    >
      <ul class="list-ul">
        <li class="list-li" v-for="(item, index) of list" :key="item">测试数据{{ index + 1 }}</li>
      </ul>
    </vue-loadmore>
  </div>
</template>

<script>
import VueLoadmore from '../../packages/index';

export default {
  name: 'app',
  components: {
    VueLoadmore,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
    };
  },
  methods: {
    onRefresh(done) {
      done();
    },

    onLoad(done) {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + 1);
      }

      if (this.list.length == 30) {
        this.error = true;
      }
      // 数据全部加载完成
      if (this.list.length >= 100) {
        this.finished = true;
      }
      
      done();
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
  // margin-top: 100px;
  // overflow: auto;
  // height: 500px;
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
