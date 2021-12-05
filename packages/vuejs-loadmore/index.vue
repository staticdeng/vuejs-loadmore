<template>
  <div class="vuejs-loadmore">
    <div
      ref="track"
      class="vuejs-refresh-track"
      :style="{
        transform: distance ? `translate3d(0, ${distance}px, 0)` : '',
        webkitTransform: distance ? `translate3d(0, ${distance}px, 0)` : '',
        transitionDuration: `${duration}ms`,
      }"
    >
      <!-- 下拉刷新 -->
      <div class="vuejs-refresh-head" :style="headStyle">
        <div v-if="status === 'refresh'">
          <Loading>{{ genStatus }}</Loading>
        </div>
        <div class="vuejs-refresh-text" v-else>{{ genStatus }}</div>
      </div>

      <slot></slot>

      <!-- 上拉加载 -->
      <div class="vuejs-loadmore">
        <div class="vuejs-loadmore-loading" v-if="innerLoading && !finished && !error">
          <Loading>{{ loadingText }}</Loading>
        </div>

        <div class="vuejs-loadmore-finished-text" v-if="finished">
          {{ finishedText }}
        </div>

        <div @click="clickErrorText" class="vuejs-loadmore-error-text" v-if="error">
          {{ errorText }}
        </div>

        <div ref="placeholder" class="vuejs-loadmore-placeholder" />
      </div>
    </div>
  </div>
</template>

<script>
// Mixins
import { TouchMixin } from '../mixins/touch';
import { BindEventMixin } from '../mixins/bind-event';
import { TimeoutMixin } from '../mixins/timer';
// utils
import { preventDefault } from '../utils/event';
import { getScroller, getScrollTop } from '../utils/scroll';
// Icon
import Loading from '../icon';
const TEXT_STATUS = ['pulling', 'loosing', 'refresh', 'success'];

export default {
  name: 'loadmore',

  mixins: [
    TouchMixin,
    BindEventMixin(function (bind) {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }

      bind(this.scroller, 'scroll', this.checkSroll);
    }),
    TimeoutMixin
  ],

  components: { Loading },

  props: {
    // 下拉刷新
    onRefresh: Function,
    pullingText: {
      type: String,
      default: '下拉刷新'
    },
    loosingText: {
      type: String,
      default: '释放刷新'
    },
    refreshText: {
      type: String,
      default: '正在刷新'
    },
    successText: {
      type: String,
      default: '刷新完成'
    },
    showSuccessText: {
      type: Boolean,
      default: true
    },
    pullDistance: {
      type: [Number, String],
      default: 50
    },
    headHeight: {
      type: [Number, String],
      default: 50
    },
    animationDuration: {
      type: [Number, String],
      default: 200
    },
    // 上拉加载
    onLoadmore: Function,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    loadOffset: {
      type: [Number, String],
      default: 50
    },
    finished: Boolean,
    error: Boolean,
    loadingText: {
      type: String,
      default: '正在加载'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    errorText: {
      type: String,
      default: '请求失败，点击重新加载'
    }
  },

  data () {
    return {
      status: 'normal', // 下拉状态
      distance: 0, // 下拉距离
      duration: 0, // 动画时间
      scroller: null, // 滚动容器元素
      innerLoading: false // loadmore loading
    };
  },

  mounted () {
    // 绑定touch事件
    this.bindTouchEvent(this.$refs.track);
    // 获取$el最近一个父级可滚动容器元素
    this.scroller = getScroller(this.$el);

    if (this.immediateCheck) {
      this.checkSroll();
    }
  },

  computed: {
    touchable () {
      return (
        this.status !== 'refresh' && this.status !== 'success' && this.onRefresh
      );
    },
    headStyle () {
      return this.headHeight !== 50 ? { height: `${this.headHeight}px` } : {};
    },
    genStatus () {
      const { status } = this;
      return TEXT_STATUS.indexOf(status) !== -1 ? this[`${status}Text`] : '';
    }
  },

  watch: {
    innerLoading: 'checkSroll',
    finished: 'checkSroll'
  },

  methods: {
    checkPullStart (event) {
      // 父级滚动元素的滚动条在顶部位置
      this.ceiling = getScrollTop(this.scroller) === 0;
      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },

    onTouchStart (event) {
      if (!this.touchable) {
        return;
      }
      this.checkPullStart(event);
    },

    onTouchMove (event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        // 滚动容器不在顶部回拉时，需触发touchStart
        this.checkPullStart(event);
      }
      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
        // 阻止默认行为(如下拉网页也会默认下拉的行为)
        preventDefault(event);

        this.setStatus(this.ease(this.deltaY));
      }
    },

    onTouchEnd () {
      if (this.deltaY && this.touchable) {
        this.duration = this.animationDuration;
        if (this.status === 'loosing') {
          this.showRefreshTip();

          // ensure value change can be watched
          this.$nextTick(() => {
            this.onRefresh(this.refreshDone);
          });
        } else {
          this.setStatus(0);
        }
      }
    },

    ease (distance) {
      const pullDistance = +(this.pullDistance || this.headHeight);

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }

      return Math.round(distance);
    },

    setStatus (distance, isRefresh = false) {
      let status;
      if (isRefresh) {
        status = 'refresh';
      } else if (distance === 0) {
        status = 'normal';
      } else {
        status = distance < (this.pullDistance || this.headHeight) ? 'pulling' : 'loosing';
      }

      this.distance = distance;
      if (status !== this.status) {
        this.status = status;
      }
    },

    refreshDone () {
      if (this.showSuccessText) {
        this.timeout(this.showSuccessTip, 500);
      } else {
        this.timeout(() => this.setStatus(0), 500);
      }
    },

    showRefreshTip () {
      this.setStatus(+this.headHeight, true);
    },

    showSuccessTip () {
      this.status = 'success';
      this.timeout(() => this.setStatus(0), 1000);
    },

    checkSroll () {
      this.$nextTick(() => {
        if (this.innerLoading || !this.onLoadmore || this.finished || this.error) {
          return;
        }

        const { scroller, loadOffset } = this;
        let scrollerRect;

        if (scroller.getBoundingClientRect) {
          scrollerRect = scroller.getBoundingClientRect();
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller.innerHeight
          };
        }

        const scrollerHeight = scrollerRect.bottom - scrollerRect.top;

        if (!scrollerHeight) {
          return false;
        }

        const placeholderRect = this.$refs.placeholder.getBoundingClientRect();
        const isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= loadOffset;

        if (isReachEdge) {
          this.innerLoading = true;
          this.timeout(() => this.onLoadmore(this.loadmoreDone), 500);
        }
      });
    },

    clickErrorText () {
      this.$emit('update:error', false);
      this.innerLoading = true;
      this.timeout(() => this.onLoadmore(this.loadmoreDone), 500);
    },

    loadmoreDone () {
      this.innerLoading = false;
    }

  }
};
</script>
