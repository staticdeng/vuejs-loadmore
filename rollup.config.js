import path from 'path';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const pkg = require(path.resolve(__dirname, 'package.json'));
// 公共插件配置
const getPlugins = () => {
  return [
    resolve({
      extensions: ['.vue', '.js']
    }),
    vue({
      include: /\.vue$/
    }),
    postcss({
      plugins: [require('autoprefixer')],
      // 把 css 放到和js同一目录
      // extract: true,
      // Minimize CSS, boolean or options for cssnano.
      minimize: true,
      // Enable sourceMap.
      sourceMap: false,
      // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
      extensions: ['.sass', '.scss', '.css']
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue']
    }),
    terser()
  ];
};

export default {
  input: path.resolve(__dirname, pkg.entry),
  output: [
    {
      name: 'loadmore',
      file: path.resolve(__dirname, pkg.main),
      format: 'umd',
      sourcemap: false,
      globals: {
        vue: 'vue'
      }
    },
    {
      name: 'loadmore',
      file: path.join(__dirname, pkg.module),
      format: 'es',
      sourcemap: false,
      globals: {
        vue: 'vue'
      }
    }
  ],
  plugins: getPlugins()
};
