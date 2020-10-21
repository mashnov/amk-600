import Vue from 'vue';
import Vuex from 'vuex';

import references from './references/index';
import viewport from './viewport/index';
import preloader from './preloader/index';
import logger from './logger/index';
import modal from './modal/index';
import auth from './auth/index';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    references,
    viewport,
    preloader,
    logger,
    modal,
    auth,
  },
});
