# vuejs-loadmore
[![Npm Version](https://img.shields.io/npm/v/vuejs-loadmore)](https://www.npmjs.com/package/vuejs-loadmore) [![Build Status](https://img.shields.io/github/workflow/status/staticdeng/vuejs-loadmore/Node.js%20CI)](https://github.com/staticdeng/vuejs-loadmore/actions)

[![NPM](https://nodei.co/npm/vuejs-loadmore.png)](https://nodei.co/npm/vuejs-loadmore/)

A pull-down refresh and pull-up loadmore scroll component for Vue.js.

Easy to use by providing simple api. Unlike other component libraries, it uses the browser itself to scroll instead of js, so it has a smaller code size but does not lose the user experience.

**English** | [中文](./README.zh-CN.md)

## Preview
[Online demo](https://staticdeng.github.io/vuejs-loadmore/)

You can also scan the following QR code to access the demo：

<img src="https://user-images.githubusercontent.com/20060839/145163261-02025f86-ac87-4016-859f-15677a6d3cf7.png" width="220" height="220" >

## Installation

#### Install the npm package

```bash
# npm
npm install vuejs-loadmore --save
```

#### Import

```js
import Vue from 'vue';
import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore);
```

## Internationalization support

Support Chinese zh-CN and English en-US, the default is zh-CN.

```js
import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore, {
  lang: 'en-US'
})
```

You can also use `locale.use()` to specify the language.

```js
import VueLoadmore, { locale } from 'vuejs-loadmore';

Vue.use(VueLoadmore);
locale.use('en-US');
```

## Usage

### Basic Usage

```html
<vue-loadmore 
  :on-refresh="onRefresh" 
  :on-loadmore="onLoad"
  :finished="finished">
  <div v-for="(item, i) of list" :key="i"></div>
</vue-loadmore>
```
The `on-refresh` and  `on-loadmore` will be Emitted when pull refresh or scroll to the bottom, you should need to execute the callback function `done()` after processing the data request. 

If you don't need refresh, only not to bind `on-refresh`.

When the data request is finished, the data of `finished` you can changed to true, then will show `finished-text`.

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

### Load Error Info

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
| on-refresh | Will be Emitted when pull refresh | _function_ | - |
| pulling-text | The Text when pulling in refresh | _string_ | `Pull down to refresh` |
| loosing-text | The Text when loosing in refresh | _string_ | `Loosing to refresh` |
| loading-text | The Text when loading in refresh | _string_ | `Refreshing` |
| success-text | The Text when loading success in refresh | _string_ | `Refresh success` |
| show-success-text | Whether to show `success-text` | _boolean_ | `true` |
| pull-distance | The distance to trigger the refresh status | _number \| string_ | `50` |
| head-height | The height of the area of the refresh shows  | _number \| string_ | `50` |
| animation-duration | Animation duration of the refresh | _number \| string_ | `200` |
| on-loadmore | Will be Emitted when scroll to the bottom | _function_ | - |
| immediate-check | Whether to check loadmore position immediately after mounted | _boolean_ | `true` |
| load-offset | The `on-loadmore` will be Emitted when the distance from the scroll bar to the bottom is less than the `load-offset` | _number \| string_ | `50` |
| finished | Whether the data is loaded | _boolean_ | `false` |
| error | Whether the data is loaded error, the `on-loadmore` will be Emitted only when error text clicked, the `sync` modifier is needed | _boolean_ | `false` |
| loading-text | The Text when loading in loaded | _string_ | `Loading` |
| finished-text | The Text when the data is loaded  | _string_ | `No more data` |
| error-text | The Text when error loaded | _string_ | `Request failed, click to reload` |

### Methods

Use ref to get List instance and call instance methods.

| Name  | Description           | Attribute | Return value |
| ----- | --------------------- | --------- | ------------ |
| checkScroll | Check scroll position | -         | -            |


## Example

You can see the demo for quickly understand how to use this package.

```bash
git clone git@github.com:staticdeng/vuejs-loadmore.git
yarn install
yarn example:dev
```