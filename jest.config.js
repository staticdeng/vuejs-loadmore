module.exports = {
  "testMatch": ["**/test/*.spec.[jt]s?(x)"], // Jest 测试的文件
  'moduleFileExtensions': [
    'js',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue'
  ],
  'transform': {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(vue)$': 'vue-jest',
    // 用 `babel-jest` 处理 js
    '.*\\.(js)$': 'babel-jest'
  }
}