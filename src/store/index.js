import Vue from 'vue';
import Vuex from 'vuex';

import references from './references/index';
import preloader from './preloader/index';
import viewport from './viewport/index';
import reports from './reports/index';
import logger from './logger/index';
import admin from './admin/index';
import modal from './modal/index';
import auth from './auth/index';
import user from './user/index';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    references,
    preloader,
    viewport,
    reports,
    logger,
    admin,
    modal,
    auth,
    user,
  },
});
