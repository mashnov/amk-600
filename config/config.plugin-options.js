const path = require('path');
const pkg = require('../package.json');

const notifier = {
  title: pkg.name,
  alwaysNotify: true,
  contentImage: path.resolve(__dirname, './project.png'),
};

module.exports = {
  notifier,
};
