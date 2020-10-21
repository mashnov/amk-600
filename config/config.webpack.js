const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackBar = require('webpackbar');
const pkg = require('../package.json');

const faviconConfig = {
  logo: path.resolve(__dirname, './project.png'),
  cache: true,
  inject: true,
  mode: 'webapp',
  devMode: 'webapp',
  prefix: 'favicon/',
  background: '#ffffff',
  theme_color: '#405770',
  favicons: {
    appName: pkg.name,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      favicons: true,
      firefox: true,
      coast: true,
      windows: true,
      yandex: true,
    },
  },
};

const WebpackBarConfig = {
  name: pkg.name,
  color: '#0076ff',
};

module.exports = {
  plugins: [
    new FaviconsWebpackPlugin(faviconConfig),
    new WebpackBar(WebpackBarConfig),
  ],
};
