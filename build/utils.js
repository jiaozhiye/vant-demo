/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 14:52:28
 */
'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mapDir = (d, reg) => {
  const result = [];

  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d, p)).isDirectory());

  dirs.forEach(dir => {
    result.push.apply(result, mapDir(path.join(d, dir), reg));
  });

  files.forEach(file => {
    if (reg.test(file)) {
      result.push(require(path.join(d, file)));
    }
  });

  return result;
};

exports.deepRequire = mapDir;

exports.assetsPath = function(dir) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, dir);
};

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir);
};

exports.cssLoaders = function(options) {
  options = options || {};

  // 设置 css 加载器
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1 + 1,
      esModule: false,
      sourceMap: options.sourceMap
    }
  };

  // 设置 postcss 加载器
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions = {}) {
    // 加载器的数组
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      return [MiniCssExtractPlugin.loader].concat(loaders);
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {
      modifyVars: {
        // 直接覆盖变量
        // ...
      }
    }).concat({
      loader: 'style-resources-loader',
      options: {
        patterns: [path.resolve(__dirname, '../src/assets/css/variables.less')]
      }
    }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
};
