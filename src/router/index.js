import Vue from 'vue';
import VueRouter from 'vue-router';

import auth from './auth/routes';
import admin from './admin/routes';
import user from './user/routes';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    ...auth,
    ...admin,
    ...user,
  ],
});
