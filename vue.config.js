const path = require('path');

const baseConfig = require('./config/config.base');
const pluginOptions = require('./config/config.plugin-options');
const configureWebpack = require('./config/config.webpack');
const devServer = require('./config/config.dev-server');
const css = require('./config/config.css');

module.exports = {
  ...baseConfig,
  pluginOptions,
  configureWebpack,
  devServer,
  css,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
    config.resolve.alias.set('~', path.resolve(__dirname, 'src'));
  },
};
