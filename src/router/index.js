import Vue from 'vue';
import VueRouter from 'vue-router';

import start from './start/routes';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    ...start,
  ],
});
