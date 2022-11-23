# vuejs-loadmore
[![Npm Version](https://img.shields.io/npm/v/vuejs-loadmore)](https://www.npmjs.com/package/vuejs-loadmore) [![Build Status](https://img.shields.io/github/workflow/status/staticdeng/vuejs-loadmore/Node.js%20CI)](https://github.com/staticdeng/vuejs-loadmore/actions)

[![NPM](https://nodei.co/npm/vuejs-loadmore.png)](https://nodei.co/npm/vuejs-loadmore/)

一个Vue.js 的下拉刷新和上拉加载组件。

通过提供简单的api易于使用。与其他组件库不同，它使用浏览器本身而不是js来作滚动容器，因此它的代码量更小，但不损失用户体验。

**中文** | [English](./README.en-US.md)

## 预览
[在线demo](https://staticdeng.github.io/vuejs-loadmore/)

也可以扫描以下二维码访问演示：

<img src="https://user-images.githubusercontent.com/20060839/145163261-02025f86-ac87-4016-859f-15677a6d3cf7.png" width="220" height="220" >

## 安装 & 使用

#### 安装 npm 包

```bash
# npm
npm install vuejs-loadmore --save
```

#### 全局导入

```js
import Vue from 'vue';
import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore);
```

## 国际化支持

支持中文 zh-CN 和英文 en-US, 默认为 zh-CN。

```js
import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore, {
  lang: 'en-US'
})
```

你也可以使用 `locale.use()` 指定语言。

```js
import VueLoadmore, { locale } from 'vuejs-loadmore';

Vue.use(VueLoadmore);
locale.use('en-US');
```

## 用法

### 基础用法

```html
<vue-loadmore 
  :on-refresh="onRefresh" 
  :on-loadmore="onLoad"
  :finished="finished">
  <div v-for="(item, i) of list" :key="i"></div>
</vue-loadmore>
```
`on-refresh` 和 `on-loadmore` 会在下拉刷新或滚动到底部时触发，需要在处理完数据请求后执行回调函数 `done()`。 

如果你不需要刷新，只需要不绑定`on-refresh`。

当数据请求完成后，你可以将`finished`的数据改为true，这样就会显示`没有更多了`。

```js
export default {
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      finished: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    onRefresh(done) {
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.fetch();

      done();
    },

    onLoad(done) {
      if (this.page <= 10) {
        this.fetch();
      } else {
        // all data loaded
        this.finished = true;
      }
      done();
    },

    fetch() {
      for (let i = 0; i < this.pageSize; i++) {
        this.list.push(this.list.length + 1);
      }
      this.page++;
    }
  },
}
```

### 错误提示

```html
<vue-loadmore 
  :on-loadmore="onLoad"
  :finished="finished"
  :error.sync="error">
  <div v-for="(item, i) of list" :key="i"></div>
</vue-loadmore>
```

```js
export default {
  data() {
    return {
      list: [],
      finished: false,
      error: false,
    };
  },
  methods: {
    onLoad() {
      fetchSomeThing().catch(() => {
        this.error = true;
      });
    },
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| on-refresh | 顶部下拉触发 | _function_ | - |
| pulling-text | 下拉显示文本 | _string_ | `下拉刷新` |
| loosing-text | 释放显示文本 | _string_ | `释放刷新` |
| refresh-text | 正在刷新显示文本 | _string_ | `正在刷新` |
| success-text | 刷新完成显示文本 | _string_ | `刷新完成` |
| show-success-text | 是否显示`success-text` | _boolean_ | `true` |
| pull-distance | 触发正在刷新状态的距离 | _number \| string_ | `50` |
| head-height | 正在刷新显示区域的高度  | _number \| string_ | `50` |
| animation-duration | 下拉刷新动画持续时间 | _number \| string_ | `200` |
| on-loadmore | 滚动到底部触发 | _function_ | - |
| immediate-check | 是否立即触发数据加载；默认是，否的话则自己定义触发数据加载时机 | _boolean_ | `true` |
| load-offset | 当滚动条到底部的距离小于 `load-offset` 时，会发出 `on-loadmore` | _number \| string_ | `50` |
| finished | 数据是否加载完毕，改变为true，则会显示`finished-text` | _boolean_ | `false` |
| error | 数据是否加载错误，`on-loadmore`只有在点击错误文本时才会触发，需要`sync`修饰符 | _boolean_ | `false` |
| loading-text | 滚动到底部正在加载显示文本 | _string_ | `正在加载` |
| finished-text | 滚动到底部加载完毕的显示文本  | _string_ | `没有更多了` |
| error-text | 加载错误显示文本 | _string_ | `请求失败，点击重新加载` |

### 方法

使用 ref 获取 List 实例并调用实例方法。

| Name  | Description           |
| ----- | --------------------- |
| checkScroll | 检查当前的滚动位置，若已滚动至底部，则会触发 `on-loadmore` |


## 例子

查看demo以快速了解如何使用此包。

```bash
git clone git@github.com:staticdeng/vuejs-loadmore.git
yarn install
yarn example:dev
```