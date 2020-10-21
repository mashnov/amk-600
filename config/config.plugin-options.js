const path = require('path');

const notifier = {
  title: 'Paxum',
  alwaysNotify: true,
  contentImage: path.resolve(__dirname, './icon-project.png'),
};

module.exports = {
  notifier,
};
