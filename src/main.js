import Vue from 'vue';
import Tooltip from 'vue-directive-tooltip';

import App from './App';

import router from './router';
import store from './store';

Vue.use(Tooltip);

/* eslint no-new:0 */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
