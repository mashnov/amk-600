const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBar = require('webpackbar');

const faviconConfig = {
  logo: path.resolve(__dirname, './icon-fav.png'),
  cache: true,
  inject: true,
  mode: 'webapp',
  devMode: 'webapp',
  prefix: 'favicon/',
  background: '#ffffff',
  theme_color: '#405770',
  favicons: {
    appName: 'Paxum',
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

const CircularDependencyConfig = {
  failOnError: true,
  exclude: /node_modules/,
};

const DuplicatesConfig = {
  emitErrors: true,
  verbose: true,
};

const WebpackBarConfig = {
  name: 'Paxum',
  color: '#0076ff',
};

module.exports = {
  plugins: [
    new FaviconsWebpackPlugin(faviconConfig),
    new DuplicatesPlugin(DuplicatesConfig),
    new CircularDependencyPlugin(CircularDependencyConfig),
    new CaseSensitivePathsPlugin(),
    new WebpackBar(WebpackBarConfig),
  ],
};
