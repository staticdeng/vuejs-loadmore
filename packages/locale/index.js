import Vue from 'vue';
import { getDeepVal } from '../utils/getDeepValByKey';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

const langLibrary = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const proto = Vue.prototype;
const { defineReactive } = Vue.util;
// 将proto.lang定义成响应式数据
defineReactive(proto, 'lang', 'zh-CN');

const getLangLibrary = () =>  langLibrary[proto.lang];

export default {
  // 获取当前语言库的值
  t(path) {
    const library = getLangLibrary();
    return getDeepVal(library, path);
  },

  // 使用某个语言库(zhCN/enUS)
  use(lang) {
    if (langLibrary[lang]) {
      proto.lang = lang;
    }
  }
};